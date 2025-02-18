import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
         Manager Your Expanse
          <strong className="font-extrabold text-primary sm:block"> Control Your Money</strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
          numquam ea!
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded-sm bg-primary px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-3 focus:outline-hidden sm:w-auto"
            href="/dashboard"
          >
            Get Started
          </a>
  
         
        </div>
      </div>
    </div>
    <Image src={'/Dashboardi.png'} alt='dashboard' width={1000} height={700} className=' -mt-9 rounded-xl border-2'/>
  </section>
  )
}

export default Hero