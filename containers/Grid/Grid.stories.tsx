import React from "react";
import { storiesOf } from "@storybook/react";
import { Container, Row, Col } from "./Grid";

storiesOf("Containers/Layout", module)
  .add("All Equal Width", () => {
    return (
      <Container style={{ textAlign: "center" }}>
        <Row debug>
          <Col debug>1 of 2</Col>
          <Col debug>2 of 2</Col>
        </Row>
        <br />
        <Row debug>
          <Col debug>1 of 3</Col>
          <Col debug>2 of 3</Col>
          <Col debug>3 of 3</Col>
        </Row>
      </Container>
    );
  })
  .add("Specific Width", () => {
    return (
      <Container style={{ textAlign: "center" }}>
        <Row debug>
          <Col debug md={4}>
            md=4
          </Col>
          <Col debug md={4}>
            md=4
          </Col>
        </Row>
        <br />
        <Row debug>
          <Col debug md={6}>
            md=6
          </Col>
        </Row>
      </Container>
    );
  })
  .add("Stacked to horizontal", () => {
    return (
      <Container style={{ textAlign: "center" }}>
        <Row debug>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
          <Col debug md={1}>
            md=1
          </Col>
        </Row>
        <br />

        <Row debug>
          <Col debug md={8}>
            md=8
          </Col>
          <Col debug md={4}>
            Col=4
          </Col>
        </Row>
        <br />
        <Row debug>
          <Col debug md={6}>
            md=6
          </Col>
          <Col debug md={6}>
            md=6
          </Col>
        </Row>
      </Container>
    );
  })
  .add("Mix and Match", () => {
    return (
      <Container>
        <Row debug>
          <Col debug xs={12} md={8}>
            xs=12 md=8
          </Col>
          <Col debug xs={6} md={4}>
            xs=6 md=4
          </Col>
        </Row>
        <br />
        <Row debug>
          <Col debug xs={6} md={4}>
            xs=6 md=4
          </Col>
          <Col debug xs={6} md={4}>
            xs=6 md=4
          </Col>
          <Col debug xs={6} md={4}>
            xs=6 md=4
          </Col>
        </Row>
        <br />
        <Row debug>
          <Col debug xs={6}>
            xs=6
          </Col>
          <Col debug xs={6}>
            xs=6
          </Col>
        </Row>
      </Container>
    );
  })
  .add("Column wrapping", () => {
    return (
      <Container>
        <Row debug>
          <Col debug xs={9}>
            xs=9
          </Col>
          <Col debug xs={4}>
            xs=4
            <br />
            Since 9 + 4 = 13 &gt; 12, this 4-column-wide Col gets wrapped onto a new line as one
            contiguous unit.
          </Col>
          <Col debug xs={6}>
            xs=6
            <br />
            Subsequent columns continue along the new line.
          </Col>
        </Row>
      </Container>
    );
  })
  .add("Horizontal alignment", () => {
    return (
      <Container>
        <Row debug style={{ justifyContent: "flex-start" }}>
          <Col debug xs={3}>
            1 of 3
          </Col>
          <Col debug xs={3}>
            2 of 3
          </Col>
          <Col debug xs={3}>
            3 of 3
          </Col>
        </Row>
        <br />
        <Row debug style={{ justifyContent: "center" }}>
          <Col debug xs={3}>
            1 of 3
          </Col>
          <Col debug xs={3}>
            2 of 3
          </Col>
          <Col debug xs={3}>
            3 of 3
          </Col>
        </Row>
        <br />
        <Row debug style={{ justifyContent: "flex-end" }}>
          <Col debug xs={3}>
            1 of 3
          </Col>
          <Col debug xs={3}>
            2 of 3
          </Col>
          <Col debug xs={3}>
            3 of 3
          </Col>
        </Row>
        <br />
        <Row debug style={{ justifyContent: "space-between" }}>
          <Col debug xs={3}>
            1 of 3
          </Col>
          <Col debug xs={3}>
            2 of 3
          </Col>
          <Col debug xs={3}>
            3 of 3
          </Col>
        </Row>
        <br />
        <Row debug style={{ justifyContent: "space-around" }}>
          <Col debug xs={3}>
            1 of 3
          </Col>
          <Col debug xs={3}>
            2 of 3
          </Col>
          <Col debug xs={3}>
            3 of 3
          </Col>
        </Row>
        <br />
        <Row debug style={{ justifyContent: "initial" }}>
          <Col debug xs={3}>
            1 of 3
          </Col>
          <Col debug xs={3}>
            2 of 3
          </Col>
          <Col debug xs={3}>
            3 of 3
          </Col>
        </Row>
        <br />
        <Row debug style={{ justifyContent: "inherit" }}>
          <Col debug xs={3}>
            1 of 3
          </Col>
          <Col debug xs={3}>
            2 of 3
          </Col>
          <Col debug xs={3}>
            3 of 3
          </Col>
        </Row>
      </Container>
    );
  })
  .add("Vertical alignment", () => {
    return (
      <Container>
        <Row debug style={{ height: "75px", alignItems: "flex-start" }}>
          <Col debug>1 of 3</Col>
          <Col debug>2 of 3</Col>
          <Col debug>3 of 3</Col>
        </Row>
        <br />
        <Row debug style={{ height: "75px", alignItems: "center" }}>
          <Col debug>1 of 3</Col>
          <Col debug>2 of 3</Col>
          <Col debug>3 of 3</Col>
        </Row>
        <br />
        <Row debug style={{ height: "75px", alignItems: "flex-end" }}>
          <Col debug>1 of 3</Col>
          <Col debug>2 of 3</Col>
          <Col debug>3 of 3</Col>
        </Row>
        <br />
        <Row debug style={{ height: "75px", alignItems: "stretch" }}>
          <Col debug>1 of 3</Col>
          <Col debug>2 of 3</Col>
          <Col debug>3 of 3</Col>
        </Row>
      </Container>
    );
  });
