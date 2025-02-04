import { Error } from './Error'
import { Loading } from './Loading'
import { UnitCard } from './UnitCard'
import { Navbar } from './Navbar'
import { useUnits } from '../hooks/useUnits'
import { Helmet } from 'react-helmet-async'
import { FormUnits } from './FormUnits'

const Dashboard = () => {
  const { isLoading, isError, error, units, handleSearch, handleReset } =
    useUnits()

  return (
    <>
      <Helmet>
        <title>TECNOCONTROL | DASHBOARD</title>
      </Helmet>

      <main className='max-w-[1200px] mx-auto'>
        <Navbar title='Gestión de unidades' />

        <FormUnits handleReset={handleReset} handleSearch={handleSearch} />

        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error message={error.message} />
        ) : (
          <section className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {units.map((unit) => (
              <UnitCard unit={unit} key={unit.idgps} />
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default Dashboard
