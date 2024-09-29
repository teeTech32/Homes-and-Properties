import { useState, useEffect, } from "react"
import {useParams} from 'react-router-dom'
import Spinner from "../components/Spinner"
import {toast} from 'react-toastify'
import { db } from "../firebase.config"
import { getDocs, where, query, limit, collection, orderBy, startAfter } from "firebase/firestore"
import ListingItem from "../components/ListingItem"

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()
  useEffect(()=>{
    const fetchListings = async() => {
        try{
          const listingsRef = collection(db, 'listings')

          const q = query(
                   listingsRef, 
                  where('type', '==', params.categoryName),
                  orderBy('timestamp', 'desc'), 
                  limit(2)
                  )

        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)
          const listings = []

        querySnap.forEach((doc)=>{
         return listings.push({
            data : doc.data(),
            id : doc.id
          })  
        })
        setListings(listings)
        setLoading(false)
       
        
        }catch(error){
         toast.error('Could not fetch listings')
        }   
    }
    fetchListings()
    // eslint-disable-next-line
  }, [])

  // Pagination / Load More Listing
  const onFetchMoreListings = async() => {
    try{
      const listingsRef = collection(db, 'listings')

      const q = query(
               listingsRef, 
              where('type', '==', params.categoryName),
              orderBy('timestamp', 'desc'), 
              startAfter(lastFetchedListing),
              limit(10)
              )

    const querySnap = await getDocs(q)
    const lastVisible = querySnap.docs[querySnap.docs.length - 1]
    setLastFetchedListing(lastVisible)
      const listings = []

    querySnap.forEach((doc)=>{
     return listings.push({
        data : doc.data(),
        id : doc.id
      })  
    })
    setListings((prevStata)=> [...prevStata, ...listings])
    setLoading(false)
    
    
    }catch(error){
     toast.error('Could not fetch listings')
    }   
}

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' ? ' Places for rent' : 'Places for sale'}
        </p>
      </header>
      {loading ? <Spinner/> : listings && listings.length > 0 ? 
      <>
        <main>
          <ul className="categoryListings">
            {listings.map((listing) => (
              <ListingItem key={listing.id} 
                           id={listing.id} 
                           listing={listing.data}/>
            ))}
          </ul>
          <br />
          <br />
          {lastFetchedListing && <p className='loadMore' onClick={onFetchMoreListings
          }>
             More Listings
            </p>}
        </main>
      </> : (<h3> NO Places for {params.categoryName} </h3>)}
    </div>
  )
}

export default Category