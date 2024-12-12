import React, { useContext } from "react";
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { deleteItem, getItems } from "../http/deviceAPI";
import { toast } from "react-toastify";

const DeviceItem = ({ device }) => {
  const { device: deviceStore } = useContext(Context);
  const history = useNavigate();

  const handleDelete = (id) => {
    deleteItem(id)
    
        .then(() => {
            /// Уведомление об успешном удалении
            toast.success("Товар успешно удален!", {
                position: "top-right",
                autoClose: 3000, // Автоматическое закрытие через 3 секунды
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Обновление списка устройств
            getItems(null, null, 1, 100).then((data) => {
                deviceStore.setDevices(data.rows);
                deviceStore.setTotalCount(data.count);
            });
        })
        .catch(() => {
            // Уведомление об ошибке
            toast.error("Не удалось удалить товар. Попробуйте снова.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
};


  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => history(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>Samsung...</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
          </div>
        </div>
        <div>{device.name}</div>
        {/*user.role === 'ADMIN' && */(
          <Button
            onClick={(e) => {
              e.stopPropagation(); // предотвращает вызов события onClick на Col
              handleDelete(device.id);
            }}
            className="m-1"
            size="sm"
          >
            Удалить
          </Button>
        )}
      </Card>
    </Col>
  );
};

export default DeviceItem;
