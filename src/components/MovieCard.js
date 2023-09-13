import React from 'react'
import Link from 'next/link';
import Image from 'next/image';


const MovieCard = ({movie}) => {
    const imgPath = "https://image.tmdb.org/t/p/original";
    return (
    <div className="min-w-[15rem] h-96">
        <Link href={`/${movie.id}`}>
          <Image
            src={imgPath + movie.poster_path}
            alt={movie.name ? movie.name: movie.title}
            width={400}
            height={400}
            className="w-60 h-80 object-cover rounded"
          />
          <h2 className="font-semibold text-center text-lg py-2">{movie.name ? movie.name: movie.title}</h2>
        </Link>
      </div>
  )
}

export default MovieCard