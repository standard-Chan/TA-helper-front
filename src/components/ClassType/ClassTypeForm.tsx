import { useState } from "react";
import axios from "axios";
import { API } from "../../const/api";
import type { ClassType } from "../../types/types";
import styled from "styled-components";

interface Props {
  initialData: Partial<ClassType>;
  onCloseForm: () => void;
}

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button<{ color?: string }>`
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: ${({ color }) => color || "#007bff"};
  cursor: pointer;

  &:hover {
    background-color: ${({ color }) =>
      color === "#6c757d" ? "#5a6268" : color === "#dc3545" ? "#c82333" : "#0056b3"};
  }
`;

export default function ClassTypeForm({ initialData, onCloseForm }: Props) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    book: initialData.book || "",
    test: initialData.test || "",
    homework: initialData.homework || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, book, test, homework } = form;
    if (!name || !book || !test || !homework) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      if (initialData.id) {
        await axios.put(`${API.CLASS_TYPE}/${initialData.id}`, form, { withCredentials: true });
        alert("수정 완료");
      } else {
        await axios.post(API.CLASS_TYPE, form, { withCredentials: true });
        alert("생성 완료");
      }
      onCloseForm();
    } catch (err) {
      alert("저장 실패");
    }
  };

  return (
    <FormContainer>
      <Field>
        <Label htmlFor="name">수업 유형 이름</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="예: 심화반"
        />
      </Field>

      <Field>
        <Label htmlFor="book">사용 교재</Label>
        <Input
          id="book"
          name="book"
          value={form.book}
          onChange={handleChange}
          placeholder="예: 심화 문제집"
        />
      </Field>

      <Field>
        <Label htmlFor="test">테스트</Label>
        <Input
          id="test"
          name="test"
          value={form.test}
          onChange={handleChange}
          placeholder="예: 월간 테스트"
        />
      </Field>

      <Field>
        <Label htmlFor="homework">과제</Label>
        <Input
          id="homework"
          name="homework"
          value={form.homework}
          onChange={handleChange}
          placeholder="예: 심화 과제 제출"
        />
      </Field>

      <ButtonRow>
        <Button onClick={handleSubmit}>저장</Button>
        <Button onClick={onCloseForm} color="#6c757d">취소</Button>
      </ButtonRow>
    </FormContainer>
  );
}
