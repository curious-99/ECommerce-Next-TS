import { Link } from 'react-router-dom'
import ProductCard from '../components/productCard'

const Home = () => {
  const addCartHandler = () => {}

  return (
    <div className='home'>
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className='findmore'>
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          productId='asddas'
          name='Macbook'
          price={69990}
          stock={23}
          handler={addCartHandler}
          photo='https://m.media-amazon.com/images/I/61aUBxqc5PL._SL1500_.jpg'
        />
      </main>
    </div>
  )
}

export default Home
