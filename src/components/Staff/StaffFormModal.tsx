import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { API } from "../../const/api";
import type { Staff, Role } from "../../types/types";

interface Props {
  initialData: Partial<Staff>;
  onClose: () => void;
}

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`;

const FormBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 420px;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  background: #007bff;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default function StaffFormModal({ initialData, onClose }: Props) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    userId: initialData.userId || "",
    password: "",
    phoneNumber: initialData.phoneNumber || "",
    role: (initialData.role as Role) || "STAFF",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(API.STAFFS, form, { withCredentials: true });
      alert("조교 등록 완료");
      onClose();
    } catch (err) {
      alert("저장 실패");
    }
  };

  return (
    <Modal>
      <FormBox>
        <Field>
          <Label>이름</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </Field>
        <Field>
          <Label>아이디</Label>
          <Input name="userId" value={form.userId} onChange={handleChange} />
        </Field>
        <Field>
          <Label>비밀번호</Label>
          <Input name="password" type="password" value={form.password} onChange={handleChange} />
        </Field>
        <Field>
          <Label>전화번호</Label>
          <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
        </Field>
        <Field>
          <Label>역할</Label>
          <Select name="role" value={form.role} onChange={handleChange}>
            <option value="STAFF">STAFF</option>
            <option value="ADMIN">ADMIN</option>
          </Select>
        </Field>
        <Button onClick={handleSubmit}>저장</Button>
      </FormBox>
    </Modal>
  );
}
