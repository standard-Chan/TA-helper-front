import styled from "styled-components";
import type { Academy } from "../../types/types";
import { useState } from "react";
import axios from "axios";
import { API } from "../../const/api";

interface Props {
  initialData: Partial<Academy>;
  onCloseForm: () => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;
`;

const FormWrapper = styled.div`
  width: 480px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  padding: 0.6rem 0.9rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const BaseButton = styled.button`
  padding: 0.55rem 1.2rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const SubmitButton = styled(BaseButton)`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: #6c757d;
  color: white;

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
    <Overlay onClick={onCloseForm}>
      <FormWrapper onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>


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
          <CancelButton onClick={onCloseForm}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
        </ButtonGroup>
      </FormWrapper>
    </Overlay>
  );
}
