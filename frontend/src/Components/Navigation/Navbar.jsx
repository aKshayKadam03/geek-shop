import React from "react";
import styled from "styled-components";

//icons
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
`;

const Navigation = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    flex-basis: 1;

    cursor: pointer;
  }
`;

const Logo = styled.div`
  flex-grow: 2;
  font-size: 21px;
`;

const OptionHolder = styled.div`
  flex-grow: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  > div {
    margin: 0 20px;
    transition: border 200ms ease;
    border-bottom: 1px solid ${(props) => props.theme.backgroundColor};
    :hover {
      border-bottom: 1px solid ${(props) => props.theme.fontColor};
    }
    > p {
      font-size: 16px;
    }
  }
  @media (max-width: 1100px) {
    display: none;
  }
`;

const ActionsHolder = styled.div`
  flex-grow: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > div:nth-child(2) {
    display: none;
    @media (max-width: 1100px) {
      display: inline;
    }
  }
  div:nth-child(3) {
    display: inline;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  > div {
    > i {
      font-size: 21px;
    }
    margin: 0 20px;
  }
`;

const SearchBar = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > div {
    margin: 10px;
  }
  > div:nth-child(1) {
    width: 3%;
  }
  > div:nth-child(2) {
    width: 94%;
  }
  > div:nth-child(3) {
    width: 3%;
  }
  input {
    color: ${(props) => props.theme.fontColor};
    font-size: 16px;
    width: 100%;
    border: none;
    outline: none;
    background-color: ${(props) => props.theme.backgroundColor};
    border-bottom: 1px solid ${(props) => props.theme.fontColor};
  }
`;

function Navbar({ themeToggle }) {
  const [search, setSearch] = React.useState(false);

  const searchBarToggler = () => {
    setSearch((prev) => !prev);
  };

  return (
    <NavbarWrapper>
      <Navigation>
        {search ? (
          <>
            <SearchBar>
              <div>
                <SearchIcon fontSize="default" />
              </div>
              <div>
                <input placeholder="Search..."></input>
              </div>
              <div onClick={searchBarToggler}>
                <CloseOutlinedIcon fontSize="default" />
              </div>
            </SearchBar>
          </>
        ) : (
          <>
            <Logo>Logo</Logo>
            <OptionHolder>
              <div>
                <p>Desktop</p>
              </div>
              <div>
                <p>Laptops</p>
              </div>
              <div>
                <p>Surveillance</p>
              </div>
              <div>
                <p>Processors</p>
              </div>
              <div>
                <p>Motherboard</p>
              </div>
              <div>
                <p>Accessories</p>
              </div>
            </OptionHolder>
            <ActionsHolder>
              <div onClick={searchBarToggler}>
                <SearchIcon fontSize="default" />
              </div>
              <div>
                <MenuOutlinedIcon fontSize="default" />
              </div>
              <div onClick={themeToggle}>
                <PersonOutlineOutlinedIcon fontSize="default" />
              </div>
              <div>
                <ShoppingCartOutlinedIcon fontSize="default" />
              </div>
            </ActionsHolder>
          </>
        )}
      </Navigation>
    </NavbarWrapper>
  );
}

export default Navbar;
