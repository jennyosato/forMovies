import React from 'react'
import avatar from '../../public/avatar.png'
import Image from 'next/image';
import StarRating from './rating';

const Review_card = ({reviews_data}) => {
  const imgPath = "https://image.tmdb.org/t/p/original";
  return (
    <div className='border-b border-dotted border-white py-2 flex gap-x-2 bg-black/40 rounded px-2 '>
      <Image
      width={400}
      height={400}
      className='w-12 h-12 rounded-full object-cover border border-red-600' 
      src={reviews_data.author_details.avatar_path ? imgPath + reviews_data.author_details.avatar_path : avatar}  
      alt={reviews_data.author}/>
      <div className='flex flex-col w-full'>
        {reviews_data.author_details.rating && <StarRating rating={reviews_data.author_details.rating/2} />}
      <h3 className='text-xs font-light text-white'>{reviews_data.content}</h3>
      <span className='text-right font-semibold text-sm text-red-800 block'>{reviews_data.author}</span>
      </div>
     
    </div>
  )
}

export default Review_card