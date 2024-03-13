import React from 'react'
import { FaStar } from 'react-icons/fa';
import './Card.css'

export default function StarRating({rating, remainder}) {

    return ( 
        <div className='stars'>
        {[ ... Array(rating)].map((star) => {
            return <FaStar size={20} className='yellow-stars'/>
        })}
        
        {[ ... Array(remainder)].map((star) => {
            return <FaStar size={20} className='gray-stars'/>
        })}

        </div>
    )
}
