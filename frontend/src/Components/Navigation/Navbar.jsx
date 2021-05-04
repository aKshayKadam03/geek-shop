import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//icons
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

import { getSearchHandler } from "../../Redux/Products/action";
import SearchCard from "./SearchCard";

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.fontColor};
  border-bottom: 1px solid #e4e4e4;
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
  a {
    text-decoration: none;
    color: black;
  }
`;

const SearchHolder = styled.div`
  flex-grow: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    font-size: 18px;
    padding: 10px 20px;
    outline: none;
    transition: all 1000ms ease;
    max-width: 400px;
    border: none;
    border-radius: 5px;
    margin: 10px;
    :focus {
      background-color: #f6f6f6;
      max-width: 1000px;
      padding: 10px;
    }
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const GoToShop = styled.button`
  background-color: ${(props) => props.theme.btnBackground};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-width: 80px;
  border: 1px solid ${(props) => props.theme.btnBackground};
  :hover {
    background-color: white;
    color: ${(props) => props.theme.btnBackground};
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

const SearchResults = styled.div``;

function Navbar({ themeToggle }) {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();
  let searchSuggestions = useSelector(
    (state) => state.productReducer.searchSuggestions
  );
  function onQuerySearchHandler() {
    if (search.trim() === "") {
      return;
    }
    dispatch(getSearchHandler(search));
  }

  React.useEffect(() => {
    onQuerySearchHandler();
    console.log(searchSuggestions);
  }, [search]);

  return (
    <NavbarWrapper>
      <Navigation>
        <Logo>
          <Link to="/">Creative Systems</Link>
        </Logo>
        <SearchHolder status={search}>
          <input placeholder="S e a r c h . . ."></input>
          <SearchIcon />
          <SearchResults>
            {searchSuggestions?.map((item) => (
              <SearchCard {...item} />
            ))}
          </SearchResults>
        </SearchHolder>
        <ActionsHolder>
          <div>
            <Link to="/shop">
              <GoToShop>
                <span> Shop </span>
              </GoToShop>
            </Link>
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
