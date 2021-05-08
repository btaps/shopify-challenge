import { useEffect } from "react";
import "./App.css";
import { mainURL } from "./axios";
import requests from "./requests";

import Header from "./components/Header";

function App() {
  useEffect(() => {
    async function fetchData() {
      const fetchURL = requests.fetchMovieByTitle("spongebob");
      const request = await mainURL
        .get(fetchURL)
        .catch((err) => console.log(new Error(err)));
      console.log(request);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
