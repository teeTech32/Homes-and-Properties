import { useState } from "react"
import { toast } from "react-toastify"
import {useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import Oauth from "../components/Oauth"
import  {FaEye, FaEyeSlash} from "react-icons/fa"

function SignUp() {
  const [showPassword, setShowpassword] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const {name, email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    try{
      const auth = getAuth()

     const userCredential = await createUserWithEmailAndPassword(auth, email, password)

     const user =  userCredential.user

     updateProfile(auth.currentUser, {
      displayName: name
     })

     const formDataCopy = {...formData}
     delete formDataCopy.password
     formDataCopy.timestamp = serverTimestamp()

     await setDoc(doc(db, 'users', user.uid), formDataCopy)

     navigate('/profile')
     toast.success('You are successfully registered')

    }catch(error){
      toast.error('Check your internet connectivity OR the Firebase Quota has exceeded For today')
    }
  }

  return (
    <>
      <div class="flex justify-center relative" >
        <div class="container w-[300px] h-500px bg-slate-600 p-5 rounded-xl my-20">
          <header>
          <h1 class="text-4xl font-bold ml-14 mb-4 text-green-600 ">Register</h1> 
          </header>
          <form onSubmit={onSubmit}>
          <input type="text"
                  required 
                  class="input input-md rounded-full mb-7 text-black font-black hover:bg-gray-300"
                  value={name} 
                  id="name" 
                  placeholder="Name" 
                  onChange={onChange}  />

            <input type="email" 
                  required
                  class="input input-md rounded-full mb-7 text-black font-black hover:bg-gray-300"
                  value={email} 
                  id="email" 
                  placeholder="Email" 
                  onChange={onChange}  />

            <div  class="group flex relative">
              <input type= {showPassword ? 'password' : 'text'}
                    required
                    placeholder="Password"
                    id="password"
                    onChange={onChange}
                    value={password}
                    className="input input-md rounded-full mb-7 text-black font-black hover:bg-gray-300" />
                    <div  class="text-2xl absolute top-3 right-2 cursor-pointer" onClick={() => setShowpassword(prevState => !prevState)}>
                      {showPassword ? <FaEye/> : <FaEyeSlash/> } 
                    </div>
            </div>
              <div class="items-center space-x-16 ">
                <button onClick={()=> navigate('/sign-in')} class="btn btn-md bg-green-500 text-white font-bold ml-4 hover:text-black">
                  Sign In
                </button>
                <button class="btn btn-md bg-green-500 text-white font-bold hover:text-black ">
                  Sign Up
                </button>
                <Oauth/>
              </div>  
          </form>
          </div>
      </div>
    </>
    
  )
}

export default SignUp