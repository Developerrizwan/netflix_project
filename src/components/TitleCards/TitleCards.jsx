import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data  from '../../assets/cards/Cards_data'
import { useState } from 'react'
const TitleCards = ({title,category}) => {

const [apiData, setApiData] = useState([]);
const cardsRef = useRef();




const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Mzg4YjUxN2RjYWY3Y2ZkOGNiMDdmOWQyZDdjZDQzNiIsIm5iZiI6MTczNTU0MTYyMS40NDUsInN1YiI6IjY3NzI0Mzc1NjNmOTBmOGY2NjkyNzA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cj7I5Hi98ezD3QDG99RTZMwa7y7aWeaa4G4SSypLe1Y'
    }
  };
  
  

const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('Wheel', handleWheel);
})


  return (

    <div className='titlecards'>

        <h2>{title?title:"Popular on Netflix"}</h2>
        
        <div className="card-list" ref={cardsRef}>
            {apiData.map((card,index)=>{
                return <div className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </div>
            })}
        </div>
    </div>
  )
}

export default TitleCards