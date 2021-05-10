import axios from "axios";

const mainURL = axios.create({
  baseURL: "https://www.omdbapi.com",
});

export { mainURL };
