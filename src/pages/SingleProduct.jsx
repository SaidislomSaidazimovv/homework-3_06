import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../hook/useAxios";
import ModalCustom from "../components/ModalCustom";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleData, setSingleData] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    useAxios()
      .get(`/products/${id}`)
      .then((res) => {
        setSingleData(res.data);
      });
  }, []);

  function sureDeleteProduct() {
    useAxios()
      .delete(`/products/${id}`)
      .then((res) => {
        setIsOpenModal(false);
        setTimeout(() => {
          toast.success("Product deleted successfully!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }, navigate(-1));
        }, 800);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeftOutlined className="scale-150" />
          </button>
          <h2 className="text-[25px] font-bold">{singleData?.productName}</h2>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsOpenModal(true)}
            className="!bg-red-500 hover:opacity-65 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            delete
          </Button>
          <Button
            onClick={() => navigate(`/update/${id}`)}
            className="!bg-[#75757d] hover:opacity-65 active:shadow-2xl"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Update Product
          </Button>
        </div>
      </div>
      <div>
        <ul className="w-[50%] mt-16 space-y-7 ml-5 p-5 rounded-lg border-[2px] border-slate-500">
          <div className="flex flex-col">
            <span className="text-[15px] text-slate-500">Product Name</span>
            <strong className="text-[25px] leading-[17px]">
              {singleData.productName}
            </strong>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] text-slate-500">Product Price</span>
            <strong className="text-[25px] leading-[17px]">
              {singleData.productPrice}
            </strong>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] text-slate-500">Product Type</span>
            <strong className="text-[25px] leading-[17px]">
              {singleData.productType == "2" && "Vegetables"}
              {singleData.productType == "3" && "Spices"}
              {singleData.productType == "1" && "Fruits"}
            </strong>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] text-slate-500">Product Date</span>
            <strong className="text-[25px] leading-[17px]">
              {singleData.productDate}
            </strong>
          </div>
        </ul>
        <ModalCustom
          title={"Are you sure to delete product"}
          handleOk={sureDeleteProduct}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        ></ModalCustom>
      </div>
    </>
  );
};

export default SingleProduct;
