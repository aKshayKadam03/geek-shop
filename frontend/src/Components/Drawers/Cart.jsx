import React from "react";
import Drawer from "@material-ui/core/Drawer";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";

const CartWrapper = styled.div`
  width: 350px;
  padding: 20px;
`;

const CartHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartBody = styled.div``;

function Cart({ cartState, setCartState }) {
  const cartArray = useSelector((state) => state.cartWishReducer.cart);
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
            <CartCard {...item}></CartCard>
          ))}
        </CartBody>
      </CartWrapper>
    </Drawer>
  );
}

export default Cart;
