import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MOCK_USER } from "../context/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Handles the form submission for the login form
  const onSubmit = async (data: LoginFormData) => {
    setSubmitError("");
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      setSubmitError("Invalid credentials");
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Login</Title>
        <InfoCard>
          <p>
            Use <Highlighted>{MOCK_USER.email}</Highlighted> with password{" "}
            <Highlighted>{MOCK_USER.password}</Highlighted>
          </p>
        </InfoCard>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormGroup>

        {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--bg-primary);
`;

const Form = styled.form`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const InfoCard = styled.div`
  background: var(--card-bg);
  padding: 0.2rem;
  color: var(--text-primary);
  border-left: 4px solid var(--primary-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

const Highlighted = styled.span`
  font-weight: bold;
  color: var(--primary-color);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--input-bg);
  color: var(--text-primary);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--primary-hover);
  }
`;

const ErrorMessage = styled.p`
  color: var(--error-color);
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;
