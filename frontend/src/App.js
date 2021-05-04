import React from "react";
import Router from "./Routes/Router";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import Shop from "./Pages/Shop/Shop";

const theme = {
  light: {
    backgroundColor: "#fff",
    fontColor: "#000",
    btnBackground: "#161516",
  },
  dark: {
    backgroundColor: "#000",
    fontColor: "#fff",
    btnBackground: "#242525",
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
        <Router></Router>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
