import React from 'react'
import { BsPlay,BsPlus, BsArrowRightCircleFill,BsArrowLeftCircleFill, } from 'react-icons/bs';
import Image from 'next/image';
import pic from '../../public/download.jpeg'

const HeroBanner = ({movie, onBack, onNext}) => {
    const imgPath = "https://image.tmdb.org/t/p/original";
  return (
    <div className=" w-full flex flex-col justify-center">
        <div className='w-11/12 flex justify-between items-center text-3xl text-[#880808ce] px-2 absolute'>
          <button onClick={onBack} className='outline-none'><BsArrowLeftCircleFill /></button>
          <button onClick={onNext} className='outline-none'><BsArrowRightCircleFill/></button>
        </div>
      
        <div style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.98) 90%), url(${imgPath + movie.poster_path})`,}} className={`w-full h-screen  bg-center bg-cover bg-no-repeat rounded`}></div>
        <div className=" mx-12 md:w-1/3 absolute">
          <h2 className="text-4xl text-white font-bold">{movie.title}</h2>
          <p className="font-semibold text-white text-sm py-6">
            {movie.overview.substring(0, 150)}...
          </p>
          <div className="flex gap-4">
            <button className="rounded-lg p-2 text-white bg-black flex items-center">
              <BsPlus className='text-2xl' />
              Add to Watchlist
            </button>
            <button className="rounded-lg p-2 text-white bg-[#880808] flex items-center">
              <BsPlay className="text-2xl" />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
  )
}

export default HeroBanner