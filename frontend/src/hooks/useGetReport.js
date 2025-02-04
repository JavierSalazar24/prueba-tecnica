import { useParams, useSearchParams } from 'react-router-dom'
import { getReports } from '../api/requests'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useEventStore } from '../store/useEventStore'

export const useGetReport = () => {
  const { unitId } = useParams()
  const [searchParams] = useSearchParams()
  const name = searchParams.get('unit')

  const setEvents = useEventStore((state) => state.setEvents)
  const setPoints = useEventStore((state) => state.setPoints)

  const {
    isLoading,
    isError,
    data: events = null,
    error
  } = useQuery({
    queryKey: ['get-reports', unitId],
    queryFn: () => getReports(unitId)
  })

  useEffect(() => {
    if (events?.length > 0) {
      setEvents(events)
    }
  }, [events, setEvents, setPoints])

  return {
    isLoading,
    isError,
    events,
    error,
    name
  }
}
