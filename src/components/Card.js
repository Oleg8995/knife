import React, { useContext, useState } from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../context';


const Card = ({ id, title, imageUrl, price, onPlus, onFavorite, isLiked = false,  loading = false }) => {

    const { isItemAdded } = useContext(AppContext);
    // const [isAdded, setAdded] = useState(addedToCart);
    const [isFavorite, setFavorite] = useState(isLiked);

    const onClickPlus = () => {
        
        // setAdded(!isAdded);
        onPlus({ id, title, price, imageUrl, parentId: id});
        
    };

    const onClickFavorite = () => {
        onFavorite({ id, title, price, imageUrl, parentId: id});
        setFavorite(!isFavorite);
    };

  return (
    <div className=" w-52 p-5 border-2 border-zinc-100 rounded-3xl mr-2 ml-2 ease-in duration-200 hover:shadow-2xl mt-6 " >

        {
            loading ? 
            <ContentLoader 
                speed={2}
                width={155}
                height={265}
                viewBox="0 0 155 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                
            >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="140" /> 
                <rect x="0" y="165" rx="8" ry="8" width="150" height="15" /> 
                <rect x="0" y="190" rx="8" ry="8" width="100" height="15" /> 
                <rect x="0" y="230" rx="8" ry="8" width="80" height="25" /> 
                <rect x="115" y="230" rx="8" ry="8" width="32" height="32" />
            </ContentLoader> : 

            <>
               {
                onFavorite && (
                    <div
                        onClick={onClickFavorite}
                        className=" absolute cursor-pointer " 
                    >
                        <img  src={isFavorite ? '/img/card/like_active.svg' : '/img/card/like.svg'} alt="like"/>
                    </div>
                )
               }
            
                <img width={233} height={312} className="m-auto" src={imageUrl} alt="knife" />
                <p className=" mt-4 mb-4 font-normal  text-sm " >{title}</p>
                <div className="flex justify-between items-center" >
                    <div className=" flex flex-col " >
                        <p className=" uppercase text-zinc-400 text-xs " >Цiна :</p>
                        <b>{price} грн</b>
                    </div>
                    <button 
                        onClick={onClickPlus} 
                    >
                        { onPlus &&
                            <img  
                                width={32} 
                                height={32} 
                                src={isItemAdded(id) ? "/img/card/btn_cheked.svg" : "/img/card/plus.svg"} alt="plus"
                                
                            />
                        }
                    </button>
                </div>
            </>
        }

    </div>
  )
}

export default Card