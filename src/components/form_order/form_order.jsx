import React, { useState, useRef } from "react";
import { Modal, Input, Box } from "zmp-ui";
import emailjs from "@emailjs/browser";

import StatusModal from "../modal_status/modal_status";

const nameRegex =
  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/;
const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const addressRegex =
  /[^a-z0-9A-Z_&#192;ÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const OrderForm = ({
  showModalOrder,
  setShowModalOrder,
  productId,
  productName,
}) => {
  const [statusName, setStatusName] = useState("");
  const [statusPhone, setStatusPhone] = useState("");
  const [statusAddress, setStatusAddress] = useState("");
  const [statusEmail, setStatusEmail] = useState("");
  const [statusModalShow, setStatusModalShow] = useState(false);
  const form = useRef();

  const handleChangeValue = (e, setFunction, regex) => {
    const { value } = e.target;
    if (regex.test(value)) {
      setFunction("");
    } else {
      setFunction("error");
    }
  };

  const checkRegex = (name, regex) => {
    return regex.test(name);
  };

  const handleSubmitOrder = async () => {
    try {
      const formOrder = document.getElementById("form-order");
      const formData = new FormData(formOrder);

      const name = formData.get("name");
      const phone = formData.get("phone");
      const address = formData.get("address");
      const email = formData.get("sender");

      if (
        checkRegex(name, nameRegex) &&
        checkRegex(phone, phoneRegex) &&
        checkRegex(address, addressRegex) &&
        checkRegex(email, emailRegex)
      ) {
        sendEmail();
      }
    } catch (error) {
    }
  };

  const sendEmail = () => {
    emailjs
      .sendForm("service_qaizd7r", "template_nd3miqm", form.current, {
        publicKey: "_Ze817TAnxKjRtlCi",
      })
      .then(
        () => {
          setShowModalOrder(false);
          setStatusModalShow(true);
        },
        (error) => {
        }
      );
  };

  return (
    <Box>
      <Modal
        visible={showModalOrder}
        title="Thông tin đặt hàng"
        onClose={() => {
          setShowModalOrder(false);
        }}
        description={
          <form method="post" id="form-order" ref={form}>
            <div className="form-group">
              <Input
                onChange={(e) => handleChangeValue(e, setStatusName, nameRegex)}
                required
                name="name"
                placeholder="Nguyễn Văn A"
                id="name"
                type="text"
                clearable
                label="Nhập họ tên của bạn"
                errorText="Vui lòng nhập đúng định dạng tên!"
                status={statusName}
              />
            </div>
            <div className="form-group">
              <Input
                onChange={(e) =>
                  handleChangeValue(e, setStatusEmail, emailRegex)
                }
                required
                name="sender"
                placeholder="example@gmail.com"
                id="sender"
                type="email"
                clearable
                label="Nhập email của bạn"
                errorText="Vui lòng nhập đúng định dạng email!"
                status={statusEmail}
              />
            </div>
            <div className="form-group">
              <Input
                onChange={(e) =>
                  handleChangeValue(e, setStatusPhone, phoneRegex)
                }
                name="phone"
                placeholder="0123456789"
                id="phone"
                type="tel"
                clearable
                label="Nhập số điện thoại"
                errorText="Vui lòng nhập đúng số điện thoại!"
                status={statusPhone}
              />
            </div>
            <div className="form-group">
              <Input
                onChange={(e) =>
                  handleChangeValue(e, setStatusAddress, addressRegex)
                }
                name="address"
                placeholder="Số 10, đường A,..."
                id="address"
                type="text"
                clearable
                label="Địa chỉ giao hàng"
                errorText="Vui lòng nhập đúng địa chỉ!"
                status={statusAddress}
              />
            </div>
            <div className="form-group">
              <Input.TextArea
                name="note"
                id="note"
                type="text"
                clearable
                label="Ghi chú"
              />
            </div>
            <div className="form-group hidden">
              <Input.TextArea
                name="productId"
                id="productId"
                value={productId}
              />
            </div>
            <div className="form-group hidden">
              <Input.TextArea
                name="productName"
                id="productName"
                value={productName}
              />
            </div>
            <Box flex justifyContent="flex-end" className="gap-4" pt={4}>
              <button
                onClick={() => setShowModalOrder(false)}
                type="button"
                style={{
                  padding: "8px 16px",
                  color: "var(--white-color)",
                  background: "var(--background-grey)",
                  borderRadius: "5px",
                }}
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitOrder}
                id="submit-order-infomation-btn"
                type="button"
                style={{
                  padding: "8px 16px",
                  color: "var(--white-color)",
                  background: "var(--primary-color)",
                  borderRadius: "5px",
                }}
              >
                Xác nhận
              </button>
            </Box>
          </form>
        }
      />
      <StatusModal
        title="Thành công"
        description="Cảm ơn bạn đã đặt hàng, chúng tôi sẽ gọi điện xác nhận trong thời gian ngắn nhất"
        statusModalShow={statusModalShow}
        setStatusModalShow={setStatusModalShow}
      />
    </Box>
  );
};

export default OrderForm;
