import { Button, Input, DatePicker } from "antd";
import React, { useState, useEffect } from "react";
import SelectCustom from "./../components/SelectCustom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAxios } from "../hook/useAxios";
import dayjs from "dayjs";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const date = new Date();
  const nowDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    0
  )}-${String(date.getDate()).padStart(2, 0)}`;
  const [productName, setProductName] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productType, setProductType] = useState(null);
  const [productDate, setProductDate] = useState(nowDate);

  const changeDate = (date, dateString) => {
    setProductDate(dateString);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const data = {
      productName,
      productPrice,
      productType,
      productDate,
    };

    if (id) {
      data.id = id;
      useAxios()
        .put(`products/${id}`, data)
        .then((res) => {
          toast.success("Product updated successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/");
          }, 1400);
        })
        .catch((err) => {
          toast.error("Error updating product. Please try again.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.error(err);
        });
    } else {
      useAxios()
        .post("products", data)
        .then((res) => {
          toast.success("Product added successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            navigate("/");
          }, 1400);
        })
        .catch((err) => {
          toast.error("Error adding product. Please try again.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.error(err);
        });
    }
  };

  // Update Part start

  const dateFormat = "YYYY-MM-DD";

  useEffect(() => {
    if (id) {
      useAxios()
        .get(`/products/${id}`)
        .then((res) => {
          setProductName(res.data.productName);
          setProductPrice(res.data.productPrice);
          setProductType(res.data.productType);
          setProductDate(res.data.productDate);
        });
    }
  }, []);

  // Update Part end

  return (
    <div>
      <form onSubmit={handleAddProductSubmit}>
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => navigate(-1)}>
              <ArrowLeftOutlined className="scale-150" />
            </button>
            <h2 className="text-[25px] font-bold">
              {id ? "Update" : "Add"} Product
            </h2>
          </div>
          <Button
            className="!bg-[#75757d] hover:opacity-65 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            {id ? "Change" : "Save"} Product
          </Button>
        </div>
        <div className="w-[450px] space-y-4 p-5">
          <Input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            allowClear
            className="p-2"
            size="large"
            name="productName"
            type="text"
            placeholder="Enter product name"
            required
          />
          <Input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            allowClear
            className="p-2"
            size="large"
            name="productPrice"
            type="text"
            placeholder="Enter product price"
            required
          />
          <SelectCustom
            productType={productType}
            setProductType={setProductType}
          />
          <DatePicker
            value={dayjs(productDate, dateFormat)}
            className="p-2 w-full"
            size="large"
            onChange={changeDate}
            required
          />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
