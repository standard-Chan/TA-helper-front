import styled from "styled-components";
import { useState } from "react";
import type { Staff } from "../../types/types";
import StaffList from "./StaffList";
import StaffFormModal from "./StaffFormModal";

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
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CenterButton = styled.button`
  display: block;
  margin: 1.2rem auto 0;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface Props {
  onClose: () => void;
}

export default function StaffPopup({ onClose }: Props) {
  const [editing, setEditing] = useState<Partial<Staff> | null>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "staff-overlay") {
      onClose();
    }
  };

  return (
    <Overlay id="staff-overlay" onClick={handleOverlayClick}>
      <PopupContainer>
        <Title>👩‍🏫 조교 목록</Title>
        <StaffList onEdit={setEditing} />
        <CenterButton onClick={() => setEditing({})}>+ 조교 생성</CenterButton>
        {editing && (
          <StaffFormModal initialData={editing} onClose={() => setEditing(null)} />
        )}
      </PopupContainer>
    </Overlay>
  );
}
