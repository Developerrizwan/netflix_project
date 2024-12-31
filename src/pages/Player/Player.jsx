import React, { useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name : "",
    key : "",
    published_at : "",
    type : ""
  })


  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Mzg4YjUxN2RjYWY3Y2ZkOGNiMDdmOWQyZDdjZDQzNiIsIm5iZiI6MTczNTU0MTYyMS40NDUsInN1YiI6IjY3NzI0Mzc1NjNmOTBmOGY2NjkyNzA4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cj7I5Hi98ezD3QDG99RTZMwa7y7aWeaa4G4SSypLe1Y'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
    console.log(useEffect)
  },[])


  

  return (
    <div className='player'>
      <img src= {back_arrow_icon} alt="" onClick={()=>{navigate('/')}}/>
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player