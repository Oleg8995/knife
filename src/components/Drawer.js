import React, { useContext, useState } from 'react';
import axios from 'axios';
import Info from './Info';
import useCart from '../hooks/useCart';

const Drawer = ({ onCloseCart, onRemove, items = [], opened}) => {

    const {cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const onClickOrder = async () => {

        try {
            setIsLoading(true);
            const [data] = await axios.post('https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/orders', { items: cartItems });

            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for(let i = 0; i < Array.length; i++ ) {
                const item = cartItems;
                await axios.delete('/cart/' + item.id);
            }

        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }

        setIsLoading(false);
      
    };

  return (

    // overlay absolute w-full h-full 

    <div className={`${'overlay absolute w-full h-full'} ${opened ? 'overlayVisible' : '' }` } >
        
        <div className=" drawer overflow-auto absolute p-8 flex flex-col " >

            <h2 className=" flex justify-between font-bold text-2xl mb-8 " >
                Кошик
                <img
                    onClick={onCloseCart}  
                    className=" cursor-pointer opacity-50 ease-in duration-200 hover:opacity-100 hover:shadow-2xl " width={32} height={32} src="/img/cart/btn_remove.svg" alt="remove"/>
            </h2>

            {
                items.length > 0 ? (

                    <>
                        <div className="items flex-1 " >

                            {
                                items.map((item) => {
                                return ( 
            
                                    <div key={item.id} className=" flex items-center border-2 border-zinc-100 rounded-3xl p-5 mb-5 " >
            
                                        <img className=" mr-4" width={70} height={70} src={item.imageUrl} alt="sbeakers" />
            
                                        <div className=" mr-5" >
                                        <p className=" mb-2 text-sm " >
                                            {item.title}
                                        </p>
                                        <b>{item.price} грн</b>
                                        </div>
            
                                        <button 
                                            onClick={() => onRemove(item.id)} 
                                        >
                                            <img className=" opacity-50 ease-in duration-200 hover:opacity-100 hover:shadow-2xl " width={50} height={50} src="/img/cart/btn_remove.svg" alt="remove"/>
                                        </button>
            
                                    </div>
            
                                )
                                })
                            }
            
                
                        </div> 

                        <div>

                            <ul>

                                <li className="flex items-end mb-5">
                                <span>Всього:</span>
                                <div className=" relative -top-1 flex-1 h-px border-b-2 border-dashed mr-2 ml-2 " ></div>
                                <b>{totalPrice} грн</b>
                                </li>

                                <li className="flex items-end">
                                <span>Допомога ЗСУ 5%:</span>
                                <div className=" relative -top-1 flex-1 h-px border-b-2 border-dashed mr-2 ml-2  " ></div>
                                <b>{totalPrice / 100 * 5} грн</b>
                                </li>

                            </ul>

                            <button
                                disabled={isLoading}
                                onClick={onClickOrder} 
                                className=" greenBtn flex relative items-center justify-center w-full bg-lime-500 rounded-2xl h-14 mt-6 font-semibold text-white text-base ease-in duration-200 hover:bg-lime-400 " >Оформити замовлення
                                <img className=" absolute right-7" src="/img/cart/arrow.svg" alt="arrow" />
                            </button>

                        </div>

                    </>

                ) : (

                    <Info 
                        title={ isOrderComplete ? 'Замовлення оформлено' : 'Кошик порожній' }
                        description={ isOrderComplete ? `Ваше замовлення #${orderId} незабаром буде передано кур'єрській доставці` : 'додайте хоч один товар щоб зробити замовлення.' } 
                        image={ isOrderComplete ? '/img/cart/order_is_completed.png'  : '/img/cart/empty.png'} 
                    />
                )
            }

        </div>

    </div>

  )
}

export default Drawer

