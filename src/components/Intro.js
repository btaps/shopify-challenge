import styled from "styled-components";

function Intro({ handleAuth }) {
  return (
    <Container>
      <Wrapper onClick={handleAuth}>
        <span>Please login to nominate movies!</span>
      </Wrapper>
    </Container>
  );
}

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  background-color: #040714;
  padding: 1rem;
`;

export default Intro;
