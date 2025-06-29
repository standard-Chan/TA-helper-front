import styled from "styled-components";
import { useState } from "react";
import type { Student } from "../../types/types";
import axios from "axios";
import { API } from "../../const/api";
import ClassSelectPopup from "../RegularClass/ClassSelectPopup";

interface Props {
  initialData: Partial<Student>;
  onClose: () => void;
  onUpdated: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  transform: translate(-50%, -50%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 0.55rem 0.75rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:read-only {
    cursor: pointer;
    background: #f1f1f1;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  background: #007bff;
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

export default function StudentFormModal({ initialData, onClose, onUpdated }: Props) {
  const [form, setForm] = useState<Partial<Student>>(initialData);
  const [showClassPopup, setShowClassPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (form.id) {
        await axios.put(`${API.STUDENTS}/${form.id}`, form, { withCredentials: true });
      } else {
        await axios.post(API.STUDENTS, form, { withCredentials: true });
      }
      onUpdated();
      onClose();
    } catch (err) {
      alert("저장 실패");
      console.error(err);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <Title>👨‍🎓 학생 정보 입력</Title>
        <FormGrid>
          <FormGroup>
            <Label>이름</Label>
            <Input name="name" value={form.name || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>수업 ID</Label>
            <Input
              name="classId"
              value={form.classId ?? ""}
              readOnly
              onClick={() => setShowClassPopup(true)}
            />
          </FormGroup>
          <FormGroup>
            <Label>학교</Label>
            <Input name="school" value={form.school || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>학생 전화번호</Label>
            <Input name="phoneNumber" value={form.phoneNumber || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>보호자 전화번호</Label>
            <Input name="parentPhoneNumber" value={form.parentPhoneNumber || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>이메일</Label>
            <Input name="email" value={form.email || ""} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>나이</Label>
            <Input name="age" value={form.age ?? ""} onChange={handleChange} />
          </FormGroup>
        </FormGrid>

        <ButtonWrapper>
          <SaveButton onClick={handleSubmit}>저장</SaveButton>
        </ButtonWrapper>
      </ModalContainer>

      {showClassPopup && (
        <ClassSelectPopup
          onSelect={(id) => {
            setForm({ ...form, classId: id });
            setShowClassPopup(false);
          }}
          onClose={() => setShowClassPopup(false)}
        />
      )}
    </ModalOverlay>
  );
}
