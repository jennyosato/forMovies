
const fetch_data = async (id) => {
  const API_URL = "https://api.themoviedb.org/3/";
  const CREDIT_URL = `${API_URL}tv/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`;
  const review_url = `${API_URL}tv/${params.id}/reviews?api_key=${process.env.API_KEY}&language=en-US`
  const trailer_url =  `${API_URL}tv/${params.id}/videos?api_key=${process.env.API_KEY}&language=en-US`
  const cast = await (await fetch(CREDIT_URL)).json();
//   const Cast_url = `${API_URL}movie/${params.id}/credits?api_key=${process.env.API_KEY}&language=en-US`
//   const cast_info = (await fetch(Cast_url)).json()
const reviews = await (await fetch(review_url)).json();
  const trailer = await (await fetch(trailer_url)).json();
  return { cast, cast_info, reviews, trailer };

};

export default fetch_data;
