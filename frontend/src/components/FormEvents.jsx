import { useEffect } from 'react'
import { useEventStore } from '../store/useEventStore'
import { useReports } from '../hooks/useReports'
import { MdOutlineSaveAlt } from 'react-icons/md'
import { HiDocumentReport } from 'react-icons/hi'

const FormEvents = ({ submit, loading, id }) => {
  const { handleSaveReport, isLoading } = useReports()
  const resetEvents = useEventStore((state) => state.resetEvents)

  useEffect(() => {
    resetEvents()
  }, [resetEvents])

  const events = useEventStore((state) => state.events)

  return (
    <form
      className='space-y-4 mb-6 bg-gray-800 p-6 rounded-lg shadow-md'
      onSubmit={submit}
    >
      <div>
        <label
          htmlFor='init'
          className='block text-sm font-medium text-gray-300'
        >
          Fecha Inicio
        </label>
        <input
          id='init'
          type='datetime-local'
          required
          className='mt-1 block w-full rounded-sm shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-700 border-gray-600 text-white py-1 px-2'
          name='init'
        />
      </div>
      <div>
        <label
          htmlFor='end'
          className='block text-sm font-medium text-gray-300'
        >
          Fecha Fin
        </label>
        <input
          id='end'
          type='datetime-local'
          required
          className='mt-1 block w-full rounded-sm shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-700 border-gray-600 text-white py-1 px-2'
          name='end'
        />
      </div>
      <div className='flex gap-2 items-center justify-center flex-col md:flex-row'>
        <button
          className='flex items-center justify-center w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform cursor-pointer disabled:bg-blue-200 disabled:cursor-not-allowed disabled:text-gray-400'
          disabled={loading}
        >
          <HiDocumentReport fontSize={27} />
          {loading ? 'Generando reporte...' : 'Generar reporte'}
        </button>

        {events.length > 0 && (
          <button
            className='flex items-center justify-center gap-1  w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform cursor-pointer disabled:bg-blue-200 disabled:cursor-not-allowed disabled:text-gray-400'
            onClick={() => handleSaveReport(id)}
            disabled={isLoading}
          >
            <MdOutlineSaveAlt fontSize={27} />
            {isLoading ? 'Guardando reporte...' : 'Guardar reporte'}
          </button>
        )}
      </div>
    </form>
  )
}
export default FormEvents
