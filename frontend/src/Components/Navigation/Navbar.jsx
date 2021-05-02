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
  flex-grow: 1;
  font-size: 21px;
`;

const OptionHolder = styled.div`
  flex-grow: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  > input {
    width: 100%;
    border: none;
    font-size: 18px;
    padding: 5px 20px;
    outline: none;
    border-bottom: 2px solid #858282;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const ActionsHolder = styled.div`
  flex-grow: 1;
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

function Navbar({ themeToggle }) {
  const [search, setSearch] = React.useState(false);

  const searchBarToggler = () => {
    setSearch((prev) => !prev);
  };

  return (
    <NavbarWrapper>
      <Navigation>
        <Logo>Logo</Logo>
        <OptionHolder>
          <input placeholder="Search..."></input>
        </OptionHolder>
        <ActionsHolder>
          <div>
            <p>Go To Shop</p>
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
      </Navigation>
    </NavbarWrapper>
  );
}

export default Navbar;
