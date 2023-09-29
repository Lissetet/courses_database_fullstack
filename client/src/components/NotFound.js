import Error from './Error'

const NotFound = ({item="page"}) => (
  <Error 
    title={`${item} not found`}
    message={`Sorry! We couldn't find the ${item} you're looking for.`}
  />
)

export default NotFound