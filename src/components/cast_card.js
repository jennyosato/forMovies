import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import avatar from '../../public/avatar.png'

const Cast_card = ({cast_data}) => {
    const imgPath = "https://image.tmdb.org/t/p/original";
  return (
    <div className=" flex flex-col items-center justify-center h-72 overflow-hidden border border-[#888888] group">
        <Image
            src={cast_data.profile_path ? imgPath + cast_data.profile_path : avatar}
            alt={cast_data.name}
            width={400}
            height={400}
            className="w-full h-60 object-cover rounded-sm group-hover:scale-105 "
          />
          <h2 className="font-semibold text-center text-lg">{cast_data.name}</h2>
          <span className='text-sm block text-center '>as {cast_data.character}</span>
    </div>
  )
}

export default Cast_card