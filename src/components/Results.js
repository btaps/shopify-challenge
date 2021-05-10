import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectSearchResults,
  selectNominations,
  setNominations,
} from "../features/movie/movieSlice";

function Results() {
  const dispatch = useDispatch();
  const movies = useSelector(selectSearchResults);
  const nominations = useSelector(selectNominations);

  return (
    <>
      {movies.length > 0 && <Title>Pick a movie to nominate</Title>}
      <Container>
        <Content>
          {movies.length > 0 &&
            movies.map((movie, key) => {
              return (
                <Wrap key={key}>
                  <ImgWrap>
                    <img src={movie.Poster} alt={movie.Title} />
                  </ImgWrap>
                  <Description>
                    <div>Title: "{movie.Title}"</div>
                    <div>Year: {movie.Year}</div>
                    {nominations.filter((item) => item.Title === movie.Title)
                      .length !== 1 && (
                      <DropDown
                        onClick={() => {
                          if (nominations.length < 5) {
                            for (let i = 0; i < nominations.length; i++) {
                              if (nominations[i].Title === movie.Title) {
                                return;
                              }
                            }

                            dispatch(
                              setNominations({
                                nominations: [...nominations, movie],
                              })
                            );
                          }
                        }}
                      >
                        <span>Nominate</span>
                      </DropDown>
                    )}
                  </Description>
                </Wrap>
              );
            })}
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 4rem;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const DropDown = styled.div`
  position: relative;
  top: -20rem;
  right: 2rem;
  cursor: pointer;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  z-index: 7;
  }
`;

const Wrap = styled.div`
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const ImgWrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const Description = styled.div`
  padding-top: 2rem;
  padding-left: 1rem;
`;

const Title = styled.h3`
  text-align: center;
  margin-top: 4rem;
`;

export default Results;
