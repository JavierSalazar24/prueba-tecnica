import { API_TECNO, API_HOST, TOKEN } from '../config'
import { toast } from 'sonner'

export const getUnits = async (search = '') => {
  try {
    const url = search
      ? `${API_HOST}/units?search=${search}`
      : `${API_HOST}/units`

    const res = await fetch(url)

    if (!res.ok) {
      const errorMsg = `Error ${res.status}: ${res.statusText}`
      throw new Error(errorMsg)
    }

    const data = await res.json()

    return data.units
  } catch (error) {
    console.log(error.message)
    throw new Error('Ah ocurrido un error, intentalo más tarde')
  }
}

export const getEvents = async (unit, { init, end }) => {
  try {
    const res = await fetch(
      `${API_TECNO}/events?dtini=${init}&dtfin=${end}&idgps=${unit}`,
      { headers: { 'Tcv-Client-Id': TOKEN } }
    )

    if (!res.ok) {
      const errorMsg = `Error ${res.status}: ${res.statusText}`
      console.error(errorMsg)
      throw new Error(errorMsg)
    }

    return await res.json()
  } catch (error) {
    console.log(error.message)
    throw new Error('Ah ocurrido un error, intentalo más tarde')
  }
}

export const addEvents = async (events, id) => {
  try {
    const res = await fetch(`${API_HOST}/events/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(events)
    })

    if (!res.ok) {
      toast.error('Ah ocurrido un error, intentalo más tarde')
      const errorMsg = `Error ${res.status}: ${res.statusText}`
      throw new Error(errorMsg)
    }

    toast.success('Reporte guardado')

    const data = await res.json()

    return data.reports
  } catch (error) {
    console.log(error.message)
    throw new Error('Ah ocurrido un error, intentalo más tarde')
  }
}

export const getReports = async (id) => {
  try {
    const res = await fetch(`${API_HOST}/reports/${id}`)

    if (!res.ok) {
      const errorMsg = `Error ${res.status}: ${res.statusText}`
      console.error(errorMsg)
      throw new Error(errorMsg)
    }

    const data = await res.json()

    return data.reports
  } catch (error) {
    console.log(error.message)
    throw new Error('Ah ocurrido un error, intentalo más tarde')
  }
}
