import styled from "styled-components";
import type { Academy } from "../../types/types";

interface Props {
  academy: Academy;
  onEdit: (academy: Academy) => void;
  onDelete: (id: number) => void;
}

const Card = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const EditButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export default function AcademyItem({ academy, onEdit, onDelete }: Props) {
  return (
    <Card>
      <Title>{academy.name}</Title>
      <Info>주소: {academy.address}</Info>
      <Info>전화번호: {academy.tel}</Info>
      <ButtonGroup>
        <EditButton onClick={() => onEdit(academy)}>수정</EditButton>
        <DeleteButton onClick={() => onDelete(academy.id)}>삭제</DeleteButton>
      </ButtonGroup>
    </Card>
  );
}
