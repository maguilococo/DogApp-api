import React from 'react';
import {Link} from  'react-router-dom';
import s from './index.module.css';

// This component receives by params the properties that needs to dispaly
function DogCard({id, name, image, temperament}) {

  return (  
    <div className={s.card}>
      <Link to={`/breeds/${id}`}>
        <img alt='pic' src={image}/>
        <h4 className={s.description}>
          <span className={s.name_breed}>
            {name}
          </span>
          <br></br>
          {temperament}
        </h4>
      </Link>
    </div>
    
  )
};


export default DogCard;