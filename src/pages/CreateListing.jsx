import {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import {db} from '../firebase.config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from 'uuid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { FaDeleteLeft } from 'react-icons/fa6'


function CreateListing() {
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line
  const [geolocationEnable, setGeolocationEnable] = useState(false)
  const [formData, setFormData] = useState({
    type:'rent',
    name:'',
    bedrooms:1,
    bathrooms:1,
    parking:false,
    furnished:false,
    offer:false,
    discountedPrice:0,
    regularPrice:0,
    address:'',
    images:{},
    latitude:0,
    longitude:0
  })

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const {type, name, bedrooms, bathrooms, parking, furnished, offer, regularPrice, discountedPrice, images, address, latitude, longitude } = formData

  useEffect(()=>{
    if(isMounted){
      onAuthStateChanged(auth, (user)=>{
        if(user){
          setFormData({...formData, userRef: user.uid})
        }else{
          navigate('/sign-in')
        }

      })
    }

    return ()=>{
      isMounted.current = false
    }
    // eslint-disable-next-line
  },[isMounted])

  const onMutate = (e) =>{
    let boolean = null
    if(e.target.value === true){
        boolean = true
    }
    if(e.target.value === false){
      boolean = false
  }
    // Files
    if(e.target.files){
      setFormData((prevState)=>({
        ...prevState, 
        images: e.target.files
      }))
    }
    // Files,Booleans,Numbers
    if(!e.target.files){
      setFormData((prevState)=>({
        ...prevState, 
        [e.target.id]: boolean ?? e.target.value
      }))
    }
  }

  if(loading){
    return <Spinner/>
   }

  const onSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    
  if(discountedPrice>=regularPrice){
    setLoading(false)
    toast.error('Discounted Price Must Not Be Greater Than The Reguler Price')
    return
  }

  if(images.length>6){
    setLoading(false)
    toast.error('The Images Max Is 6')
    return
  }

  let geolocation = {}
  let location

  if(geolocationEnable){
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&sensor=true&key=${process.env.REACT_APP_API_KEY}`)

    const data = await response.json()
  
    geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
    geolocation.lng = data.results[0]?.geometry.location.lng ?? 0
    location = data.status === 'ZERO_RESULTS' ? 
              undefined : data.results[0]?.formatted_address
    if(location === undefined || location.includes('undefined')){
      setLoading(false)
      toast.error('Please type in the correct address')
      if (data.status === 'REQUEST_DENIED') {
        toast.error('REQUEST_DENIED!')
      }
      return
    }

  }else{
    geolocation.lat = latitude
    geolocation.lng = longitude
  }

  const storageImage = async(image)=>{
    return new Promise((resolve, reject)=>{
      const storage = getStorage()
      const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
      const storageRef = ref(storage, 'images/' + fileName)

      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on('state_changed',(snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            break
        }
      },
       (error) => {
      reject(error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    })
  }
const imgUrls = await Promise.all(
  [...images].map((image)=>storageImage(image))
  ).catch(()=>{
    setLoading(false)
    toast.error('Images Not Uploaded')
    return
  })
const formDataCopy = {
  ...formData,
  imgUrls,
  geolocation,
  timestamp : serverTimestamp()
}
formDataCopy.location = address
delete formDataCopy.images
delete formDataCopy.address
!formDataCopy.offer && delete formDataCopy.discountedPrice

const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
 setLoading(false)
 toast.success('Listing saved')
 navigate(`/category/${formDataCopy.type}/${docRef.id}`)

  }

  return <div className='profile'>
    <div className='profile1'>
       <header >
              <p className="pageHeader">
                Create a Listing
                <FaDeleteLeft onClick={()=> navigate('/profile')} class="ml-8 hover:cursor-pointer hover:text-red-500" />
              </p>
            </header>
            <main className='main'>
              <form onSubmit = {onSubmit}>
                <label className='formLabel'> Sell / Rent</label>
                <div className="formButtons">
                  <button type='button'
                          id='type'
                          value='sale'
                          className={type==='sale' ? 'formButtonActive' : 'formButton'}
                          onClick={onMutate}>
                    Sell
                  </button>
                  <button type='button'
                          id='type'
                          value='type'
                          className={type==='rent' ? 'formButtonActive' : 'formButton'}
                          onClick={onMutate}>
                    Rent
                  </button>
                </div>
                <label className='formLabel'>Name</label>
                <input type="text" 
                        className="formInputName"
                        id='name'
                        value={name}
                        minLength={10}
                        maxLength={32}
                        onChange={onMutate}
                        required />
                 <div className="formRooms">
                  <div>
                    <label className='formLabelSmall'>Bedrooms</label>
                    <input type="number" 
                          className="formInputSmall"
                          id='bedrooms'
                          value={bedrooms}
                          min={1}
                          max={50}
                          onChange={onMutate} />
                  </div>
                  <div>
                    <label className='formLabelSmall'>Bathrooms</label>
                    <input type="number" 
                          className="formInputSmall"
                          id='bathrooms'
                          value={bathrooms}
                          min={1}
                          max={50}
                          onChange={onMutate} />
                  </div>
                 </div> 
                 <label className='formLabel'>Parking Spot</label>
                 <div className="formButtons">
                  <button type='button'
                       className={parking ? 'formButtonActive' : 'formButton'}
                       id='parking'
                       value={parking}
                       onClick={onMutate}>
                   YES
                  </button>
                  <button type='button'
                       className={!parking && parking !== null ? 'formButtonActive' : 'formButton'}
                       id='parking'
                       value={parking}
                       onClick={onMutate}>
                   NO
                  </button>
                 </div>
                 <label className='formLabel'>Furnished</label>
                 <div className="formButtons">
                  <button type='button'
                       className={furnished ? 'formButtonActive' : 'formButton'}
                       id='furnished'
                       value={furnished}
                       onClick={onMutate}>
                   YES
                  </button>
                  <button type='button'
                       className={!furnished && furnished !== null ? 'formButtonActive' : 'formButton'}
                       id='furnished'
                       value={furnished}
                       onClick={onMutate}>
                   NO
                  </button>
                 </div>
                 <label className='formLabel'>Address</label>
                 <textarea type="text" 
                           id="address"  
                            value={address}
                            onChange={onMutate}
                            className='formInputAddress'

                            />
                {!geolocationEnable && (
                <>
                  <div className="formLatLng">
                    <div>
                      <label className='formLabelSmalls'>Latitute</label>
                      <input type="number"
                          className="inputSmall"
                          id='latitude'
                          value={latitude} 
                          onChange={onMutate}
                          />
                    </div>
                    <div>
                      <label className='formLabelSmalls'>Longitude</label>
                      <input type="number"
                          className="inputSmall"
                          id='longitude'
                          value={longitude} 
                          onChange={onMutate}
                          />
                    </div>
                  </div>
                </>
              )}
                 <label className='formLabel'>Offer</label>
                 <div className="formButtons">
                  <button type='button'
                       className={offer ? 'formButtonActive' : 'formButton'}
                       id='offer'
                       value={true}
                       onClick={onMutate}>
                   YES
                  </button>
                  <button type='button'
                       className={!offer && offer !== null ? 'formButtonActive' : 'formButton'}
                       id='offer'
                       value={false}
                       onClick={onMutate}>
                   NO
                  </button>
                 </div> 
                 <label className='formLabel'>Regular Price</label>
                 <div className="formPriceDiv">
                  <input type="number" 
                          className="formInputSmall"
                          id='regularPrice'
                          value={regularPrice}
                          onChange={onMutate}
                          min='50'
                          max='750000000' />
                  {type==='rent' && (
                    <p className="formPriceText"> $ / Month</p>
                  )}
                  </div>     
                {offer && (
                  <>
                    <label className='formLabel'>Discounted Price</label>
                    <div className="formPriceDiv">
                      <input type="number" 
                              className="formInputSmall"
                              id='discountedPrice'
                              value={discountedPrice}
                              onChange={onMutate}
                              min='50'
                              max='750000000' />
                      {type==='rent' && (
                        <p className="formPriceText"> $ / Month</p>
                      )}
                    </div>
                     
                  </> 
                )
                }
                <label className='formLabel'>Images</label>
                <p className="imagesInfo">The first image is the cover (max6).</p>
                <input type="file" 
                      className="formInputFile"
                      id='images'
                      onChange={onMutate}
                      max='6'
                      accept='.jpg,.png,.jpeg'
                      multiple
                      required /> 
               <button className="primaryButton createListingButton"
                       type='submit'
                       >
                   Create Listing
                </button> 
              </form>
            </main>
      
    </div>
           
        </div>
  
}

export default CreateListing