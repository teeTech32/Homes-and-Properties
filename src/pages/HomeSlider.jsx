import {useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, query, orderBy, limit, getDocs} from 'firebase/firestore'
import {db} from '../firebase.config'
import Spinner from '../components/Spinner'
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'


function HomeSlider() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    
  const fetchListings = async() =>{
    
    const listingsRef = collection(db, 'listings')
    const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
    const querySnap = await getDocs(q) 
      let listings = []
      querySnap.forEach((doc) => {

        return listings.push({
          data: doc.data(),
          id: doc.id
        })
      });
      setListings(listings)
      setLoading(false)  
  }
  fetchListings()
  })
  

  if(loading){
    return <Spinner/>
  }

  
  return (
    
     listings && (
      <>
        <p class="lg:text-2xl font-semibold lg:font-bold lg:py-5 py-3 sm:text-xl text-black ">Slide Left For Latest Recommended</p>

        <Swiper  slidesPerView={1} pagination={{clickable: true}} modules={[Navigation, Pagination, Scrollbar, A11y]}>
          {listings.map(({data, id})=>(
            <SwiperSlide key={id} onClick={()=> navigate(`/category/${data.type}/${id}`)}>
              <div style={{
                background: `url(${data.imgUrls[0]})`, backgroundPosition:'center',  backgroundRepeat:"no-repeat",
                backgroundSize:'cover', 
                cursor: "pointer"
              }} className="swiperSlideDiv">
                <p className="listingType">House For {data.type === 'rent' ? 'Rent' : 'Sale'}</p>
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {' '}{data.type === 'rent' && '/ month'}
                  </p>
             
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
       </>
     
      
     )
    
  )
}

export default HomeSlider