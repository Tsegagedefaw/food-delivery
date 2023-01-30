import React from 'react';

import HomeContainer from './HomeContainer';
import {motion} from "framer-motion";
import { MdChevronLeft,MdChevronRight } from 'react-icons/md';
import { RowContainer } from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { MenuContainer } from './MenuContainer';
import { CartContainer } from './CartContainer';

export const MainContainer = () => {

  const [{foodItems, cartShow},dispach] = useStateValue()
  const [scrollvalue,setScrollValue] = useState(0)

  useEffect(()=>{},[scrollvalue,cartShow])

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <HomeContainer/>
      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-2xl font-semibold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:bottom-0
          before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100'>
            Our fresh & healthy fruits
          </p>

          <div className='hidden md:flex gap-3 items-center'>
            <motion.div whileTap={{ scale: 0.75}} className='w-8 h-8 rounded-lg bg-green-300 hover:bg-green-500 cursor-pointer
            hover:shadow-lg flex items-center
            justify-center'><MdChevronLeft className='text-lg text-white'
            onClick={()=>setScrollValue(-200)}/></motion.div>
            <motion.div whileTap={{ scale: 0.75}} className='w-8 h-8 rounded-lg bg-green-300 hover:bg-green-500 cursor-pointer
            hover:shadow-lg flex items-center
            justify-center'><MdChevronRight className='text-lg text-white'
            onClick={()=>setScrollValue(200)}/></motion.div>

          </div>
        </div>
      </section>
      <RowContainer scrollvalue={scrollvalue} flag={true} data={foodItems?.filter(n=>n.category === "fruits")}/>
      <MenuContainer/>
      { 
        cartShow &&
          <CartContainer/>
      }
    </div>
  )
}


