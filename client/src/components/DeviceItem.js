import React, { useContext } from "react";
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import {deleteItem, getItems } from "../http/deviceAPI";

if (Notification.permission === "default") {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Уведомления разрешены пользователем");
    } else {
      console.log("Уведомления запрещены пользователем");
    }
  });
}


const DeviceItem = ({ device }) => {
  const { device: deviceStore } = useContext(Context);
  const history = useNavigate();

  // const handleDelete = (id) => {
  //   deleteItem(id)
  //     (() => {
  //       // Обновление списка товаров
  //       getItems(null, null, 1, 100).then((data) => {
  //         deviceStore.setDevices(data.rows);
  //         deviceStore.setTotalCount(data.count);
  //       });
  //     });
  // };

  const handleDelete = (id) => {
    deleteItem(id)
      .then(() => {
        // Создание уведомления
        if (Notification.permission === "granted") {
          new Notification("Успех", {
            body: "Товар успешно удален!",
            // icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png", // Иконка для уведомления
          });
        }
  
        // Обновление списка товаров
        getItems(null, null, 1, 100).then((data) => {
          deviceStore.setDevices(data.rows);
          deviceStore.setTotalCount(data.count);
        });
      })
      .catch(() => {
        // Обработка ошибки
        console.error("Не удалось удалить товар.");
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
