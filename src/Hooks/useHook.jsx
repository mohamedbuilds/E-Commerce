import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useHook() {
  function getProducts() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => res.data.data);
  }

  let productInfo = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProducts,
  });
  return productInfo;
}
