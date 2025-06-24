// src/components/RegularClass/RegularClassCard.tsx
import styled from "styled-components";
import type { RegularClass } from "../../types/types";

interface Props {
  cls: RegularClass;
  onEdit: () => void;
  onDelete: () => void;
}

const Card = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Title = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.25rem;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.3rem;
`;

const IconBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 0.85rem;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;

export default function RegularClassCard({ cls, onEdit, onDelete }: Props) {
  return (
    <Card>
      <ButtonGroup>
        <IconBtn onClick={onEdit}>✏️</IconBtn>
        <IconBtn onClick={onDelete}>🗑️</IconBtn>
      </ButtonGroup>
      <Title>{cls.academyName} - {cls.classTypeName}</Title>
      <Info>🗓️ {cls.days}</Info>
      <Info>🕒 {cls.startTime} ~ {cls.endTime}</Info>
    </Card>
  );
}
