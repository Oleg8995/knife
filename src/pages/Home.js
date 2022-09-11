import React from 'react';
import Card from '../components/Card';

const Home = ({ cartItems,
                searchValue,
                onChangeSearchInput,
                setSearchValue,
                items,
                onAddToFavorites,
                onAddToCart,
                isLoading }) => {


  // const renderItems = () => {

  //   const filterItems = items.filter((item) => 
  //     item.title.toLowerCase().includes(searchValue.toLowerCase()),
  //   );

  //   return (isLoading ? [...Array(8)] : filterItems).map((item) => (
  //     <Card
  //       key={item.id}
  //       title={item.title}
  //       imageUrl={item.imageUrl}
  //       price={item.price}
  //       onFavorite={(obj) => onAddToFavorites(obj)}
  //       onPlus={(obj) => onAddToCart(obj)}
  //       addedToCart={isItemAdded( item && item.id}
  //       loading={isLoading}
  //       {...item}
  //     />
  //   ));
  // };

  return (
    <div className=" p-10 " >

        <div className="flex justify-between items-center mb-6 " >

          <h1 className=" text-3xl font-bold  " >
            { searchValue ? `Поиск по: "${searchValue}" ` : 'Всі ножі'  }
          </h1>

          <div className="flex border-2 border-zinc-300 rounded-2xl p-2 " >

            <img className=" mr-2" src="/img/card/search.svg" alt="search" />

            <input
              onChange={onChangeSearchInput}
              value={searchValue} 
              onKeyPress={(e) => e.key === 'Enter' && setSearchValue('') }
              className=" border-none outline-transparent " 
              placeholder="Пошук..." />
            
          </div>

        </div>

        <div className="flex justify-around flex-wrap " >
          
          {
            
            items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map(item => (
              <Card
                key={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                onFavorite={(obj) => onAddToFavorites(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                // addedToCart={isItemAdded(item.id)}
                loading={false}
                {...item}
              />
            ))

          }

        </div> {/* items */}
        
    </div>
  )
}

export default Home