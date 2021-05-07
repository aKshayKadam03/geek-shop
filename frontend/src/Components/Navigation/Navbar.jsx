import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../Redux/Auth/action";
import Cart from "../Drawers/Cart";
import Badge from "@material-ui/core/Badge";

//icons
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { getSearchHandler } from "../../Redux/Products/action";
import SearchCard from "./SearchCard";
import {
  getCartHandler,
  getWishlistHandler,
} from "../../Redux/CartWish/action";

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
  position: relative;
  background-color: #f6f6f6;
  padding: 0px 15px;
  border-radius: 5px;
  input {
    width: 100%;
    font-size: 18px;
    padding: 10px 10px;
    outline: none;
    transition: all 700ms ease;
    max-width: 1000px;
    border: none;
    border: 1px solid #f6f6f6;
    background-color: #f6f6f6;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const NavButton = styled.button`
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
const NavItem = styled.button`
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-width: 80px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.btnBackground};
  :hover {
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

const SearchResults = styled.div`
  width: 100%;
  margin: 0 auto;
  position: absolute;
  max-width: 1000px;
  top: 100%;
  background: white;
  border: 1px solid #f6f6f6;
  border-top: none;
  border-radius: 5px;
  z-index: 400;
`;

function Navbar({ setCartState, setWishlistState }) {
  const [search, setSearch] = React.useState("");
  const [searchModal, setSearchModal] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const userData = useSelector((state) => state.authReducer.userData);
  const cartArray = useSelector((state) => state.cartWishReducer.cart);
  const wishlistArray = useSelector((state) => state.cartWishReducer.wishlist);

  let searchSuggestions = useSelector(
    (state) => state.productReducer.searchSuggestions
  );

  function logoutHandler() {
    dispatch(handleLogout());
  }

  React.useEffect(() => {
    if (isAuth) {
      dispatch(getCartHandler(userData._id));
      dispatch(getWishlistHandler(userData._id));
    }
  }, [isAuth]);

  React.useEffect(() => {
    setSuggestions(searchSuggestions);
  }, [searchSuggestions]);

  function onQuerySearchHandler() {
    if (search.trim() === "") {
      setSuggestions([]);
      setSearchModal(false);
      return;
    }
    setSearchModal(true);
    dispatch(getSearchHandler(search));
  }

  React.useEffect(() => {
    onQuerySearchHandler();
  }, [search]);

  return (
    <NavbarWrapper>
      <Navigation>
        <Logo>
          <Link to="/">Creative Systems</Link>
        </Logo>
        <SearchHolder status={search}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="S E A R C H . . ."
          />
          {searchModal ? (
            <i onClick={() => setSearch("")} className="fas fa-times"></i>
          ) : (
            <i className="fas fa-search"></i>
          )}

          {searchModal && (
            <SearchResults>
              {suggestions?.map((item) => (
                <SearchCard
                  setSearchModal={setSearchModal}
                  setSearch={setSearch}
                  key={item._id}
                  {...item}
                />
              ))}
            </SearchResults>
          )}
        </SearchHolder>
        <ActionsHolder>
          <div>
            <Link to="/shop">
              <NavItem>SHOP</NavItem>
            </Link>
          </div>
          <div>
            <MenuOutlinedIcon fontSize="default" />
          </div>

          <div>
            {isAuth && (
              <Badge badgeContent={wishlistArray.length} color="error">
                <FavoriteBorderIcon
                  onClick={() => setWishlistState(true)}
                  fontSize="default"
                />
              </Badge>
            )}
          </div>
          <div>
            {isAuth && (
              <Badge badgeContent={cartArray.length} color="error">
                <ShoppingCartOutlinedIcon
                  onClick={() => setCartState(true)}
                  fontSize="default"
                />
              </Badge>
            )}
          </div>
          <div>
            {isAuth ? (
              <Link to="/">
                <NavButton onClick={logoutHandler}>
                  <span> Logout </span>
                </NavButton>
              </Link>
            ) : (
              <Link to="/auth/login">
                <NavButton>
                  <span> Login </span>
                </NavButton>
              </Link>
            )}
          </div>
        </ActionsHolder>
      </Navigation>
    </NavbarWrapper>
  );
}

export default Navbar;
