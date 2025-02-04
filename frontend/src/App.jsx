import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Loading } from './components/Loading'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

const Dashboard = lazy(() => import('./components/Dashboard'))
const ReportData = lazy(() => import('./components/ReportData'))
const Events = lazy(() => import('./components/Events'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <HelmetProvider>
          <main className='flex h-screen'>
            <Toaster richColors position='top-right' />
            <div className='flex flex-col flex-grow'>
              <div className='p-4 overflow-auto'>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/reports/:unitId' element={<ReportData />} />
                  <Route path='/events/:unitId' element={<Events />} />
                </Routes>
              </div>
            </div>
          </main>
        </HelmetProvider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
