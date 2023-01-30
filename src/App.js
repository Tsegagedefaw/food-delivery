import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AnimatePresence} from "framer-motion"
import {CreateContainer,MainContainer,Header} from './components'
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunction';
import { useEffect } from 'react';
import { actionType } from './context/reducer';
import {NotFound} from './components/NotFound'
function App() {
  const [{foodItems}, dispach] = useStateValue();

  const fetchData = async ()=>{
    await getAllFoodItems().then((data)=>{
      dispach({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data
      })
    });
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <AnimatePresence exitBeforeEnter>
    <div className='w-screen h-auto flex flex-col bg-primary'>
      <Header/>

      <main className='mt-16 md:mt-20 md:mt-20 px-4 md:px-16 py-4 w-full'>
        <Routes>
          <Route path="/" element={<MainContainer/>} />
          <Route path="/createItem" element={<CreateContainer/>} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </main>
    </div>
    </AnimatePresence>
  );
}

export default App;
