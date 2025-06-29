import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../const/api";

interface ClassResponse {
  id: number;
  academyName: string;
  classTypeName: string;
  days: string;
  startTime: string;
  endTime: string;
}

interface Props {
  onSelect: (id: number) => void;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  max-height: 80vh;
  background: white;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  transform: translate(-50%, -50%);
  overflow-y: auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: none;
  border: none;
  font-size: 2.25rem;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const ClassItem = styled.div`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;

export default function ClassSelectPopup({ onSelect, onClose }: Props) {
  const [classes, setClasses] = useState<ClassResponse[]>([]);

  useEffect(() => {
    axios
      .get(API.CLASSES, { withCredentials: true })
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("수업 목록 불러오기 실패", err));
  }, []);

  return (
    <Overlay onClick={onClose}>
      <Popup onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>📘 수업 목록</Title>
        {classes.length === 0 ? (
          <div>등록된 수업이 없습니다.</div>
        ) : (
          classes.map((cls) => (
            <ClassItem key={cls.id} onClick={() => onSelect(cls.id)}>
              <div>
                <strong>{cls.academyName}</strong> - {cls.classTypeName}
              </div>
              <div>
                {cls.days} | {cls.startTime} ~ {cls.endTime}
              </div>
            </ClassItem>
          ))
        )}
      </Popup>
    </Overlay>
  );
}
