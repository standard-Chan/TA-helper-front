import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin: 8px 0;
`;

interface Props {
  label: string;
  onClick: () => void;
}

export default function ShortcutButton({ label, onClick }: Props) {
  return <Button onClick={onClick}>{label}</Button>;
}
