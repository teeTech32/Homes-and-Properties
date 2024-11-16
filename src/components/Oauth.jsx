import {useNavigate, useLocation} from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { setDoc, getDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

export default function Oauth() {
  const location = useLocation()
  const navigate = useNavigate()
  
 const onGoogleClick = async() => {
  try{
    const auth = getAuth()
    const Provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, Provider)
    const user = result.user

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()){
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp()
      })
    }

    navigate('/profile')
    toast.success('You have successfully loggedIn With Google')

  }catch(error){
    toast.error("Couldn't Loggedin with google")
  }

 }

  return (
    <div class='items-center mt-7'>
      <p class='font-bold text-white  mb-0 ml-2'>Sign  {location.pathname==='/sign-up' ? 'Up With :' : 'In With :'}</p>
      <button class='' onClick = {onGoogleClick}>
        <img class='hover:scale-75 scale-50 bg-white rounded-full mt-0' src={googleIcon} alt="google" />
      </button>
    </div>
  )
}
