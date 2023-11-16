import { useState, useRef } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { BsCircleFill, BsChevronRight, BsChevronLeft } from "react-icons/bs";
import HeroBanner from "@/components/HeroBanner";
import MovieCard from "@/components/MovieCard";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Home",
};

export default function Home({ hero, series }) {
  const router = useRouter();
  const scrollRef = useRef();
  const seriesRef = useRef();
  const [indx, setIndx] = useState(0);
  const heroData = hero.results.slice(0, 5);

  const point = Array(5).fill(0);
  const points = point.map((_, index) => {
    return (
      <BsCircleFill
        key={index}
        className={index == indx ? "text-[#880808]" : "text-gray-200"}
      />
    );
  });
  const forwordScroll = (refs) => {
    refs.current.scrollLeft += 500;
  };
  const backwardScroll = (refs) => {
    refs.current.scrollLeft -= 500;
  };
  const next = () => {
    if (indx < heroData.length - 1) {
      setIndx((prev) => prev + 1);
    } else {
      setIndx(0);
    }
  };
  const back = () => {
    if (indx > 0) {
      setIndx((prev) => prev - 1);
    } else {
      setIndx(heroData.length - 1);
    }
  };

  const heroSlider = heroData.map((movie) => {
    return <HeroBanner movie={movie} onBack={back} onNext={next} />;
  });

  return (
    <div className="">
      <div className="md:h-screen w-full mt-4">
        <div className="w-full md:w-11/12 h-full mx-auto rounded-md">{heroSlider[indx]}</div>
        <div className="absolute bottom-8 w-full flex justify-center gap-1 text-gray-200">
          {points}
        </div>
      </div>
      <div className="flex flex-col gap-20">
        <div className="bg-[rgb(10,10,10)] p-3">
          <h2 className="text-white text-4xl font-bold py-4">Popular Movies</h2>
          <div
            ref={scrollRef}
            className="scroll w-full flex items-center gap-2 overflow-x-scroll text-white"
          >
            {hero.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} category="movie" />
            ))}
            <div className="w-full px-4 left-0 absolute flex justify-between text-3xl font-bold">
              <button
                onClick={() => backwardScroll(scrollRef)}
                className="hover:bg-[#880808] outline-none border-none w-10 h-10 rounded-full grid place-content-center bg-black/70 font-bold"
              >
                <BsChevronLeft />
              </button>
              <button
                onClick={() => forwordScroll(scrollRef)}
                className="hover:bg-[#880808] outline-none border-none w-10 h-10 rounded-full grid place-content-center bg-black/70 font-bold"
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
          <div className="py-6 flex justify-center">
            <button 
            onClick={() => router.push('/movie?page=2')}
            className="rounded-lg py-2 px-4 text-white bg-[#880808] ">
              See More
            </button>
          </div>
        </div>
        <div className="bg-[rgb(10,10,10)] p-3">
          <h2 className="text-white text-4xl font-bold py-4">
            Popular TV shows
          </h2>
          <div
            ref={seriesRef}
            className="scroll w-full flex items-center gap-2 overflow-x-scroll text-white"
          >
            {series.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} category="tv" />
            ))}
            <div className="w-full px-4 left-0 absolute flex justify-between text-3xl font-bold">
              <button
                onClick={() => backwardScroll(seriesRef)}
                className="hover:bg-[#880808] outline-none border-none w-10 h-10 rounded-full grid place-content-center bg-black/70 font-bold"
              >
                <BsChevronLeft />
              </button>
              <button
                onClick={() => forwordScroll(seriesRef)}
                className="hover:bg-[#880808] outline-none border-none w-10 h-10 rounded-full grid place-content-center bg-black/70 font-bold"
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
          <div className="py-6 flex justify-center">
            <button
            onClick={() => router.push('/tv?page=2')}
            className="rounded-lg py-2 px-4 text-white bg-[#880808] ">
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  const url = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&include_adult=false&include_video=true&language=en-US&page=1&primary_release_year=2023&sort_by=popularity.desc&with_genres=28%20`
  );
  const seriesdata = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_KEY}&first_air_date_year=2017&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en&vote_count.gte=200`
  );

  const hero = await url.json();
  const series = await seriesdata.json();
  return {
    props: { hero, series },
  };
};
