// components/ShortcutButton.tsx
import styled from "styled-components";

interface Props {
  label: string;
  onClick: () => void;
}

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #17a2b8;
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #138496;
  }

  &:active {
    background-color: #117a8b;
  }
`;

export default function ShortcutButton({ label, onClick }: Props) {
  return <Button onClick={onClick}>{label}</Button>;
}
