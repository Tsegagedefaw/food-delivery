import React from 'react';

import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg1.PNG';
import {heroData}  from '../utils/data.js';

const HomeContainer = () => {
    return ( 
      <section className='grid grid-cols-1 md:grid-cols-2 w-full gap-2'
        id="home"
      >
      <div className='py-2  flex-1 flex flex-col items-start justify-center  gap-6'>
        <div className='flex items-center gap-2 justify-center bg-green-100 
         px-4 py-1 rounded-full'>
        <p className='text-base text-green-500 font-semibold '>
          Bike Delivery </p>
        <div className="w-8 h-8 rounded-full bg-white overflow-hidden drop-shadow-xl">
            <img src={Delivery} className="w-full h-full object-contain" alt="Delivery" />
          </div>
        </div>

      <p className='text-[2.5rem] lg:text-[3rem] font-bold tracking-wide text-headingColor'>
        Fresh Food for Health <span className='text-green-600 text-[3rem] lg:text-[4rem]'>Fast Delivery</span></p>
      <p className='text-base text-decoration text-center md:text-left md:w-[80%]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
          pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
          Donec scelerisque sollicitudin enim eu venenatis.
      </p>
      <button className=' md:w-auto bg-gradient-to-br from-green-400 to-green-500 w-full
      px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Order Now</button>
      </div>
      <div className='py-2 flex-1 flex items-center relative'>
        <img src={HeroBg} className="ml-auto h-420 w-full lg:w-80 lg:h-650"
         alt="Hero-bg" />
         <div  className='w-full h-full absolute top-10 left-0 flex items-center 
        justify-center lg:px-32 py-4 gap-y-20 gap-x-4 flex-col flex-wrap'>
        {
          heroData && heroData.map(hero => (
           
          <div key={hero.id} className='lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex 
          flex-col items-center justify-center'>
            <img src={hero.img} className='w-20 lg:w-40 lg:h-44 -mt-20 lg:-mt-20' alt="I1"/>
            <p className='text-base font-semibold text-textColor mt-2 lg:mt-4'>{hero.name}</p>

            <p className='text:[12px] lg:text-sm text-gray-500 font-semibold my:1 lg:my-3'>{hero.desc}</p>
          
            <p className='text-sm font-semibold text-headingColor'>
              <span className='text-xs text-red-600'>$</span> {hero.price}
            </p>
          </div>
          
          ))}
        </div>
      </div> 
    </section>
    )
}

export default HomeContainer