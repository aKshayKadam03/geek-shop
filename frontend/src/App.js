import React from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import Shop from "./Pages/Shop/Shop";

const theme = {
  light: {
    backgroundColor: "#fff",
    fontColor: "#000",
  },
  dark: {
    backgroundColor: "#000",
    fontColor: "#fff",
  },
};

const AppWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.backgroundColor};
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
`;

function App() {
  const [activeTheme, setActiveTheme] = React.useState("light");

  const themeToggle = () => {
    if (activeTheme === "light") {
      setActiveTheme("dark");
    } else {
      setActiveTheme("light");
    }
  };

  return (
    <ThemeProvider theme={theme[activeTheme]}>
      <AppWrapper>
        <Navbar themeToggle={themeToggle}></Navbar>
        <Shop></Shop>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
