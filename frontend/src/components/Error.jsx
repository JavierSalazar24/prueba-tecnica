export const Error = ({ message }) => {
  return (
    <div className='flex justify-center'>
      <h3 className='font-bold text-red-600 text-2xl'>{message}</h3>
    </div>
  )
}
