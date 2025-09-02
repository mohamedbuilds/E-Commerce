import React, { useContext, useState } from "react";
import "./Cart.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { CartContext } from "../../Context/CartContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
export default function Cart() {
  const [loading, setloading] = useState(false);
  const [current, setcurrent] = useState(0);
  const [loadingRemove, setloadingRemove] = useState(false);
  const [currentRemove, setcurrentRemove] = useState(0);
  const [loadingClear, setloadingClear] = useState(false);
  let queryClient = useQueryClient();

  let { getLoggedUser, updateProductQuntaty, removeProduct, clearProduct } =
    useContext(CartContext);

  const {
    data: allProducts,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ["loggedItems"],
    queryFn: getLoggedUser,
  });
  console.log(allProducts);

  async function quntaity(id, newCount) {
    setloading(true);
    setcurrent(id);
    let response = await updateProductQuntaty(id, newCount);
    if (response.data.status == "success") {
      toast.success("Quantity updated successfully");
      setloading(false);
      queryClient.invalidateQueries(["loggedItems"]);
    }
  }
  async function removeItems(id) {
    setloadingRemove(true);
    setcurrentRemove(id);
    let response = await removeProduct(id);
    if (response.data.status == "success") {
      setloadingRemove(false);
      toast.success("Product removed successfully ");
      queryClient.invalidateQueries(["loggedItems"]);
    }
  }

  async function clearAllItems() {
    setloadingClear(true);
    let response = await clearProduct();
    if (response.data.message == "success") {
      setloadingClear(false);
      queryClient.invalidateQueries(["loggedItems"]);
      toast.success("All products have been removed");
    }
  }
  if (isProductsLoading) {
    return (
      <div className="loader-container">
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      {allProducts?.products.length > 0 ? (
        <>
          {/* Cart Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-2xl shadow-lg mt-6">
            <p className="text-xl font-bold text-white">
              Total Price:
              <span className="ml-2">{allProducts.totalCartPrice} EGP</span>
            </p>
            <button
              onClick={() => clearAllItems()}
              className="px-6 py-2 bg-red-500 text-white font-medium rounded-xl shadow hover:bg-red-600 transition duration-200 flex items-center gap-2"
            >
              {loadingClear ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <i className="fas fa-trash-alt"></i> Clear All
                </>
              )}
            </button>
          </div>

          {/* Products Table */}
          <Table className="min-w-full mt-6 border rounded-xl overflow-hidden shadow-md">
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableHeadCell className="text-gray-700">Image</TableHeadCell>
                <TableHeadCell className="text-gray-700">Name</TableHeadCell>
                <TableHeadCell className="text-gray-700">QTY</TableHeadCell>
                <TableHeadCell className="text-gray-700">Price</TableHeadCell>
                <TableHeadCell className="text-gray-700">Total</TableHeadCell>
                <TableHeadCell className="text-gray-700">Action</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className="divide-y">
              {allProducts?.products?.map((el) => (
                <TableRow
                  key={el._id}
                  className="bg-white hover:bg-gray-50 transition"
                >
                  {/* Product Image */}
                  <TableCell>
                    <img
                      src={el.product.imageCover}
                      alt={el.product.title}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </TableCell>

                  {/* Product Title */}
                  <TableCell>
                    <p className="font-medium text-gray-800">
                      {el.product.title}
                    </p>
                  </TableCell>

                  {/* QTY */}
                  <TableCell className="flex items-center gap-2">
                    <button
                      onClick={() => quntaity(el.product._id, el.count - 1)}
                      className="cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full shadow transition"
                    >
                      -
                    </button>

                    <p className="w-8 text-center font-semibold text-gray-700">
                      {loading && current == el.product._id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        el.count
                      )}
                    </p>

                    <button
                      onClick={() => quntaity(el.product._id, el.count + 1)}
                      className="cursor-pointer w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full shadow transition"
                    >
                      +
                    </button>
                  </TableCell>

                  {/* Price */}
                  <TableCell>
                    <p className="text-gray-600">{el.price} EGP</p>
                  </TableCell>

                  {/* Total */}
                  <TableCell>
                    <p className="font-semibold text-green-600">
                      {el.count * el.price} EGP
                    </p>
                  </TableCell>

                  {/* Remove Btn */}
                  <TableCell>
                    <button
                      onClick={() => removeItems(el.product._id)}
                      className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition flex items-center gap-2"
                    >
                      {loadingRemove && currentRemove == el.product._id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <>
                          <i className="fas fa-times"></i> Remove
                        </>
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-28 h-28 mb-4 opacity-80"
            />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-500 mb-4">
              Looks like you haven’t added anything yet.
            </p>
            <Link
              to={"/"}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
