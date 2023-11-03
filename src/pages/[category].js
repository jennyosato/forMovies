import React, { useState } from "react";
import MovieCard from "@/components/MovieCard";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

const Movies = () => {
  const [page, setPage] = useState(1);
  const router = useRouter()

  const cat = router.query.category
  //console.log(router.query)

    const url = cat === 'movie' ?
     `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&include_video=true&language=en-US&page=${page}&primary_release_year=2023&sort_by=popularity.desc&with_genres=28%20`:
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&first_air_date_year=2023&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_original_language=en`
    
  const handlePageChange = (pg) => {
    setPage(pg)
    router.push(`/${cat}?page=${pg}`)
  }
  

  const fetchMovies = async () => {
    // const url = cat === 'movie' ? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&include_video=true&language=en-US&page=${num}&primary_release_year=2023&sort_by=popularity.desc&with_genres=28%20`:
    // `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&first_air_date_year=2023&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${num}&sort_by=popularity.desc&with_original_language=en`
    
    // const url = urlFunc(page)
    return await axios.get(url);
  };

  const {
    isLoading,
    isError,
    error,
    data: movies,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["Movies", page],
    queryFn: () => fetchMovies(),
    keepPreviousData: true,
    // enabled: !!cat
  });


  if (isLoading) return <span>Loading ...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  // console.log(movies)

  const pageArr = Array(movies?.data.total_pages)
    .fill()
    .map((_, index) => index + 1);
  const paginate =
    page <= 5
      ? pageArr.slice(0, 5).concat('...', pageArr.length)
      : page >= pageArr.length - 5
      ? pageArr.slice(pageArr.length - 5)
      : pageArr.slice(page - 3, page + 2);
  return (
    <div>
      <div className="mt-20 text-white text-center">
        {paginate.map((pg) => {
          return (
            <button className="py-2 px-3 m-2 border shadow " onClick={() => handlePageChange(pg)}>
              {pg}
            </button>
          );
        })}
        <h1 className="text-3xl py-2">Movies/Popular Movies</h1>
        <div className=" mx-auto w-9/12 grid grid-cols-fluid gap-4 ">
          {movies.data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
// export const getStaticProps = async () => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
//   );
//   const movies = await res.json();
//   const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&first_air_date_year=2023&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_original_language=en`
//   )
//   const series = await response.json()
//    return {
//     props: { movies, series },
//   };
// };
