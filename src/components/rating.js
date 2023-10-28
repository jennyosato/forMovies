import React from 'react'
import { FaStar } from 'react-icons/fa'


const StarRating = ({rating}) => {
  // console.log(rating)
    const star = Array(5).fill(0)
    const stars = star.map((_, index) => {
        return (
          <FaStar
            key={index}
            className={rating > index ? "text-orange-500 inline" : "text-gray-300"}
          />
        );
      });
  return (
    <div className='flex'>{stars}</div>
  )
}

export default StarRating