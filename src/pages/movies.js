import React, { useState } from "react";
import MovieCard from "@/components/MovieCard";
import { useQuery } from "react-query";
import axios from "axios";

const Movies = () => {
  const [page, setPage] = useState(1);

  const fetchMovies = async (num) => {
    return await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&primary_release_year=2023&language=en-US&page=${num}`
    );
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
    queryFn: () => fetchMovies(page),
    keepPreviousData: true,
  });
  if (!isLoading) {
    const pageArr = Array(movies.data.total_pages)
      .fill()
      .map((_, index) => index + 1);
    console.log(pageArr);
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="mt-20 text-white text-center">
          <h1 className="text-3xl py-2">Movies/Popular Movies</h1>
          <div className=" mx-auto w-9/12 grid grid-cols-fluid gap-4 ">
            {movies.data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
// export const getStaticProps = async () => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
//   );
//   const data = await res.json();

//    return {
//     props: { data },
//   };
// };
