import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useAppContext } from "../../context/AppContext";
import { validateAddressAndWork } from "../../utils/validation";
import { ValidationErrors, ProductCategory } from "../../types";
import { useProductCategories } from "../../hooks/useApi";

const AddressWorkForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const {
    data: categories = [] as ProductCategory[],
    isLoading: loading,
    error: queryError,
    refetch,
  } = useProductCategories();

  const handleInputChange = (field: string, value: string) => {
    dispatch({
      type: "UPDATE_ADDRESS_AND_WORK",
      payload: { [field]: value },
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateAddressAndWork(state.addressAndWork);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    navigate("/loan-parameters");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Адрес и место работы</h3>
            </div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Место работы *</Form.Label>
                  {loading ? (
                    <div className="d-flex align-items-center">
                      <Spinner animation="border" size="sm" className="me-2" />
                      <span>Загрузка категорий...</span>
                    </div>
                  ) : (
                    <Form.Select
                      value={state.addressAndWork.workplace}
                      onChange={(e) =>
                        handleInputChange("workplace", e.target.value)
                      }
                      isInvalid={!!errors.workplace}
                    >
                      <option value="">Выберите место работы</option>
                      {Array.isArray(categories) &&
                        categories.map((category: ProductCategory) => (
                          <option key={category.slug} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                    </Form.Select>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.workplace}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Адрес проживания *</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.addressAndWork.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    isInvalid={!!errors.address}
                    placeholder="Введите ваш адрес"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                {queryError && (
                  <Alert variant="danger">
                    {queryError.message ||
                      "Не удалось загрузить список категорий"}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => refetch()}
                    >
                      Повторить
                    </Button>
                  </Alert>
                )}

                {Object.keys(errors).length > 0 && (
                  <Alert variant="danger">
                    Пожалуйста, исправьте ошибки в форме
                  </Alert>
                )}

                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                  <Button variant="secondary" onClick={handleBack}>
                    Назад
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    Далее
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

export default AddressWorkForm;
