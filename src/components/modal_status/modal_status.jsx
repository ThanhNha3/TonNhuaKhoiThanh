import React from "react";
import { Button, Modal, Box } from "zmp-ui";

const StatusModal = (data) => {
  const { title, description, statusModalShow, setStatusModalShow } = data;
  return (
    <Modal
      visible={statusModalShow}
      title={title}
      onClose={() => {
        setStatusModalShow(false);
      }}
      verticalActions
      description={description}
    >
      <Box p={6}>
        <Button
          onClick={() => {
            setStatusModalShow(false);
          }}
          fullWidth
        >
          Xác nhận
        </Button>
      </Box>
    </Modal>
  );
};

export default StatusModal;
