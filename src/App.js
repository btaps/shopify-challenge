import { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
// import { mainURL } from "./axios";
// import requests from "./requests";

import Header from "./components/Header";
import Intro from "./components/Intro";
import Results from "./components/Results";

import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "./firebase";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "./features/user/userSlice";
import Nominations from "./components/Nominations";
import {
  selectNominations,
  selectSearchResults,
} from "./features/movie/movieSlice";

function App() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const nominations = useSelector(selectNominations);
  const searchResults = useSelector(selectSearchResults);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      }
    });
  }, [userName, dispatch]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          dispatch(
            setUserLoginDetails({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            })
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="App">
      <Header
        userName={userName}
        userPhoto={userPhoto}
        handleAuth={handleAuth}
      />
      <Main>
        {!userName ? (
          <Intro handleAuth={handleAuth} />
        ) : (
          <>
            {nominations.length === 0 && searchResults.length === 0 && (
              <Container>
                <Message>Try searching for a movie!</Message>
              </Container>
            )}
            <Nominations />
            <Results />
          </>
        )}
      </Main>
    </div>
  );
}

const Main = styled.div`
  position: relative;
  top: 73px;
  min-height: 100vh;
  width: 100%;
  // background: url("/images/reel-background.png") center center / cover no-repeat
  // fixed;
  z-index: 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const Message = styled.h1``;
export default App;
