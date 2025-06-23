import styled from "styled-components";
import type { Academy } from "../../types/types";
import { useState } from "react";
import axios from "axios";
import { API } from "../../const/api";

interface Props {
  initialData: Partial<Academy>;
  onCloseForm: () => void;
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.6rem 0.8rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function AcademyForm({ initialData, onCloseForm }: Props) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    address: initialData.address || "",
    tel: initialData.tel || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.address || !form.tel) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      if (initialData.id) {
        await axios.put(`${API.ACADEMY}/${initialData.id}`, form, { withCredentials: true });
        alert("수정 완료");
      } else {
        await axios.post(API.ACADEMY, form, { withCredentials: true });
        alert("생성 완료");
      }
      onCloseForm();
    } catch (err) {
      alert("저장 실패");
    }
  };

  return (
    <FormWrapper>
      <FormGroup>
        <Label htmlFor="name">학원 이름</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="예: 메가스터디"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="address">주소</Label>
        <Input
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="서울특별시 ..."
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="tel">전화번호</Label>
        <Input
          id="tel"
          name="tel"
          value={form.tel}
          onChange={handleChange}
          placeholder="02-1234-5678"
        />
      </FormGroup>

      <ButtonGroup>
        <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
        <CancelButton onClick={onCloseForm}>취소</CancelButton>
      </ButtonGroup>
    </FormWrapper>
  );
}
