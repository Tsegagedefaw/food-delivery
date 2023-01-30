import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import {RiRefreshFill} from 'react-icons/ri'
import EmptyCart from '../img/emptyCart.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebase.config";
import  CartItem  from './CartItem'
import { useEffect } from 'react'

export const CartContainer = () => {

    const [{cartShow, cartItems, user},dispach] = useStateValue()
    const [isMenu, setIsMenu] = useState(false)
    const [total, setTotal] = useState(0);
    const [flag, setFlag] = useState(1);

    const closeCartShow = ()=>{
        dispach({
            type:actionType.SET_CART_SHOW,
            cartShow:!cartShow
        })
    }

    useEffect(()=>{
        let totalPrice = cartItems.reduce(function(accumulator,item){
            return accumulator + item.qty * item.price;
        },0);
        setTotal(totalPrice)
    },[total, flag])

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();
     
    const login = async()=>{
        if(!user){
            const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
        dispach({
            type : actionType.SET_USER,
            user : providerData[0],
        })

        localStorage.setItem('user',JSON.stringify(providerData[0]));
        }else{
            setIsMenu(!isMenu);
        }
    }
    const clearCart = ()=>{
        dispach({
            type:actionType.SET_CART_ITEM,
            cartItems:[],
        });
        localStorage.setItem("cartItems",JSON.stringify([]));
    }
  return (
    <motion.div 
        initial={{opacity:0, x:200}}
        animate={{opacity:1, x:0}}
        exit={{opacity:0, x:200}} className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md
        flex flex-col z-[101]'>
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div whileTap={{scale:0.75}} onClick={closeCartShow}>
                <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
            </motion.div>
            <p className='text-textColor text-lg font-semibold'>Cart</p>
            <motion.p whileTap={{scale:0.75}}
            onClick={clearCart}
            className='flex items-center gap-2 p-1 px-2
            my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base'>
                Clear <RiRefreshFill/>
            </motion.p>
        </div>
            {/* bottom Section */}
        {cartItems && cartItems.length > 0 ?
        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
        {/* cart section */}
        <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll 
        scrollbar-none' >
            {/* cart item */}
            {cartItems && cartItems.map((item)=>(
                <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag}/>
            ))}
        </div>
        {/* Total Items*/}
        <div className='w-full flex-1  bg-cartTotal rounded-t-[2rem] flex gap-2 flex-col items-center
        justify-evenly px-8 py-2'>
            <div className='w-full flex items-center justify-between'>
                <p className="text-gray-400 text-lg">Sub Total</p>
                <p className="text-gray-400 text-lg">${total}</p>
            </div>
            <div className='w-full flex items-center justify-between'>
                <p className="text-gray-400 text-lg">Delivery</p>
                <p className="text-gray-400 text-lg">$2.25</p>
            </div>
            
            <div className='w-full border-b border-gray-600 my-2'></div>

            <div className='w-full flex items-center justify-between'>
                <p className='text-gray-200 text-xl font-semibold'>Total</p>
                <p className='text-gray-200 text-xl font-semibold'>${total + 2.25}</p>
            </div>
            {user ? (
                <motion.button whileTap={{scale:0.8}} 
                    type="button"
                    className='w-full p-2 rounded-full bg-gradient-to-tr
                    from-green-400 to-green-600 text-gray-50 text-lg 
                    my-2 hover:shadow-lg'>
                    Check out
                </motion.button>
            ):
            (<motion.button whileTap={{scale:0.8}} 
                            type="button"
                            className='w-full p-2 rounded-full bg-gradient-to-tr
                            from-green-400 to-green-600 text-gray-50 text-lg 
                            my-2 hover:shadow-lg' onClick={login}>
                            Login to check out
            </motion.button>)}
        </div>
    </div>
    :
    (
    <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
        <img src={EmptyCart} alt="" className='w-300'/>
        <p className='text-xl text-textColor font-semibold'>
            Add some items to your cart
        </p>
    </div>)}
    </motion.div>
  )
}
