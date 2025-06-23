import styled from "styled-components";
import type { Staff } from "../../types/types";

interface Props {
  staff: Staff;
  onEdit: (staff: Staff) => void;
  onDelete: (id: number) => void;
}

const Card = styled.div`
  background: #f9f9f9;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Info = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button<{ bg: string }>`
  height: 2rem;
  background-color: ${({ bg }) => bg};
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default function StaffItem({ staff, onEdit, onDelete }: Props) {
  return (
    <Card>
      <InfoGroup>
        <Name>{staff.name} ({staff.role})</Name>
        <Info>ID: {staff.userId}</Info>
        <Info>📞 {staff.phoneNumber}</Info>
      </InfoGroup>
      <ButtonGroup>
        <Button bg="#6c757d" onClick={() => onEdit(staff)}>수정</Button>
        <Button bg="#dc3545" onClick={() => onDelete(staff.id)}>삭제</Button>
      </ButtonGroup>
    </Card>
  );
}
