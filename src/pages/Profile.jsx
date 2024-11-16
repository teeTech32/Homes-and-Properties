import {  useState, useEffect } from "react"
import {  useNavigate, Link } from "react-router-dom"
import {getAuth, updateProfile} from 'firebase/auth'
import { db } from "../firebase.config"
import { updateDoc, doc, collection, getDocs, where, orderBy, query, deleteDoc } from "firebase/firestore"
import {toast} from 'react-toastify'
import homeIcon from '../assets/svg/homeIcon.svg'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'


function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
   email: auth.currentUser.email,
   name: auth.currentUser.displayName
  })
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const {name, email} = formData
  const navigate = useNavigate()

  useEffect(()=>{
   const fetchUserListings = async()=>{
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef,
                where("userRef", "==", auth.currentUser.uid),
                orderBy('timestamp', 'desc'))

        const querySnap = await getDocs(q)
        
        let listings = []
      
      querySnap.forEach((doc)=>{
        return listings.push({
          id : doc.id,
          data : doc.data() 
        })
      })
      setListings(listings)
      setLoading(false)
    }
    fetchUserListings()
  },[auth.currentUser.uid])

 const onLogout = () =>{
  auth.signOut()
  navigate('/')
 }

 const onSubmit = async() =>{
 try{
  
  if(auth.currentUser.displayName !== name){
    await updateProfile(auth.currentUser, {
      displayName: name
    })
  }
  
  const userRef = doc(db, 'users', auth.currentUser.uid)
  await updateDoc(userRef, {
    name,
  } )
  toast.success('Profile has been updated successfully')

 }catch(error){
  toast.error('Profile could not be updated')
 }
 }

 const onChange = (e) =>{
  setFormData((prevState) => ({...prevState,
    [e.target.id]:e.target.value
  }))
 }
 
 const onDelete = async(listingId)=>{
  if(window.confirm('Are you about this?')){
    await deleteDoc(doc(db, 'listings', listingId))
    const updateListings = listings.filter((listing)=>(
      listing.id !== listingId
    )  
    )
    setListings(updateListings) 
    toast.success('Listing Successfully Deleted')
  }

 }

 const onEdit = (listingId)=>{
  navigate(`/edit-listing/${listingId}`)
  toast.success('Listing is ready for Editing')
 }
 
 if(loading){
  return <Spinner/>
 }
 
  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">
        My Profile
      </p>
      <button className="logOut" onClick={onLogout}>
        Logout
      </button>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={()=>{
          changeDetails && onSubmit()
          setChangeDetails((prevState)=> !prevState)
        }}>
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>
      <div className="profileCard">
        <form>
          <input type="text" 
                 id="name" 
                 value={name} 
                 onChange={onChange} 
                 className={!changeDetails ? 'profileName' : 'profileNameActive'}
                 disabled={!changeDetails} />
          <input type="text" 
                 id="email" 
                 value={email} 
                 onChange={onChange} 
                 className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                 disabled={!changeDetails} />
        </form>

      </div>
      <Link to='/create-listing' className="createListing">
         <img src={homeIcon} alt="home" />
         <p>Create listing for Rent or Sell</p>
         <img src={arrowRight} alt="Arrow" />
      </Link>
      {!loading && listings?.length >0 && (
      <>
        <p className="listingText">Your Listings</p>
        <ul className="listingsList">
          {listings.map((listing)=>(
            <ListingItem key={listing.id} 
                         id={listing.id}
                         listing={listing.data}  
                         onDelete={()=>onDelete(listing.id)}
                         onEdit={()=> onEdit(listing.id)}/>
          ))}

        </ul>
      </>
        

)}
    </main>
    
  </div>
}

export default Profile