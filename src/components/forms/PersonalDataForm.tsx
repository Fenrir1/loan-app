import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { PhoneInputComponent } from '../PhoneInput/PhoneInput';
import { useAppContext } from '../../context/AppContext';
import { validatePersonalData } from '../../utils/validation';
import { ValidationErrors } from '../../types';

const PersonalDataForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL_DATA',
      payload: { [field]: value }
    });
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL_DATA',
      payload: { phone: value }
    });
    
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validatePersonalData(state.personalData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    navigate('/address-work');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Личные данные</h3>
            </div>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Телефон *</Form.Label>
                  <PhoneInputComponent
                    value={state.personalData.phone}
                    onChange={handlePhoneChange}
                    error={errors.phone}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback d-block">
                      {errors.phone}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Имя *</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.personalData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    isInvalid={!!errors.firstName}
                    placeholder="Введите ваше имя"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Фамилия *</Form.Label>
                  <Form.Control
                    type="text"
                    value={state.personalData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    isInvalid={!!errors.lastName}
                    placeholder="Введите вашу фамилию"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Пол *</Form.Label>
                  <Form.Select
                    value={state.personalData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    isInvalid={!!errors.gender}
                  >
                    <option value="">Выберите пол</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>

                {Object.keys(errors).length > 0 && (
                  <Alert variant="danger">
                    Пожалуйста, исправьте ошибки в форме
                  </Alert>
                )}

                <div className="d-grid">
                  <Button variant="primary" type="submit">
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

export default PersonalDataForm;
