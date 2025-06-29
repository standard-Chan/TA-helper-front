import styled from "styled-components";
import ClassTypeForm from "./ClassTypeForm";
import type { ClassType } from "../../types/types";

interface Props {
  initialData: Partial<ClassType>;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1100;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
`;

export default function ClassTypeFormModal({ initialData, onClose }: Props) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <ClassTypeForm initialData={initialData} onCloseForm={onClose} />
      </ModalBox>
    </ModalOverlay>
  );
}
