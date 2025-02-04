export const Event = ({ name, value, ignicion, off }) => {
  return (
    <dl className='mb-1 flex items-center gap-2'>
      <dt className='text-gray-300 font-bold'>{name}:</dt>{' '}
      <dd
        className={`text-gray-200 ${
          ignicion
            ? off
              ? 'bg-green-500 px-1 rounded-sm'
              : 'bg-red-500 px-1 rounded-sm'
            : ''
        }`}
      >
        {value}
      </dd>
    </dl>
  )
}
