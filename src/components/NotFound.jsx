import React from 'react'
import Notfound from '../img/404.svg'
export const NotFound = () => {
  return (

    <div className='w-full flex flex-col items-center justify-center mt-10'>
    <h1 className='text-4xl text-headingColor font-semibold my-2'>Oops... </h1>
    <img src={Notfound} alt=""
     className="h-340"/>
  </div>
  )
}
