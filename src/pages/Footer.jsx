import Banner from '../assets/footer-pattern.jpg'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow } from 'react-icons/fa6'
import { FaMobileAlt } from 'react-icons/fa'

const BannerImage = {
  backgroundImage:`url(${Banner})`,
  backgroundPosition:'bottom',
  backgroundRepeat:'no-repeat',
  backgroundSize:'cover',
  height:'100%',
  width:'100%'
}
const FooterLinks = [
  {
    title:'Home',
    link:'/#',
  },
  {
    title:'About',
    link:'/#about',
  },
  {
    title:'Contact',
    link:'/#contact',
  },
  {
    title:'Blog',
    link:'/#blog',
  },
]
const Footer = () => {
  return ( 
    <div style={BannerImage} className='text-white '>
      <div className='container'>
        <div data-aos='zoom-in'
            data-aos-offset='100'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-in-sine' className='grid md:grid-cols-3 pb-44 pt-5'>
          <div className='py-8 px-4'>
            <h1 className=' text-xl lg:text-2xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3'>
             ABCProperties</h1>
            <p className='lg:text-xl'>Every property holds a story, and every sale builds a dream. In real estate, we don't just sell homes—we create opportunities, foster communities, and open doors to new beginnings. Your vision is our mission. Let's turn aspirations into addresses and dreams into deeds. Together, we build more than homes—we build futures.</p>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
            <div>
              <div className='py-8 px-4'>
                <h1 className='sm:text-xl lg:text-2xl font-bold sm:text-left text-justify mb-3'>Important Links
                </h1>
                <ul className='flex flex-col gap-3'>
                  {
                    FooterLinks.map((link)=>(
                      <li key={link.title} className='cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200 lg:font-bold'>
                        <span>{link.title}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
             <div>
              <div className='py-8 px-4'>
                <h1 className='sm:text-xl lg:text-2xl font-bold sm:text-left text-justify mb-3'>Links
                </h1>
                <ul className='flex flex-col gap-3'>
                  {
                    FooterLinks.map((link)=>(
                      <li key={link.title} className='cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200 lg:font-bold'>
                        <span>{link.title}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='flex items-center gap-3 mt-6'>
                <a href="/#">
                  <FaInstagram className='text-3xl lg:text-4xl'/>
                </a>
                <a href="/#">
                  <FaLinkedin className='text-3xl lg:text-4xl'/>
                </a>
                <a href="/#">
                  <FaFacebook className='text-3xl lg:text-4xl'/>
                </a>
              </div>
              <div className='mt-6 lg:text-xl'>
                <div className='flex items-center gap-3'>
                  <FaLocationArrow/>
                  <p>Lekki, Lagos Nigeria</p>
                </div>
                <div className='flex items-center gap-3'>
                  <FaMobileAlt/>
                  <p>+234 703 2603814</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
