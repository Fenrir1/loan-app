import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import ResultModal from "./ResultModal";

const ResultPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [state, navigate]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleStartOver = () => {
    dispatch({ type: "RESET_FORM" });
    navigate("/");
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md="auto">
            <Card className="text-center p-4">
              <Card.Body>
                <Spinner animation="border" className="mb-3" />
                <h5>Обработка заявки...</h5>
                <p className="text-muted">Пожалуйста, подождите</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="auto">
          <Alert variant="info" className="text-center">
            <h4>Заявка успешно отправлена!</h4>
            <Button variant="primary" onClick={handleStartOver}>
              Подать новую заявку
            </Button>
          </Alert>
        </Col>
      </Row>

      <ResultModal show={showModal} onHide={handleModalClose} />
    </Container>
  );
};

export default ResultPage;
