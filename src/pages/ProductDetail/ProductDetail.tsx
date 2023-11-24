import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()
  return (
    <div>
      <div className='grid '>Product details</div>
    </div>
  )
}

export default ProductDetail
