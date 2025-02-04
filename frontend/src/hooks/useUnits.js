import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUnits } from '../api/requests'

export const useUnits = () => {
  const [search, setSearch] = useState('')

  const {
    isLoading,
    isError,
    data: units,
    error
  } = useQuery({
    queryKey: search ? ['searchUnits', search] : ['units'],
    queryFn: () => (search ? getUnits(search) : getUnits())
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.search.value)
  }

  const handleReset = () => setSearch('')

  return {
    isLoading,
    isError,
    units,
    error,
    handleSearch,
    handleReset,
    search
  }
}
