import React from "react";
import Image from "next/image";

const Movie = ({ data }) => {
  console.log(data);
  const imgPath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="mx-auto md:w-9/12 my-20 text-white  px-4 relative">
      <div className="grid place-content-center">
        <Image
          src={imgPath + data.backdrop_path}
          alt={data.title}
          width={800}
          height={800}
          className=" h-[35rem] object-cover w-full"
        />
      </div>

      <div className="skew-y-6 w-full h-96 -mt-20 bg-black/70 border-t-4 border-[#880808]"/>
      <div className="absolute top-[55%] px-12 flex flex-col bg-gradient-to-b from-transparent to-[rgb(10,10,10)]">
      <div className=" w-full flex items-center ">
        <Image
          src={imgPath + data.poster_path}
          alt={data.title}
          width={400}
          height={400}
          className="w-60 h-80 object-cover rounded -mt-40 mr-10"
        />

        <div className="pt-6">
          <h2 className="text-6xl font-bold text-[#880808]">
            {data.title}
          </h2>
          <span className="text-sm italic">{data.tagline}</span>
          <p>Genre: {data.genres.map((gen) => gen.name + " | ")}</p>
          <p>Release date: {data.release_date}</p>
          <p>Runtime :{data.runtime}minutes</p>
          <p>
            Rating: {data.vote_average}({data.vote_count})
          </p>
        </div>
        
      </div>
      <p className="py-2 w-full "><span className="text-xl">Overview:</span> {' '}{data.overview}</p>
      <hr/> 
      <div>
        <p></p>
      </div>
      <div>
        <nav>
          <ul>li</ul>
        </nav>
      </div>
    
      </div>
     </div>
  );
};

export default Movie;
export const getStaticPaths = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const pathdata = await res.json();
  const path = pathdata.results.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths: path,
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();

  return { props: { data } };
};
