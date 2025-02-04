import { useQuery } from '@tanstack/react-query'
import { addEvents } from '../api/requests'
import { useEventStore } from '../store/useEventStore'
import { useEffect, useState } from 'react'

export const useReports = () => {
  const events = useEventStore((state) => state.events)
  const [enabled, setEnabled] = useState(false)
  const [id, setId] = useState()

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['reports'],
    queryFn: () => addEvents(events, id),
    enabled
  })

  useEffect(() => {
    setEnabled(false)
  }, [data])

  const handleSaveReport = (id) => {
    setId(id)
    setEnabled(true)
  }

  if (isError) console.log(error)

  return {
    isLoading,
    isError,
    error,
    handleSaveReport
  }
}
