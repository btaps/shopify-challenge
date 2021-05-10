const API_KEY = "b4a7ab89";

const requests = {
  fetchPoster: (title) => {
    return `?apikey=${API_KEY}&t=${title}`;
  },
  fetchMovieByTitle: (title) => {
    return `?apikey=${API_KEY}&s=${title}`;
  },
};

export default requests;
