import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import Oauth from "../components/Oauth"
import  {FaEye, FaEyeSlash} from "react-icons/fa"

function SignIn() {
  const [showPassword, setShowpassword] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const {email, password} = formData

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

        const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
        if(userCredential.user){
        toast.success('Welcome Back')
        navigate('/profile')
        }
    }catch(error){
      toast.error('Bad Credentials OR Check your internet connectivity ')
      
    }
       
    
  }

  return (
    <>
      <div class="flex justify-center relative" >
        <div class="container w-[300px] h-500px bg-slate-600 p-5 rounded-xl my-20">
          <header>
          <h1 class="text-4xl font-bold pl-20 mb-4 text-green-600 ">LogIn</h1> 
          </header>
          <form onSubmit={onSubmit}>
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
              <div class="items-center space-x-16">
                <button onClick={()=> navigate('/sign-up')} class="btn btn-md bg-green-500 text-white font-bold ml-3 hover:text-black">
                  Sign Up
                </button>
                <button class="btn btn-md bg-green-500 text-white font-bold hover:text-black" >
                  Sign In
                </button>
                <Oauth/>
              </div>  
          </form>
          </div>
      </div>
    </>
    
  )
}

export default SignIn
