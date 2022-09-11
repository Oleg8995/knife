import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Header = (props) => {

  const {totalPrice} = useCart();

  return (
    <header className=" flex justify-between items-center p-10 " >
        <Link to="/" >
          <div className=" flex items-center " >
          
            <img className=" mr-4 " width={60} height={60} src="/img/header/logo.png" alt="logo" />
            <div className="headerInfo" >
              <h3 className=" uppercase text-xl font-bold " >Knife</h3>
              <p className=" text-sm text-zinc-500 " >магазин ножів</p>
            </div>
          </div>
        </Link>
        
        <ul className=" flex " >
            <li onClick={props.onOpenCart} className=" flex items-center mr-8 cursor-pointer "  >
              <img className=" mr-4 "  width={18} height={18} src="/img/header/cart.svg" alt="cart" />
              <span>{totalPrice} грн</span>
            </li>
            <li>
              <Link to="/favorites" >
                <img className=' cursor-pointer mr-7' width={18} height={18} src="/img/header/heart.png" alt="heart" />
              </Link>
            </li>
            <li>
              <Link to='/orders' >
                <img width={18} height={18} src="/img/header/user.svg" alt="user" />
              </Link>
            </li>
        </ul>

    </header>
  )
}

export default Header