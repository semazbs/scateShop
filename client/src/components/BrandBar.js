import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Col, Container } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Container>
      <Row className="flex-nowrap overflow-auto">
        {device.brands.map((brand) => (
          <Col xs="auto" key={brand.id} className="p-1">
            <Card
              style={{ cursor: "pointer" }}
              border={brand.id === device.selectedBrand.id ? "danger" : "light"}
              onClick={() => device.setSelectedBrand(brand)}
              className="p-2 text-center rounded-pill"
            >
              {brand.name}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
});

export default BrandBar;
