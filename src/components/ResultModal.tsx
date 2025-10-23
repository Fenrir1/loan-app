import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import { formatPhoneForDisplay } from "../utils/phoneUtils";

interface ResultModalProps {
  show: boolean;
  onHide: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ show, onHide }) => {
  const { state } = useAppContext();

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Результат заявки</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-4">
        <div className="mb-4">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "4rem" }}
          ></i>
        </div>
        <h4 className="text-success mb-3">
          Поздравляем, {state.personalData.lastName}{" "}
          {state.personalData.firstName}!
        </h4>
        <p className="lead">
          Вам одобрена <strong>${state.loanParameters.amount}</strong> на{" "}
          <strong>{state.loanParameters.term}</strong> дней.
        </p>
        <div className="mt-4">
          <h6>Детали заявки:</h6>
          <div className="row text-start">
            <div className="col-md-6">
              <p>
                <strong>Телефон:</strong>{" "}
                {formatPhoneForDisplay(state.personalData.phone)}
              </p>
              <p>
                <strong>Пол:</strong>{" "}
                {state.personalData.gender === "male" ? "Мужской" : "Женский"}
              </p>
              <p>
                <strong>Место работы:</strong> {state.addressAndWork.workplace}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Адрес:</strong> {state.addressAndWork.address}
              </p>
              <p>
                <strong>Сумма займа:</strong> ${state.loanParameters.amount}
              </p>
              <p>
                <strong>Срок займа:</strong> {state.loanParameters.term} дней
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={onHide}>
          ОК
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
