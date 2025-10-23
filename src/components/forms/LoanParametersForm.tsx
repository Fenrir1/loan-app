import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";
import { validateLoanParameters } from "../../utils/validation";
import { ValidationErrors } from "../../types";
import { useSubmitLoanApplication } from "../../hooks/useApi";

const LoanParametersForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const submitMutation = useSubmitLoanApplication();

  const handleInputChange = (field: string, value: number) => {
    dispatch({
      type: "UPDATE_LOAN_PARAMETERS",
      payload: { [field]: value },
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoanParameters(state.loanParameters);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const title = `${state.personalData.firstName} ${state.personalData.lastName}`;

    submitMutation.mutate(title, {
      onSuccess: (response) => {
        if (response.success) {
          navigate("/result");
        }
      },
      onError: (error) => {
        console.error("Ошибка отправки заявки:", error);
      },
    });
  };

  const handleBack = () => {
    navigate("/address-work");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Параметры займа</h3>
            </div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>
                    Сумма займа: ${state.loanParameters.amount} *
                  </Form.Label>
                  <Form.Range
                    min="200"
                    max="1000"
                    step="100"
                    value={state.loanParameters.amount}
                    onChange={(e) =>
                      handleInputChange("amount", parseInt(e.target.value))
                    }
                    className="mb-2"
                  />
                  <div className="d-flex justify-content-between text-muted small">
                    <span>$200</span>
                    <span>$1000</span>
                  </div>
                  {errors.amount && (
                    <div className="text-danger small mt-1">
                      {errors.amount}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Срок займа: {state.loanParameters.term} дней *
                  </Form.Label>
                  <Form.Range
                    min="10"
                    max="30"
                    step="1"
                    value={state.loanParameters.term}
                    onChange={(e) =>
                      handleInputChange("term", parseInt(e.target.value))
                    }
                    className="mb-2"
                  />
                  <div className="d-flex justify-content-between text-muted small">
                    <span>10 дней</span>
                    <span>30 дней</span>
                  </div>
                  {errors.term && (
                    <div className="text-danger small mt-1">{errors.term}</div>
                  )}
                </Form.Group>

                {submitMutation.error && (
                  <Alert variant="danger">
                    {submitMutation.error.message ||
                      "Произошла ошибка при отправке заявки"}
                  </Alert>
                )}

                {Object.keys(errors).length > 0 && (
                  <Alert variant="danger">
                    Пожалуйста, исправьте ошибки в форме
                  </Alert>
                )}

                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                  <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={submitMutation.isPending}
                  >
                    Назад
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Отправка...
                      </>
                    ) : (
                      "Подать заявку"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanParametersForm;
