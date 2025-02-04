import { create } from 'zustand'

export const useEventStore = create((set) => ({
  events: [],
  points: [],
  setEvents: (evts) => {
    const normalizedEvents = evts.map((event) =>
      Object.fromEntries(
        Object.entries(event).map(([key, value]) => [key.toLowerCase(), value])
      )
    )
    set({
      events: normalizedEvents,
      points: normalizedEvents.map((event) => ({
        lat: event.lat,
        lng: event.lon,
        marker: event.ignicion === 'Motor Encendido'
      }))
    })
  },
  resetEvents: () => set({ events: [], points: [] })
}))
