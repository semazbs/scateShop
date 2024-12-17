import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import { Container } from "react-bootstrap";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Container>
      <ListGroup horizontal>
        {device.types.map((type) => (
          <ListGroup.Item
            style={{ cursor: "pointer" }}
            active={type.id === device.selectedType.id}
            onClick={() => device.setSelectedType(type)}
            key={type.id}
            className="rounded-pill px-3 mx-1"
            variant={type.id === device.selectedType.id ? "danger" : "light"}
          >
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
});

export default TypeBar;
