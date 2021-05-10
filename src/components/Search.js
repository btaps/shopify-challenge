import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { mainURL } from "../axios";
import requests from "../requests";

import { setSearchResults } from "../features/movie/movieSlice";

function Search({ opacity, setOpacity, visibility, setVisibility }) {
  const dispatch = useDispatch();
  const [movieTitle, setMovieTitle] = useState("");

  useEffect(() => {
    const button = document.getElementById("search-input");
    button.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("search-button").click();
      }
    });
  }, []);

  function updateMovieTitle(e) {
    setMovieTitle(e.target.value);
  }

  async function fetchData(title) {
    const fetchURL = requests.fetchMovieByTitle(title);
    const request = await mainURL
      .get(fetchURL)
      .catch((err) => console.log(new Error(err)));

    request.data.Response === "True"
      ? dispatch(setSearchResults({ searchResults: request.data.Search }))
      : dispatch(setSearchResults({ searchResults: [] }));
  }

  return (
    <Wrapper style={{ opacity: `${opacity}`, visibility: `${visibility}` }}>
      <SearchBar>
        <input
          id="search-input"
          onChange={updateMovieTitle}
          placeholder="Try a movie title"
        ></input>
        <label>Search</label>
      </SearchBar>
      <SearchButton
        id="search-button"
        onClick={() => {
          setOpacity(0);
          setVisibility("hidden");
          fetchData(movieTitle);
        }}
      >
        Search
      </SearchButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  left: 23.75rem;
  top: 3.5rem;
  z-index: 5;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  @media (max-width: 768px) {
    left: 21rem;
  }
`;

const SearchBar = styled.div`
  display: block;
  width: 25rem;
  max-width: 100%;
  height: 4rem;
  border: 0;
  background-color: #ffffff;
  border-bottom-left-radius: 41px;
  border-bottom-right-radius: 41px;
  border-top-left-radius: 0;
  border-top-right-radius: 41px;
  box-shadow: 0 17px 40px 0 rgba(75, 128, 182, 0.07);
  position: relative;
  font-size: 17px;
  color: #a7b4c1;
  transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out,
    box-shadow 0.1s ease-in-out;

  @media (max-width: 768px) {
    // border-top-left-radius: 41px;
    // border-top-right-radius: 0;
    width: 15rem;
  }

  input {
    position: absolute;
    border: 0;
    box-shadow: none;
    outline: none;
    background-color: rgba(255, 255, 255, 0);
    top: 0;
    height: 65px;
    width: 100%;
    padding: 0 53px;
    box-sizing: border-box;
    z-index: 3;
    display: block;
    color: #000;
    font-size: 17px;
    transition: top 0.1s ease-in-out;
  }

  input::placeholder {
    color: rgba(0, 0, 0, 0);
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    bottom: 1.7rem;
    font-size: 0.7rem;
    opacity: 0.7;
  }

  label {
    position: absolute;
    border: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 53px;
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
    cursor: text;
  }
`;

const SearchButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.6rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  letter-spacing: 3px;
  transition: all 0.2s ease 0s;
  color: #f9f9f9;
  font-size: 1rem;

  &:hover {
    background: rgb(19, 19, 19);
  }
`;

export default Search;
