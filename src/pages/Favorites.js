import React, {useContext} from 'react';
import Card from '../components/Card';
import AppContext from '../context';

const Favorites = () => {

  const { favorites, onAddToFavorites } = useContext(AppContext);

  

  return (
    <div className=" p-10 " >

        <div className="flex justify-between items-center mb-6 " >

          <h1 className=" text-3xl font-bold  " >
            Мої закладки
          </h1>

        </div>

        <div className="flex  flex-wrap " >
          
          {
            
            favorites.map(item => (
              <Card 
                key={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
                isLiked={true}
                onFavorite={onAddToFavorites}
                {...item}
                
              />
            ))

          }

        </div> {/* items */}
        
    </div>
  )
}

export default Favorites