const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

const getMovies1 = async () => {
  let movieInfo= document.getElementById("movieInfo");
  movieInfo.innerHTML="";
  let selectedMovie = document.getElementById("movieselect")
  const movieData = await getData ("https://api.themoviedb.org/3/search/movie", {
  params: {
    api_key: "541f480956a206bb8529fb019433027e",
      query: selectedMovie.value,
    }
  });

  if (movieData.data.results.length < 1) {
    return;
  }
 
  let movie= movieData.data.results[0];
    const extraData = await getData(`https://api.themoviedb.org/3/movie/${movie.id}`, {
      params: {
        api_key: "541f480956a206bb8529fb019433027e",
        append_to_response: "videos",
      }
    });

    const trailer = extraData.data.videos.results.filter((video) => video.type === "Trailer").at(0).key;
    const p = document.createElement('p');
    const img = document.createElement('img');
    const iframe = document.createElement('iframe');

    p.innerHTML = `${movie.title} -- ${movie.release_date} -- ${movie.overview}-- ${movie.popularity}`;
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    iframe.src = `https://www.youtube.com/embed/${trailer}`

    movieInfo.append(p);
    movieInfo.append(img);
    movieInfo.append(iframe);
  }

;

getMovies1();

