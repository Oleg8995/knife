import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

// const data = [
//  // {
//   "id": 1,
//   "imageUrl": "/img/card/black_vf_1.png",
//   "title": "BLACK VF-1 D/A OTF (MULTIPLE BLADE STYLES AVAILABLE)",
//   "price": 5865
//  },
//  {
//   "id": 2,
//   "imageUrl": "/img/card/grey_vf_1.png",
//   "title": "GREY VF-1 D/A OTF (MULTIPLE BLADE STYLES AVAILABLE)",
//   "price": 5865
//  },
//  {
//   "id": 3,
//   "imageUrl": "/img/card/blue_phantom_01.png",
//   "title": "BLUE PHANTOM D/A OTF",
//   "price": 5950
//  },
//  {
//   "id": 4,
//   "imageUrl": "/img/card/black_reaped_01.png",
//   "title": "PRE ORDER* BLACK REAPER D/A OTF",
//   "price": 6175
//  },
//  {
//   "id": 5,
//   "imageUrl": "/img/card/phantom_available_01.png",
//   "title": "BLACK PHANTOM D/A OTF (MULTIPLE BLADE STYLES AVAILABLE)",
//   "price": 5975
//  },
//  {
//   "id": 6,
//   "imageUrl": "/img/ghost_damascus_01.png",
//   "title": "BLACK GHOST D/A OTF - DAMASCUS STEEL",
//   "price": 7980
//  },
//  {
//   "id": 7,
//   "imageUrl": "/img/card/mini_x_lite_154sm_01.png",
//   "title": "MINI X LITE - 154CM BLADE STEEL",
//   "price": 5850
//  },
//  {
//   "id": 8,
//   "imageUrl": "/img/card/mini_green_phantom_01.png",
//   "title": "MINI GREEN PHANTOM D/A OTF (MULTIPLE BLADE STYLES AVAILABLE)",
//   "price": 4980
//  },
//  {
//   "id": 9,
//   "imageUrl": "/img/card/hendrix_gear_01.png",
//   "title": "HENDRIX GEAR | TITAN D/A OTF",
//   "price": 8010
//  },
//  {
//   "id": 10,
//   "imageUrl": "/img/card/silver_phantom_01.png",
//   "title": "MINI SILVER PHANTOM D/A OTF (MULTIPLE BLADE STYLES AVAILABLE)",
//   "price": 5870
//  },
//  {
//   "id": 11,
//   "imageUrl": "/img/card/black_mamba_01.png",
//   "title": "PRE ORDER* BLACK D2 CLIP POINT MAMBA HENDRIX OTF",
//   "price": 5910
//  },
//  {
//   "id": 12,
//   "imageUrl": "/img/card/carbon_fiber_ghost_01.png",
//   "title": "CARBON FIBER GHOST D/A OTF (MULTIPLE BLADE STYLES AVAILABLE)",
//   "price": 4870
//  }
// ]



function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch('https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/sneakersDB')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });
    async function fetchData() {
      try {
        const cartResponse = await axios.get('https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/cart');
        
        const favoriteResponse = await axios.get('https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/favorites');

        const itemsResponse = await axios.get('https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/sneakersDB');

        setIsLoading(false);
        
        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
      }
      
    }

    fetchData();

  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id) );
      if ( findItem ) {
        await axios.delete(`https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/cart/${findItem.id}`);
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id) ));
      } else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post('https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/cart', obj);
        setCartItems(prev => prev.map(item => {
          if ( item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
        
    } catch (error) {
      alert('Неможливо додати до кошика');
    }
    
  };

  const onAddToFavorites = async (obj) => {

    try {
      if (favorites.find(favobj => Number(favobj.id) === Number(obj.id))) {
        axios.delete(`https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id) ));

      } else {
        const { data } = await axios.post('https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не вдалося додати до фаворитів');
    }
   
  };

  const onChangeSearchInput = (event) => {
    setSearchValue( event.target.value );
  };
  
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62ee9e22c1ef25f3da8c3dbe.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Помилка видалення з кошика');
    }
    
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  };

  return (

    <AppContext.Provider value={{ 
      items, 
      cartItems, 
      favorites,
       isItemAdded, 
       onAddToFavorites, 
       setCartOpened, 
       setCartItems,
       onAddToCart }} >
    
      <div className="wrapper">
        
           <Drawer
              opened={cartOpened}
              key={1}
              onRemove={onRemoveItem} 
              items={cartItems} 
              onCloseCart={() => setCartOpened(false)} 
            /> 

          <Header onOpenCart={() => setCartOpened(true)} />

        <Routes>

          <Route path="/" exact element={

            <Home
              cartItems={cartItems}
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              setSearchValue={setSearchValue}
              items={items}
              onAddToFavorites={onAddToFavorites}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
          />

          <Route path="/favorites" element={
            <Favorites/>
          } 
          />

          <Route path="/orders" element={
            <Orders/>
          } 
          />

        </Routes>
      </div>

    </AppContext.Provider>  
  );
}

export default App;
