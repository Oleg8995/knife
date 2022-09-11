import React, { useContext } from 'react';
import AppContext from '../context';

const Info = ({ image, title, description }) => {

    const {setCartOpened} = useContext(AppContext);

  return (
    <div className='emty flex justify-center flex-col ' >
        <img className=' mr-auto ml-auto mb-5' width={120} height={120} src={image} alt='emty' />

        <h2 className=' mb-2 text-center text-2xl font-semibold' >
            {title}
        </h2>

        <p className=' mb-10 text-center text-base opacity-50 ' >
            {description}
        </p>

        <button onClick={() => setCartOpened(false)} className=" greenBtn__img flex relative items-center justify-center w-9/12 mr-auto ml-auto bg-lime-500 rounded-2xl h-14 mt-6 font-semibold text-white text-base ease-in duration-200 hover:bg-lime-400 " >
            <img className=" absolute left-7 " src="/img/cart/arrow.svg" alt="arrow" /> Повернутися назад
        </button>

    </div> 
  )
}

export default Info