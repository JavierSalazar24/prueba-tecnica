export const FormUnits = ({ handleSearch, handleReset }) => {
  return (
    <form className='mt-4 flex justify-center gap-4' onSubmit={handleSearch}>
      <input
        autoComplete='off'
        type='search'
        id='search'
        placeholder='Buscar...'
        className='w-[50%] border-2 border-gray-500 rounded-sm px-2 text-gray-300 placeholder:text-gray-300 outline-0'
      />
      <div className='flex gap-1'>
        <button className='bg-slate-600 rounded-sm px-2 py-1 flex justify-center items-center cursor-pointer hover:bg-slate-700 transition'>
          Buscar
        </button>
        <button
          onClick={handleReset}
          type='reset'
          className='bg-slate-600 rounded-sm px-2 py-1 flex justify-center items-center cursor-pointer hover:bg-slate-700 transition'
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}
