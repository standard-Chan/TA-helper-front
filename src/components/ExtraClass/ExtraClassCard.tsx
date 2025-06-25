import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../const/api";
import type { ExtraClass } from "../../types/types";
import ExtraClassFormPopup from "./ExtraClassFormPopup";
import ExtraClassWeekSelectorPopup from "./ExtraClassWeekSelectorPopup";

interface Props {
  extraClass: ExtraClass;
  onRefresh: () => void;
}

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #f2f2f2;

  &:hover {
    background-color: #ddd;
  }
`;

function ExtraClassCard({ extraClass, onRefresh }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isWeekPopupOpen, setIsWeekPopupOpen] = useState(false);

  const handleDelete = async () => {
    await axios.delete(`${API.EXTRA_CLASSES}/${extraClass.id}`, { withCredentials: true });
    onRefresh();
  };

  return (
    <>
      <Card onClick={() => setIsWeekPopupOpen(true)}>
        <Info>
          <span><b>학원:</b> {extraClass.academyName}</span>
          <span><b>조교:</b> {extraClass.staffName}</span>
          <span><b>시간:</b> {extraClass.startTime} ~ {extraClass.endTime}</span>
        </Info>
        <Actions onClick={(e) => e.stopPropagation()}>
          <ActionButton onClick={() => setIsEditOpen(true)}>✏️</ActionButton>
          <ActionButton onClick={handleDelete}>❌</ActionButton>
        </Actions>
      </Card>

      {isEditOpen && (
        <ExtraClassFormPopup
          onClose={() => setIsEditOpen(false)}
          onRefresh={onRefresh}
          initialData={extraClass}
        />
      )}

      {isWeekPopupOpen && (
        <ExtraClassWeekSelectorPopup
          extraClassId={extraClass.id}
          onClose={() => setIsWeekPopupOpen(false)}
        />
      )}
    </>
  );
}

export default ExtraClassCard;
