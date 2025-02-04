import 'dotenv/config'
import oracledb from 'oracledb'
import { format } from 'date-fns'

const config = {
  user: process.env.DB_USER_ORACLE,
  password: process.env.DB_PASS_ORACLE,
  connectString: `${process.env.DB_HOST_ORACLE}:${process.env.DB_PORT_ORACLE}/${process.env.DB_DATABASE_ORACLE}`
}

let connection

async function initOracleConnection() {
  if (!connection) {
    connection = await oracledb.getConnection(config)
    console.log('Conexión a Oracle establecida')
  }
}

await initOracleConnection()

export class UnitsModel {
  static async getUnits(search = '') {
    let query = `SELECT idgps, nombre_unidad, placas, marca, modelo, anio, color, imgs FROM units`
    let binds = {}

    if (search !== '') {
      query += ` WHERE nombre_unidad LIKE :search OR 
                        placas LIKE :search OR 
                        marca LIKE :search OR 
                        modelo LIKE :search OR 
                        anio LIKE :search OR 
                        color LIKE :search`

      binds = { search: `%${search}%` }
    }

    const result = await connection.execute(query, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    })

    return result.rows.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key.toLowerCase(), value])
      )
    )
  }

  static async addEvents(events, id) {
    const query = `INSERT INTO reports (
      name_device, imei, dt_msg, id_msg, id_msg_type, desc_msg, lat, lon, ubicacion,
      vel, dtmsg, ignicion, odometro_kms, dir, nombre_grupo, idgps_units
    ) VALUES (:1, :2, TO_DATE(:3, 'YYYY-MM-DD HH24:MI:SS'), :4, :5, :6, :7, :8, :9, :10, :11, :12, :13, :14, :15, :16)`

    const values = events.map((event) => [
      event.name_device,
      event.imei,
      format(event.dt_msg, 'yyyy-MM-dd HH:mm:ss'),
      Number(event.id_msg),
      Number(event.id_msg_type),
      event.desc_msg,
      parseFloat(event.lat),
      parseFloat(event.lon),
      event.ubicacion,
      Number(event.vel),
      Number(event.dtmsg),
      event.ignicion,
      parseFloat(event.odometro_kms ?? 0),
      Number(event.dir),
      event.nombre_grupo,
      id
    ])

    const result = await connection.executeMany(query, values)
    await connection.commit()

    return result
  }

  static async getReports({ id }) {
    const query = `SELECT idgps_units, lat, lon, desc_msg, odometro_kms, ignicion, dt_msg, dtmsg 
                   FROM reports 
                   WHERE idgps_units = :id 
                   ORDER BY dt_msg DESC`

    const result = await connection.execute(
      query,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    )

    return result.rows.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key.toLowerCase(), value])
      )
    )
  }
}
