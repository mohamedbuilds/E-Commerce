import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  async function addWishList(id) {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: id },
      { headers: { token: localStorage.getItem("token") } }
    );
    return res;
  }

  async function getLoggedWishList() {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers: { token: localStorage.getItem("token") } }
    );
    return res;
  }

  async function removeWishList(id) {
    const res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    return res;
  }

  return (
    <WishListContext.Provider
      value={{
        addWishList,
        getLoggedWishList,
        removeWishList,
      }}
    >
      {props.children}
    </WishListContext.Provider>
  );
}
