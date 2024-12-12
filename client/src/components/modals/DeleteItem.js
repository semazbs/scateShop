import React from "react";
import { Modal, Button} from "react-bootstrap";

const DeleteItem = ({show, onHide, onDelete}) => {

  return (
    <Modal
    show={show}
    onHide={onHide}
    size="md"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Удаление товара
      </Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button  onClick={onHide}>Отмена</Button>
      <Button  onClick={onDelete}>Удалить</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default DeleteItem;