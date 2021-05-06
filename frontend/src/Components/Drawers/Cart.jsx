import React from "react";
import Drawer from "@material-ui/core/Drawer";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { cartSubTotalCalculator } from "../../Utils/cartCalculator";
import {
  deleteCartHandler,
  getCartHandler,
  uniqueCartProductsHandler,
} from "../../Redux/CartWish/action";
import { cartDuplicateHandler } from "../../Utils/duplicateHandler";

const CartWrapper = styled.div`
  width: 420px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const CartHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-basis: 2;
  padding: 20px 10px 20px;
  border-bottom: 1px solid #dad1d1;
`;

const CartBody = styled.div`
  flex-basis: 6;
  height: 100%;
  overflow-y: auto;
  padding: 10px 15px;
`;

const CartFooter = styled.div`
  border-top: 1px solid #dad1d1;
  padding: 10px 20px;
  flex-basis: 2;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
  p {
    font-size: 14px;
    letter-spacing: 0.2ch;
    font-weight: 500;
    text-transform: uppercase;
  }
`;

const CheckOutButton = styled.button`
  background-color: ${(props) => props.theme.btnBackground};
  width: 100%;
  color: white;
  margin: 10px 0 0;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border: 1px solid ${(props) => props.theme.btnBackground};
  :hover {
    background-color: white;
    color: ${(props) => props.theme.btnBackground};
  }
`;

function Cart({ cartState, setCartState }) {
  const cartArray = useSelector((state) => state.cartWishReducer.cart);
  const userData = useSelector((state) => state.authReducer.userData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (cartArray.length === 0) {
      setCartState(false);
    } else {
      setCartState(true);
    }
    dispatch(uniqueCartProductsHandler(cartDuplicateHandler(cartArray)));
  }, [cartArray]);

  function onDeleteHandler(id) {
    dispatch(deleteCartHandler(id)).then((res) =>
      dispatch(getCartHandler(userData._id))
    );
  }

  return (
    <Drawer anchor="right" open={cartState} onClose={() => setCartState(false)}>
      <CartWrapper>
        <CartHead>
          <div>
            <h1>Cart</h1>
          </div>
          <div>
            <ClearIcon fontSize="large" onClick={() => setCartState(false)} />
          </div>
        </CartHead>
        <CartBody>
          {cartArray?.map((item) => (
            <CartCard onDeleteHandler={onDeleteHandler} {...item}></CartCard>
          ))}
        </CartBody>
        <CartFooter>
          <div>
            <p>subtotal</p>
            <p>₹ {cartSubTotalCalculator(cartArray)}</p>
          </div>
          <div>
            <CheckOutButton>Checkout</CheckOutButton>
          </div>
        </CartFooter>
      </CartWrapper>
    </Drawer>
  );
}

export default Cart;
