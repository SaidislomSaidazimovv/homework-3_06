import { Modal } from "antd";
import React from "react";

const ModalCustom = ({isOpenModal, handleOk, setIsOpenModal, title, children}) => {
  return (
    <div>
      <Modal
        title={title}
        open={isOpenModal}
        onOk={handleOk}
        onCancel={() => setIsOpenModal(false)}
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalCustom;
