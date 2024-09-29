import { useNavigate} from 'react-router-dom'
import { FaHouseUser, FaUserAlt } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate()

 

  return (
        <div class="flex justify-center bg-slate-800">
          <div data-aos='zoom-in'
            data-aos-offset='200'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-out-sine' class='flex justify-between m-5  gap-12 space-x-8 lg:gap-48 lg:space-x-56'>
              <div class='group cursor-pointer pl-5 justify-center' onClick={() => navigate('/')}>
                <FaHouseUser class="text-white font-bold text-4xl lg:text-5xl hover:text-green-500 pl-3 lg:pl-1.5" />
                <h4 class="text-white font-bold hover:text-green-500 lg:text-xl">Home</h4>
              </div>
              <div class='group cursor-pointer' onClick={() => navigate('/offer')}>
                <MdLocalOffer class="text-white font-bold text-4xl lg:text-5xl hover:text-green-500 pl-3 lg:pl-1.5"/>
                <h4  class="text-white font-bold hover:text-green-500 lg:text-xl">Offers</h4>
              </div>
              <div class='group cursor-pointer pr-5' onClick={() => navigate('/profile')}>
                <FaUserAlt class="text-white font-bold text-4xl lg:text-5xl hover:text-green-500 pl-3 lg:pl-1.5"/>
                <h4  class="text-white font-bold hover:text-green-500 lg:text-xl">Profile</h4>
              </div>
            </div>
          </div>
        
  )
}

export default Navbar