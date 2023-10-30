import React from "react";
import Image from "next/image";
import fetch_data from "@/lib/fetch_data";



const Series = ({data, cast, trailer, reviews}) => {
  console.log(cast)
   
    const imgPath = 'https://image.tmdb.org/t/p/original' 
      
  return(
    <div>Hello world</div>
    //     <div className="mx-auto md:w-9/12 my-20 text-white border-2 border-white">
    //       <div className="grid place-content-center">
    //       <Image src={imgPath + data.backdrop_path} alt={data.title} width={800} height={800} className=" h-[35rem] w-full object-cover"/>

    //       </div>
    //       <h2>{data.title}</h2> 
    //       <p>{data.overview}</p> 
    //       <p>Release date: {data.release_date}</p>
    //       <p>Runtime :{data.runtime}minutes</p>
  
    
    // </div>
    );
};


export default Series;
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
    const data = await (await fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.API_KEY}&language=en-US&page=1`)).json()
    
    const {cast, reviews, trailer} = await fetch_data(params.id)
 
   return { props: {data, cast, reviews, trailer}}
} 