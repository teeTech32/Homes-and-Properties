import { Link } from 'react-router-dom'
import rentCategoryImg from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImg from '../assets/jpg/sellCategoryImage.jpg'
import HomeSlider from './HomeSlider'
import Tesmonials from './Tesmonials'

function Explore() {
  return (
    <>
    <div className='bg-slate-400 pr-10 pl-10 pt-20 pb-20 lg:px-20'>
      <header  class="flex justify-center">
        <h1 data-aos='zoom-in'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine' class="text-2xl lg:text-4xl font-bold text-black">Welcome To ABC Homes And Properties</h1>
      </header>
      <main>
       <HomeSlider/>
       <div class="flex justify-center mt-10 mb-5">
         <h2 data-aos='fade-up'
            data-aos-offset='200'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-out-sine' class="font-bold text-xl justify-center lg:text-2xl text-black">Categories</h2>
       </div>
        
        <div data-aos='flip-left'
            data-aos-offset='200'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-out-cubic' className="exploreCategories">
          <Link to='/category/rent'>
            <img src={rentCategoryImg} alt="rent"  className='exploreCategoryImg'/>
            <h4 class="font-bold text-black text-sm lg:text-2xl">Places for rent</h4>
          </Link>
          <Link  to='/category/sale'>
            <img src={sellCategoryImg} alt="sell"  className='exploreCategoryImg'/>
            <h4 class="font-bold text-black text-sm lg:text-2xl">Places for sale</h4>
          </Link>
        </div>
        <Tesmonials/>
      </main>

    </div>
    </>
    
  )
}

export default Explore