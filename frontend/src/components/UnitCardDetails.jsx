export const UnitCardDetails = ({ name, value, Icon }) => {
  return (
    <dl className='card-info'>
      <Icon className='h-5 w-5 text-blue-500 mr-2' />
      <dt className='card-info-label'>{name}:</dt>
      <dl className='card-info-value'>{value}</dl>
    </dl>
  )
}
