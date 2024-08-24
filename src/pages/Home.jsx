import React, { useEffect, useState } from "react";
import TableCustom from "../components/TableCustom";
import axios from "axios";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      res.data.map((item) => {
        switch (item.productType) {
          case "1":
            item.productType = "Fruits";
            break;
          case "2":
            item.productType = "Vegetables";
            break;
          case "3":
            item.productType = "Spices";
            break;
        }
      });
      res.data.map((item, index) => {
        item.key = Math.random();
        item.ID = index + 1;
        item.action = (
          <div className="flex space-x-2 mx-[-12px]">
            <button
              onClick={() => handleDeleteProduct(item.id)}
              className="text-red-500 hover:text-white hover:bg-red-500 transition duration-300 p-2 rounded"
            >
              <DeleteOutlined />
            </button>
            <button
              onClick={() => navigate(`update/${item.id}`)}
              className="text-blue-500 hover:text-white hover:bg-blue-500 transition duration-300 p-2 rounded"
            >
              <EditOutlined />
            </button>
            <button
              onClick={() => navigate(item.id)}
              className="text-black hover:text-white hover:bg-black transition duration-300 p-2 rounded"
            >
              <MoreOutlined />
            </button>
          </div>
        );
      });
      setProducts(res.data);
      setIsLoading(false);
    });
  }, [refresh]);

  function handleDeleteProduct(id) {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setIsLoading(true);
        setTimeout(() => {
          setRefresh(!refresh);
          toast.success("Product deleted successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }, 800);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSearchProduct(e) {
    const value = e.target.value.toLowerCase();
    const filteredProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(value)
    );
    setIsLoading(true);
    if (value) {
      setTimeout(() => {
        setProducts(filteredProducts);
        setIsLoading(false);
      }, 800);
    } else {
      setTimeout(() => {
        setRefresh(!refresh);
        setIsLoading(false);
      }, 800);
    }
  }

  return (
    <div className="p-5">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[25px] font-bold">All Products</h2>
          <p className="text-[15px] text-slate-600">
            Products ({products.length})
          </p>
        </div>
        <Button
          onClick={() => navigate("/add-product")}
          className="!bg-[#75757d] hover:opacity-65 active:shadow-2xl"
          type="primary"
          htmlType="submit"
          size="large"
        >
          Add Product
        </Button>
      </div>
      <div className="mt-5">
        <Input
          onChange={handleSearchProduct}
          className="w-[300px] p-2"
          size="large"
          allowClear
          placeholder="Search product by name"
        />
      </div>
      <div className="mt-10">
        <TableCustom isLoading={isLoading} products={products} />
      </div>
    </div>
  );
};

export default Home;
