import { Helmet } from 'react-helmet-async'
import { useGetReport } from '../hooks/useGetReport'
import { EmptyEvents } from './EmptyEvents'
import { Error } from './Error'
import { EventsHistory } from './EventsHistory'
import { Loading } from './Loading'
import { MapView } from './MapView'
import { Navbar } from './Navbar'

const ReportData = () => {
  const { isLoading, isError, events, error, name } = useGetReport()

  return (
    <>
      <Helmet>
        <title>TECNOCONTROL | {name}</title>
      </Helmet>

      <Navbar title={`Reportes de la unidad ${name}`} />

      <div className='border border-gray-700 rounded-lg p-4 max-h-[800px] overflow-y-auto bg-gray-800 shadow-md mt-4'>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error message={error.message} />
        ) : (
          events?.length > 0 && (
            <article className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <EventsHistory />
              <MapView />
            </article>
          )
        )}
        {events?.length === 0 && <EmptyEvents />}
      </div>
    </>
  )
}

export default ReportData
