import { UnitsModel } from '../models/oracle.js'

export const getUnits = async (req, res) => {
  try {
    const { search } = req.query

    const units = search
      ? await UnitsModel.getUnits(search)
      : await UnitsModel.getUnits()

    return res.status(201).json({ units })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const addEvents = async (req, res) => {
  try {
    const { id } = req.params
    const events = req.body

    const reports = await UnitsModel.addEvents(events, id)

    return res.status(201).json({ reports })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getReports = async (req, res) => {
  try {
    const { id } = req.params

    const reports = await UnitsModel.getReports({ id })

    return res.status(201).json({ reports })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
