import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectNominations,
  setNominations,
} from "../features/movie/movieSlice";

function Nominations() {
  const dispatch = useDispatch();
  const nominations = useSelector(selectNominations);

  return (
    <>
      {nominations.length === 5 && (
        <Message>YOU HAVE SELECTED YOUR TOP FIVE!</Message>
      )}
      {nominations.length > 0 && (
        <Title>Below are a list of your nominations</Title>
      )}
      <Container>
        <Wrapper>
          {nominations.length > 0 &&
            nominations.map((movie, key) => {
              return (
                <Wrap>
                  <DeleteWrapper>
                    <Delete
                      onClick={() => {
                        dispatch(
                          setNominations({
                            nominations: nominations.filter(
                              (item) => item.Title !== movie.Title
                            ),
                          })
                        );
                      }}
                    >
                      <span></span>
                      <span></span>
                    </Delete>
                  </DeleteWrapper>

                  <a href="/#">
                    <img src={movie.Poster} alt={movie.Title} />
                  </a>
                </Wrap>
              );
            })}
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 4rem;
  margin-top: 2rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

const DeleteWrapper = styled.div`
  position: relative;
  top: 1.5rem;
  z-index: 8;
  left: -1rem;
`;

const Delete = styled.div`
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;
    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(-45deg);
      width: 16px;
    }
    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(-47deg);
      width: 2px;
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 1);
  }
`;

const Title = styled.h3`
  text-align: center;
  margin-top: 2rem;
`;

const Message = styled.h1`
  text-align: center;
  margin-top: 4rem;
`;

export default Nominations;
