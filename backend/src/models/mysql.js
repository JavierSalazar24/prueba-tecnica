import mysql from 'mysql2/promise'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
}

const connection = await mysql.createConnection(config)

export class UnitsModel {
  static async getUnits(search = '') {
    let query =
      'SELECT idgps, nombre_unidad, placas, marca, modelo, anio, color, imgs FROM units'

    let values = []

    if (search !== '') {
      query += ` WHERE
        nombre_unidad LIKE ? OR
        placas LIKE ? OR
        marca LIKE ? OR
        modelo LIKE ? OR
        anio LIKE ? OR
        color LIKE ?`

      values.push(...Array(6).fill(`%${search}%`))
    }

    const [units] = await connection.query(query, values)
    return units
  }

  static async addEvents(events, id) {
    const query = `INSERT INTO reports (
    name_device, imei, dt_msg, id_msg, id_msg_type, desc_msg, lat, lon, ubicacion,
    vel, dtmsg, ignicion, odometro_kms, dir, nombre_grupo, idgps_units
  ) VALUES ?`

    const values = events.map((event) => [
      event.name_device,
      event.imei,
      event.dt_msg,
      event.id_msg,
      event.id_msg_type,
      event.desc_msg,
      event.lat,
      event.lon,
      event.ubicacion,
      event.vel,
      event.dtmsg,
      event.ignicion,
      event.odometro_kms,
      event.dir,
      event.nombre_grupo,
      id
    ])

    const [report] = await connection.query(query, [values])
    return report
  }

  static async getReports({ id }) {
    const query =
      'SELECT idgps_units, lat, lon, desc_msg, odometro_kms, ignicion, dt_msg, dtmsg FROM reports WHERE idgps_units = ? ORDER BY dt_msg DESC;'

    const [events] = await connection.query(query, [id])
    return events
  }
}
