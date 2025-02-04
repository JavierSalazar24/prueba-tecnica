import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getEvents } from '../api/requests'
import Swal from 'sweetalert2'
import { useEventStore } from '../store/useEventStore'

export const useEvents = () => {
  const { unitId } = useParams()
  const [searchParams] = useSearchParams()
  const name = searchParams.get('unit')

  const [filters, setFilters] = useState({ init: '', end: '' })
  const [enabled, setEnabled] = useState(false)

  const setEvents = useEventStore((state) => state.setEvents)
  const setPoints = useEventStore((state) => state.setPoints)

  const {
    isLoading,
    isError,
    data: events = null,
    error
  } = useQuery({
    queryKey: ['events', unitId, filters],
    queryFn: () => getEvents(unitId, filters),
    enabled
  })

  useEffect(() => {
    if (events?.length > 0) {
      setEvents(events)
    }
    setEnabled(false)
  }, [events, setEvents, setPoints])

  const handleRequest = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const dates = Object.fromEntries(formData)

    const initDate = new Date(dates.init)
    const endDate = new Date(dates.end)

    const oneDayInMs = 24 * 60 * 60 * 1000
    const difference = endDate - initDate

    if (initDate > endDate) {
      Swal.fire({
        icon: 'error',
        title: 'La fecha de inicio no puede ser mayor que la fecha de fin.'
      })
    } else if (difference > oneDayInMs) {
      Swal.fire({
        icon: 'error',
        title: 'El rango de fechas no puede ser mayor a un día.'
      })
    } else if (dates.init === '' || dates.end === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Ambas fechas deben de contener un valor.'
      })
    } else {
      setFilters(dates)
      setEnabled(true)
    }
  }

  return {
    isLoading,
    isError,
    error,
    events,
    handleRequest,
    name,
    unitId
  }
}
