import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

interface ProfileFormData {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
  };

  return (
    <ProfileContainer>
      <h1>Profile Settings</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>
        <Button type="submit">Save Changes</Button>
      </Form>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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
  padding: 0.75rem 1.5rem;
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
