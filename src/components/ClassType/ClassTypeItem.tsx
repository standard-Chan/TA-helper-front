import styled from "styled-components";
import type { ClassType } from "../../types/types";

interface Props {
  data: ClassType;
  onEdit: (data: ClassType) => void;
  onDelete: (id: number) => void;
}

const Card = styled.div`
  background: #f9f9f9;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
`;

const SubInfo = styled.div`
  font-size: 0.9rem;
  margin-top: 0.3rem;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default function ClassTypeItem({ data, onEdit, onDelete }: Props) {
  return (
    <Card>
      <TopRow>
        <Title>{data.name}</Title>
        <ButtonGroup>
          <Button bg="#6c757d" onClick={() => onEdit(data)}>수정</Button>
          <Button bg="#dc3545" onClick={() => onDelete(data.id)}>삭제</Button>
        </ButtonGroup>
      </TopRow>

      <SubInfo>교재: {data.book}</SubInfo>
      <SubInfo>테스트: {data.test}</SubInfo>
      <SubInfo>과제: {data.homework}</SubInfo>
    </Card>
  );
}
