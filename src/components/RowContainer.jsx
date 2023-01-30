import React, { createRef } from 'react'
import logo from '../img/logo.png'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useEffect } from 'react'
import { ref } from 'firebase/database'
import NotFound from '../img/NotFound.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { useState } from 'react'

export const RowContainer = ({flag,data,scrollvalue }) => {

  const rowContainer = useRef();
  const [{cartItems},dispach] = useStateValue();
  const [items, setItems] = useState([])

  const addtocart = ()=>{
     dispach({
      type: actionType.SET_CART_ITEM,
      cartItems :items
     })
     localStorage.setItem('cartItems',JSON.stringify(cartItems));
  }

  useEffect(()=>{
      rowContainer.current.scrollLeft += scrollvalue;
  },[scrollvalue])

  useEffect(()=>{
    addtocart()
  },[items])
  return (
    
    <div ref={rowContainer} className={`w-full flex items-center gap-3 my-12 scroll-smooth scrollbar-none ${
      flag ? "overflow-x-scroll" :"overflow-x-hidden flex-wrap justify-center"
    }`}
    >
      { 
        data && data.length > 0 ? data.map(item=>(
          <div key={item?.id} className='w-300 h-[225px] md:w-340 min-w-[300px]  md-min-w[340px] my-12 bg-cardOverlay
      rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between'>
        <div className='w-full flex items-center justify-between'>
          <motion.div whileHover={{ scale:1.2 }} className="w-40 h-40 -mt-8 drop-shadow-2xl">
          <img 
            src={item?.imageURL}
            alt=""
            className='w-full h-full object-contain'
          />
          </motion.div>
          <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-full bg-red-600 flex items-center
          justify-center cursor-pointer hover:shadow-md'
          onClick={()=>setItems([...cartItems, item])}>
            <MdShoppingBasket className='text-white'/>
          </motion.div>
        </div>
        <div className='w-full flex flex-col gap4 items-end justify-end'>
          <p className='text-textColor font-semibold text-base
          md-text-lg'>{item?.title}</p>
          <p className='mt-1 text-sm text-gray-500'>
            {item?.calories} Calories</p>
            <div className='flex items-center gap-8'>
              <p className='text-lg text-textColor font-semibold'>
                <span className='text-sm text-red-500'>$</span>
                {item?.price}</p>
            </div>
        </div>
      </div>
        )) : (
          <div className='w-full flex flex-col items-center justify-center'>
            <img src={NotFound} alt=""
             className="h-340"/>
             <p className='text-xl text-headingColor font-semibold my-2'>Items Not Available</p>
          </div>
        )
      }
    </div>
  )
}
