import React, { useState } from "react";
import { ReactDOM } from "react";
import {MdShoppingBasket, MdAdd,MdLogout} from 'react-icons/md';
import {RiShoppingBasketFill} from 'react-icons/ri'
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebase.config";

import {useStateValue} from '../context/StateProvider';

import Logo from '../img/logo4.png';
import Avatar from '../img/avatar.png';
import { actionType } from "../context/reducer";

const Header = ()=>{
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const [{user, cartShow, cartItems},dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false)

    const login = async()=>{
        if(!user){
            const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
        dispatch({
            type : actionType.SET_USER,
            user : providerData[0],
        })

        localStorage.setItem('user',JSON.stringify(providerData[0]));
        }else{
            setIsMenu(!isMenu);
        }
    }

    const logout = ()=>{
        setIsMenu(false);
        localStorage.clear();

        dispatch({
            type:actionType.SET_USER,
            user: null
        });
    }
    const showCart = ()=>{
        dispatch({
            type:actionType.SET_CART_SHOW,
            cartShow:!cartShow,
        })
    }
    return(
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
            {/* Desktop and tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-16 object-cover" alt="Logo" />
                    {/* <p className="text-headingColor text-xl font-bond">City</p> */}
                </Link>
                <div className="flex items-center gap-8">
                   <motion.ul 
                initial={{opacity:0, x:200}}
                animate={{opacity:1, x:0}}
                exit={{opacity:0, x:200}}
                className="flex items-center gap-24">
                    <Link to={"/"}><li className="text-base text-textColor hover:text-headingColor duration-100
                    transition-all ease-in-out cursor-pointer">Home</li></Link>
                    {/* <li className="text-base text-textColor hover:text-headingColor duration-100
                    transition-all ease-in-out cursor-pointer">Menu</li> */}
                    <li className="text-base text-textColor hover:text-headingColor duration-100
                    transition-all ease-in-out cursor-pointer">About</li>
                    <li className="text-base text-textColor hover:text-headingColor duration-100
                    transition-all ease-in-out cursor-pointer">Service</li>
                </motion.ul> 
                
                <div className="relative flex items-center justify-center" 
                     onClick={showCart}>
                    <RiShoppingBasketFill className="text-textColor text-2xl ml-8 cursor-pointer"/>
                    {cartItems && cartItems.length > 0 &&(
                     <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex item-center justify-center">
                        <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                    </div>)}
                </div>

                <div className="relative">
                <motion.img 
                whileTap={{scale:0.6}}
                src={user ? user.photoURL :Avatar} 
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full" 
                alt="userprofile" 
                onClick={login}
                />
                { 
                    isMenu &&(
                        <motion.div 
                        initial={{opacity:0, scale:0.6}}
                        animate={{opacity:1, scale:1}}
                        exit={{opacity:0, scale:0.6}}
                        className="flex flex-col w-40 bg-gray-50 shadow-xl rounder-lg absolute top-12 right-0">
                    {
                        user && user.email === "tsegagedefaw90@gmail.com" && (
                            <Link to={'/createItem'}>
                                <p className="px-4 py-2 flex item-center gay-3 cursor-pointer hover:bg-slate-100
                                        transition-1ll duration-100 ease-in-out text-textColor text-base"
                                        onClick={()=>setIsMenu(false)}>
                                            New Item <MdAdd/></p>
                            </Link>
                        )
                    }
                    <p className="px-4 py-2 flex item-center gay-3 cursor-pointer hover:bg-slate-100
                    transition-1ll duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}
                    >
                        Logout <MdLogout/></p>
                </motion.div>
                    )}
                </div>
            </div>
        </div>
            {/* Mobile */}
            <div className="flex item-center justify-between block md:hidden h-full w-full ">
            

                <div className="relative flex items-center justify-center" onClick={showCart}>
                    <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer"/>
                    {cartItems && cartItems.length > 0 &&(
                     <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex item-center justify-center">
                        <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                    </div>)}
                </div>

                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} className="w-16 object-cover" alt="Logo" />
                    {/* <p className="text-headingColor text-xl font-bond">City</p> */}
                </Link>

                <div className="relative">
                <motion.img 
                whileTap={{scale:0.6}}
                src={user ? user.photoURL :Avatar} 
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full" 
                alt="userprofile" 
                onClick={login}
                />
                { 
                    isMenu &&(
                        <motion.div 
                        initial={{opacity:0, scale:0.6}}
                        animate={{opacity:1, scale:1}}
                        exit={{opacity:0, scale:0.6}}
                        className="flex flex-col w-40 bg-gray-50 shadow-xl rounder-lg absolute top-12 right-0">
                    {
                        user && user.email === "tsegagedefaw90@gmail.com" && (
                            <Link to={'/createItem'}>
                                <p className="px-4 py-2 flex item-center gay-3 cursor-pointer hover:bg-slate-100
                                        transition-1ll duration-100 ease-in-out text-textColor text-base">New Item <MdAdd/></p>
                            </Link>
                        )
                    }

                <ui className="flex flex-col list-none gap-2">
                    <li className="text-base text-textColor hover:text-headingColor duration-100 hover:bg-slate-100 px-4
                    transition-all ease-in-out cursor-pointer">Home</li>
                    <li className="text-base text-textColor hover:text-headingColor duration-100 hover:bg-slate-100 px-4
                    transition-all ease-in-out cursor-pointer">Menu</li>
                    <li className="text-base text-textColor hover:text-headingColor duration-100 hover:bg-slate-100 px-4
                    transition-all ease-in-out cursor-pointer">About</li>
                    <li className="text-base text-textColor hover:text-headingColor duration-100 hover:bg-slate-100 px-4
                    transition-all ease-in-out cursor-pointer">Service</li>
                </ui>
                    <p className="m-2 p-2 rounded-md shadow-md flex item-center justify-center bg-gray-200 gay-3 cursor-pointer hover:bg-slate-300
                    transition-1ll duration-100 ease-in-out text-textColor text-base"
                    onClick={logout}
                    >
                        Logout <MdLogout/>
                    
                    </p>
                </motion.div>
                    )
                
                }
                </div>
            </div>
        </header>
    )
}

export default Header;