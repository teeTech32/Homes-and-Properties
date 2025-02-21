import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider  from 'react-slick'

const TestimonialData  = [
 
  {
    id: 1,
    name: "Victoria B.",
    text: "Working with this team was a dream! They listened to my needs, found the perfect home, and made the process seamless. Their professionalism and dedication truly set them apart. Highly recommend!",
    img: "https://picsum.photos/101/101"
  },
  {
    id: 2,
    name: "Chibuzor E.",
    text: "I couldn't be happier with my experience. The agent was knowledgeable, patient, and always available to answer my questions. They turned a stressful process into a smooth and enjoyable journey. Thank you!",
    img: "https://picsum.photos/102/102"
  },
  {
    id: 3,
    name: "Mariam L.",
    text: "From start to finish, the service was exceptional. They went above and beyond to ensure I found the right property. Their attention to detail and commitment to client satisfaction is unmatched. Five stars!",
    img: "https://picsum.photos/103/103"
  },
  {
    id: 4,
    name: "James Brown",
    text: "The team made selling my home effortless. They provided expert advice, marketed my property effectively, and negotiated a great deal. I felt supported every step of the way. Outstanding service!",
    img: "https://picsum.photos/104/104"
  },
   {
    id: 5,
    name: "Olamide Williams",
    text: "Buying my first home was a breeze thanks to this amazing team. They guided me through every detail, explained everything clearly, and made me feel confident in my decision. I'm so grateful!",
    img: "https://picsum.photos/105/105"
  },

]

const Tesmonials = () => {
   var settings = {
      dots:true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToScrolls: 1,
      autoplay: true,
      autoplaySpeed:2000,
      cssEase:'linear',
      pauseOnHover: true,
      pauseFocus: true,
      responsive:[
        {
          breakpoint: 10000,
          settings:{
            slidesToShow:3,
            slidesToScroll:1,
            infinite: true,
          },
        },
        {
          breakpoint:1024,
          settings:{
            slidesToShow:2,
            slidesToScroll:1,
            initialSlide:2,
          },
        },
        {
          breakpoint: 640,
            settings:{
            slidesToShow:1,
            slidesToScroll:1,
          }
        }
      ]
    }
  return (
    <div className="">
      <div class=" pt-20 ">
        <div data-aos='fade-up'
            data-aos-offset='300'
            data-aos-delay='100'
            data-aos-duration='1000'
            data-aos-easing='ease-in-sine' class="text-center mb-10 max-w-[600px] mx-auto space-y-3 ">
            <p class="font-semibold text-white text-xl lg:font-bold lg:text-3xl">Our Customers' Feedbacks</p>
            <h1 class="text-xl font-bold lg:text-2xl">Testimonials</h1>
            <p class="font-semibold lg:text-xl text-black ">
              Curious about what our customers have to say? Their feedback speaks volumes! We take pride in delivering great experiences. Check out their reviews below!
            </p>
          </div>
          <div>
            <Slider {...settings}>
              {
                TestimonialData.map((data)=>(
                  <div data-aos='flip-left'
            data-aos-offset='200'
            data-aos-delay='200'
            data-aos-duration='2000'
            data-aos-easing='ease-out-cubic' key={data.id} class="my-6 lg:my-8">
                     <div  class="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-gray-300 dark:bg-gray-700 relative">
                    <div>
                      <img src={data.img} alt="NetError" class="rounded-full w-14 h-14 lg:w-20 lg:h-20"/>
                    </div>
                    <div class="flex flex-col items-center  pt-2 lg:pt-4">
                      <div class="space-y-1 lg:space-y-2 ">
                        <p class="text-xs lg:text-lg text-black dark:text-white">{data.text}</p>
                        <h1 class="text-lg font-bold lg:text-2xl text-green-500">{data.name}
                        </h1>
                      </div>
                    </div>
                    <p class="dark:text-white text-9xl font-serif absolute top-0 right-0">
                    ``
                    </p>
                  </div>
                </div>
                  
                ))
              }
            </Slider>
          </div>
      </div>
    </div>
  )
}

export default Tesmonials
