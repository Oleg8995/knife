import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import AppContext from '../context';

const Orders = () => {

    const {onAddToFavorites, onAddToCart } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

      try {
          async function fetchData() {
            const { data } = await axios.get('https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
        }

        fetchData();
        
      } catch (error) {
        alert('Ошибка при запросе заказа');
      }

        
        
    }, []);

  return (

    <div className=" p-10 " >

        <div className="flex justify-between items-center mb-6 " >

          <h1 className=" text-3xl font-bold  " >
              Мої замовлення
          </h1>

        </div>

        <div className="flex justify-around flex-wrap " >
          
          {
            // (isLoading ? [...Array(8)] : orders).map((item) => (
            orders.map(item => (
              <Card 
                key={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                loading={isLoading}
                {...item}
              />
            ))

          }

        </div> {/* items */}
        
    </div>
  )
}

export default Orders