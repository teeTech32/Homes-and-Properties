import{useEffect, useState, } from 'react'
import{Link, useNavigate, useParams} from 'react-router-dom'
import{db} from '../firebase.config'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import {MapContainer, TileLayer, Popup, Marker} from 'react-leaflet'
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'


function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const params = useParams()
  const navigate = useNavigate()
  const auth = getAuth()
 useEffect(()=>{
    const fetchListing = async()=>{
    
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()){
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
    
 }, [navigate, params.listingId])

 if(loading){
  return <Spinner/>
 }
  return (
  <main>
      <Swiper slidesPerView={1}
              pagination={{clickable: true}} 
        modules={[Navigation, Pagination, Scrollbar, A11y]}>
          {listing.imgUrls.map((url, index) => (
              <SwiperSlide key={index} >
              <div  style={{background: `url(${listing.imgUrls[index]})`,
              backgroundPosition:'center',  backgroundRepeat:"no-repeat",
              backgroundSize:'cover', 
              cursor: "pointer",
              }}
            className="swiperSlideDiv">Slide for Images</div> 
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="shareIconDiv" onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(()=>{
          setShareLinkCopied(false)
        },2000)
      }}>
        {shareLinkCopied && <p className='linkCopied'>
          Link Copied!</p>}
        <img src={shareIcon} alt="" />
      </div>
      <div className="listingDetails">
      <p className="listingName">
          {listing.name}-${listing.offer ? listing.discountedPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ','): listing.regularPrice 
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="listingLocation">
          {listing.location}
        </p>
        <p className="listingType">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        <p className = 'discountPrice'>
          ${listing.offer && (listing.regularPrice-listing.discountedPrice)} discount
        </p>
        <ul className="listingDetailsList">
          <li>
          {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` :'1 Bedroom'}
          </li>
          <li>
          {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` :'1 Bathroom'}
          </li>
          <li>
            {listing.parking && 'Parking Spot'}
          </li>
          <li>
            {listing.furnished && 'Funished'}
          </li>
        </ul>
        <p className="listingLocationTitle">
          Location
        </p>

        <div className="leafletContainer">
          <MapContainer 
            style={{height:'100%', width: '100%'}}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom = {true} >
            <TileLayer  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'/>

            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
              <Popup>
                {listing.location}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>
              Contact Landlord
          </Link>
        )}
      </div>
      

    </main>
  )
  
    
}

export default Listing