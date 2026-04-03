import Image from "next/image";
import styles from "./page.module.css";
import styled from 'styled-components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;


export default function Home({ 
    location 
}) {
  return (
    <StyledMainContainer className="fillHeight">
        <h1>Welcome to my website!</h1>
    </StyledMainContainer>     
  );
}
