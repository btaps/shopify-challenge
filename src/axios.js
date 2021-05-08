import axios from "axios";

const mainURL = axios.create({
  baseURL: "http://www.omdbapi.com",
});

const imgURL = axios.create({
  baseURL: "http://img.omdbapi.com",
});

export { mainURL, imgURL };
