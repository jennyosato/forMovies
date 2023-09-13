import React from "react";
import Image from "next/image";



const Movie = ({data}) => {
  
   console.log(data) 
    const imgPath = 'https://image.tmdb.org/t/p/original' 
      
  return(
        <div className="mx-auto md:w-9/12 my-20 text-white border-2 border-white">
          <div className="grid place-content-center">
          <Image src={imgPath + data.poster_path} alt={data.title} width={800} height={800} className=" h-[35rem] object-cover"/>

          </div>
          <h2>{data.title}</h2> 
          <p>{data.overview}</p> 
          <p>Release date: {data.release_date}</p>
          <p>Runtime :{data.runtime}minutes</p>
  
    
    </div>);
};


export default Movie;
export const getStaticPaths = async() => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
  const pathdata = await res.json()
  const path = pathdata.results.map(movie => ({
    params: {id: movie.id.toString()}
  }))
 
    return {
        paths: path, fallback: true}
}
export const getStaticProps = async({params}) =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.API_KEY}&language=en-US&page=1`)
    const data = await res.json()
 
   return { props: {data}}
} 