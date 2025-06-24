// components/CreateButton.tsx
import styled from "styled-components";

interface Props {
  label: string;
  onClick: () => void;
}

const Button = styled.button`
  width: 50%;
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }

  &:active {
    background-color: #1e7e34;
  }
`;

export default function CreateButton({ label, onClick }: Props) {
  return <Button onClick={onClick}>{label}</Button>;
}
