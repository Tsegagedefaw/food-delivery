import React from 'react'
import {IoFastFood} from 'react-icons/io5'
import { categories } from '../utils/data'
import { useState } from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RowContainer } from './RowContainer'
import { useStateValue } from '../context/StateProvider'
export const MenuContainer = () => {

    const [filter,setFilter] = useState("chicken");
    const [{foodItems},dispach] = useStateValue();

  return (
    <section className='w-full my-6'>
        <div className='w-full flex flex-col items-center justify-center'>
          <p className='text-2xl font-semibold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:bottom-0
          before:left-0 mr-auto before:bg-gradient-to-tr from-green-400 to-green-600 transition-all ease-in-out duration-100'>
            Our Hot Dishes
          </p>
          <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6
          overflow-x-scroll scrollbar-none'>
                {
                    categories && categories.map((category)=>(
                        <motion.div whileTap={{scale:0.75}} key={category.id} className={`group ${
                          filter === category.urlParamName ? "bg-cartNumBg":"bg-white" }
                         w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 
                         items-center justify-center hover:bg-red-600`}
                         onClick={()=>setFilter(category.urlParamName)}>
                    <div className={`w-10 h-10 rounded-full shadow-lg ${
                          filter === category.urlParamName ? "bg-white":"bg-cartNumBg" } group-hover:bg-white
                    flex items-center justify-center`}>
                        <IoFastFood className={`${
                          filter === category.urlParamName ? "text-textColor":"text-white" } group-hover:text-textColor flex justify-center text-lg`}/>
                    </div>
                    <p className={`text-sm ${
                          filter === category.urlParamName ? "text-white":"text-textColor" } group-hover:text-white`}>
                        {category.name}
                    </p>
                </motion.div>
                    ))
                }
          </div>

          <div className='w-full'>
                <RowContainer flag={true} data={foodItems?.filter(n=>n.category === filter)}/>
          </div>
        </div>
    </section>
  )
}
