import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartCount, setCartCount] = useState(0);

  async function addProductToCart(id) {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: id },
      { headers: { token: localStorage.getItem("token") } }
    );
    // لو الـ API بيرجع numOfCartItems بعد الإضافة
    setCartCount(res.data.numOfCartItems);
    return res;
  }

  function getLoggedUser() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => res.data.data);
  }

  function updateProductQuntaty(id, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => res);
  }

  async function removeProduct(id) {
    let res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => res);
    setCartCount(res.data.numOfCartItems);
    return res;
  }

  async function clearProduct() {
    let res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => res);

    setCartCount(res.data.numOfCartItems);
    return res;
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        removeProduct,
        updateProductQuntaty,
        getLoggedUser,
        clearProduct,
        cartCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
