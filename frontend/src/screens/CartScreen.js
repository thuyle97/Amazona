import React, { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]); //add var you use in dependent bracket

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART: productID: {productId} QTy: {qty}
      </p>
    </div>
  );
}
