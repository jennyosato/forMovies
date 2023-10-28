import React from "react";
import Image from "next/image";
import StarRating from "@/components/rating";
import Link from "next/link";
import { useRouter } from "next/router";
import Cast_card from "@/components/cast_card";
import Review_card from "@/components/review_card";
import axios from "axios";

const Movie = ({ data, cast_info, reviews, trailer }) => {
  console.log(cast_info);
  const casts = cast_info.cast.map(
    (actor) => actor.profile_path && <Cast_card cast_data={actor} />
  );
  const reviews_data = reviews.results.map((rating) => (
    <Review_card reviews_data={rating} />
  ));
  const router = useRouter();
  const { view } = router.query;
  console.log(view);
  const imgPath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="mx-auto md:w-9/12 my-20 text-white px-4 relative">
      <div className="grid place-content-center">
        <Image
          src={imgPath + data.backdrop_path}
          alt={data.title}
          width={800}
          height={800}
          className=" h-[35rem] object-cover w-full"
        />
      </div>

      <div className="skew-y-6 w-full h-96 -mt-20 bg-black/70 border-t-4 border-[#880808]" />
      <div className="absolute top-[55%] px-12 flex flex-col bg-gradient-to-b from-transparent to-[rgb(10,10,10)]">
        <div className=" w-full flex items-center ">
          <Image
            src={imgPath + data.poster_path}
            alt={data.title}
            width={400}
            height={400}
            className="w-60 h-80 object-cover rounded -mt-40 mr-10"
          />

          <div className="pt-6 flex flex-col gap-y-[1px] text-sm">
            <h2 className="text-6xl font-bold text-[#880808]">{data.title}</h2>
            <span className="text-xs pb-4 pt-2 italic">{data.tagline}</span>
            <p>Genre: {data.genres.map((gen) => gen.name + " | ")}</p>
            <p>Release date: {data.release_date}</p>
            <p>Runtime :{data.runtime}minutes</p>
            <div className="flex items-center">
              <StarRating rating={data.vote_average / 2 - 1} />(
              {data.vote_count})
            </div>
          </div>
        </div>
        <p className="py-4 w-full text-sm ">
          <span className="font-semibold">Overview:</span> {data.overview}
        </p>
        <hr />
        <div className="h-32 w-full bg-black/50">
          <p></p>
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
              <div className="w-full grid grid-cols-flexible gap-2">
                {casts}
              </div>
            ) : view == "reviews" ? (
              <div className="w-full flex flex-col gap-3">{reviews_data}</div>
            ) : (
              <div>{null}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
export const getStaticPaths = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  
  const path = res.results.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths: path,
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const API_URL = "https://api.themoviedb.org/3/";
  const data = await axios.get(
    `${API_URL}movie/${params.id}?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
 
  const cast_info = await axios.get(
    `${API_URL}movie/${params.id}/credits?api_key=${process.env.API_KEY}&language=en-US`
  );
  
  const reviews = await axios.get(
    `${API_URL}movie/${params.id}/reviews?api_key=${process.env.API_KEY}&language=en-US`
  );
  const trailer = await axios.get(
    `${API_URL}movie/${params.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  return { props: { data, cast_info, reviews, trailer } };
};
