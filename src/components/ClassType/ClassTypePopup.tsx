import styled from "styled-components";
import { useState } from "react";
import type { ClassType } from "../../types/types";
import ClassTypeFormModal from "./ClassTypeFormModal";
import ClassTypeList from "./ClassTypeList";

interface Props {
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  max-height: 90vh;
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  transform: translate(-50%, -50%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function ClassTypePopup({ onClose }: Props) {
  const [editing, setEditing] = useState<Partial<ClassType> | null>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "class-type-overlay") {
      onClose();
    }
  };

  return (
    <Overlay id="class-type-overlay" onClick={handleOverlayClick}>
      <PopupContainer>
        <Title>📘 수업 유형 목록</Title>
        <ClassTypeList onEdit={setEditing} />
        <ButtonWrapper>
          <StyledButton
            onClick={() =>
              setEditing({ name: "", book: "", test: "", homework: "" })
            }
          >
            + 수업 유형 생성
          </StyledButton>
        </ButtonWrapper>
      </PopupContainer>

      {editing && (
        <ClassTypeFormModal
          initialData={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </Overlay>
  );
}
