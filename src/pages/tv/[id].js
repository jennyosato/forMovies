import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cast_card from "@/components/cast_card";
import Review_card from "@/components/review_card";
import fetch_data from "@/lib/fetch_data";



const Series = ({data, cast_info, trailer, reviews}) => {
   console.log(data)
  const video = trailer.results.filter(
    (movieTrailer) =>
      movieTrailer.type == "Trailer" && movieTrailer.site == "YouTube" && movieTrailer.official == true
  );
  // console.log(video)

  const casts = cast_info.cast.map(
    (actor) => actor.profile_path && <Cast_card cast_data={actor} />
  );
  const reviews_data = reviews.results.map((rating) => (
    <Review_card reviews_data={rating} />
  ));
  const router = useRouter();
  const { view } = router.query;
   
    const imgPath = 'https://image.tmdb.org/t/p/original' 
      
  return(
   <>
       <div className="mx-auto md:w-9/12 my-20 text-white border-2 border-white">
         <div className="grid place-content-center">
         <Image src={imgPath + data.backdrop_path} alt={data.title} width={800} height={800} className=" h-[35rem] w-full object-cover"/>

         </div>
         <h2>{data.name}</h2> 
         <p>{data.overview}</p> 
         <p>Air date: {data.first_air_date}</p>
         <p>Runtime :{data.runtime}minutes</p>
         <p>Season: {data.number_of_seasons}</p>
  
    
   </div>
   <div>
          <nav className="bg-[#880808] py-2 border-b-2 w-full rounded border-red-950">
            <ul className="flex justify-evenly items-center py-2">
              <li className="">
                <Link
                  className="hover:text-black font-medium tracking-wider px-6 py-2"
                  href={`./${data.id}?view=cast`}
                  shallow={true}
                >
                  Cast
                </Link>{" "}
              </li>
              <li>
                <Link
                  className="hover:text-black text-lg font-medium tracking-wider px-5 py-2"
                  href={`./${data.id}?view=reviews`}
                  shallow={true}
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-black text-lg font-medium tracking-wider px-5 py-2"
                  href={`./${data.id}?view=trailer`}
                  shallow={true}
                >
                  Trailer
                </Link>
              </li>
            </ul>
          </nav>
          <div className="py-4 w-full ">
            {view == "cast" || view == undefined ? (
              <div className="w-11/12 mx-auto grid grid-cols-flexible gap-2">
                {casts}
              </div>
            ) : view == "reviews" ? (
              <div className="w-10/12 mx-auto flex flex-col gap-3">{reviews_data}</div>
            ) : (
              <div className="w-full">
                <iframe
                className="w-10/12 mx-auto h-[550px]"
                  id="video"
                  src={`https://www.youtube.com/embed/${video[video.length-1].key}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
   </>
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
  const API_URL = "https://api.themoviedb.org/3/";
  const data_url = `${API_URL}tv/${params.id}?api_key=${process.env.API_KEY}&language=en-US&page=1`
  const cast_url = `${API_URL}tv/${params.id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  const review_url = `${API_URL}tv/${params.id}/reviews?api_key=${process.env.API_KEY}&language=en-US`
  const trailer_url =  `${API_URL}tv/${params.id}/videos?api_key=${process.env.API_KEY}&language=en-US`
 
  const data = await (await fetch(data_url)).json()
  const cast_info = await (await fetch(cast_url)).json();
  const reviews = await (await fetch(review_url)).json();
  const trailer = await (await fetch(trailer_url)).json();
  return { props: { data, cast_info, reviews, trailer } };
} 