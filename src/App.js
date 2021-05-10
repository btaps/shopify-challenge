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

function App() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

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

export default App;
