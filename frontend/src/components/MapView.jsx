import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin
} from '@vis.gl/react-google-maps'
import { useEventStore } from '../store/useEventStore'
import { GOOGLE_API_KEY } from '../config'

export const MapView = () => {
  const points = useEventStore((state) => state.points)

  return (
    <div className='border border-gray-700 rounded-lg h-[400px] flex flex-col items-center justify-center bg-gray-800 p-4 shadow-md'>
      <APIProvider apiKey={GOOGLE_API_KEY}>
        <Map
          defaultZoom={5}
          defaultCenter={{ lat: 24.167854, lng: -102.667606 }}
          mapId='da37f3254c6a6d1c'
        >
          {points.map((point, index) => (
            <AdvancedMarker
              key={index}
              position={{ lat: point.lat, lng: point.lng }}
            >
              <div className='absolute bg-black text-red-400 text-xs px-2 py-1 rounded-md shadow-md'>
                {point.lat.toFixed(5)}, {point.lng.toFixed(5)}
              </div>
              <Pin
                background={point.marker ? '#34D399' : '#EF4444'}
                glyphColor={'#000'}
                borderColor={'#000'}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  )
}
