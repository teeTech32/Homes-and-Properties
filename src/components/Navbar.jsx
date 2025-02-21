import { useNavigate} from 'react-router-dom'
import { FaHouseUser, FaUserAlt } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate()

 return (
          <div data-aos='zoom-in'
            data-aos-offset='200'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-out-sine' class='navbar bg-slate-800 p-1  relative'>
              <div class='group cursor-pointer  absolute top-6 md:top-5 left-5 md:left-10' onClick={() => navigate('/')}>
                <FaHouseUser class="text-white font-bold text-4xl lg:text-5xl hover:text-green-500 " />
                <h4 class="text-white font-bold hover:text-green-500 lg:text-xl">Home</h4>
              </div>
              <div class=' group cursor-pointer absolute top-6 md:top-5 right-[42%] md:right-[45%] flex justify-center' onClick={() => navigate('/offer')}>
                <MdLocalOffer class="text-white font-bold text-4xl lg:text-5xl hover:text-green-500 "/>
                <h4 class="text-white font-bold hover:text-green-500 lg:text-xl">Offers</h4>
              </div>
              <div class='group cursor-pointer  absolute top-6 md:top-5 right-5 md:right-10' onClick={() => navigate('/profile')}>
                <FaUserAlt class="text-white font-bold text-4xl lg:text-5xl hover:text-green-500 "/>
                <h4  class="text-white font-bold hover:text-green-500 lg:text-xl">Profile</h4>
              </div>
            </div> 
  )
}
export default Navbar
