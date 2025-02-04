import { Loading } from './Loading'
import { Error } from './Error'
import FormEvents from './FormEvents'
import { EventsHistory } from './EventsHistory'
import { MapView } from './MapView'
import { Empty } from './Empty'
import { useEvents } from '../hooks/useEvents'
import { Helmet } from 'react-helmet-async'
import { Navbar } from './Navbar'

const Events = () => {
  const { isError, error, isLoading, name, events, handleRequest, unitId } =
    useEvents()

  return (
    <>
      <Helmet>
        <title>TECNOCONTROL | {name}</title>
      </Helmet>

      <Navbar title={`Reporte de la unidad ${name}`} />

      <section className='container mx-auto p-4'>
        <FormEvents submit={handleRequest} loading={isLoading} id={unitId} />

        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error message={error.message} />
        ) : (
          events?.length > 0 && (
            <article className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <EventsHistory id={unitId} name={name} show={true} />
              <MapView />
            </article>
          )
        )}
        {events?.mensaje && <Empty />}
      </section>
    </>
  )
}

export default Events
