import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../const/api";
import ClassSelector from "../WeeklyRecord/ClassSelector";

interface Props {
  notice: {
    id: number;
    content: string;
    classId: number;
    weekNo: number;
  };
  onClose: () => void;
  onUpdated: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 520px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  flex-direction: column;
  align-items: center; // ✅ 가운데 정렬
  gap: 1.2rem; // 요소 간 간격 추가
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const Field = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 30%;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  background: #007acc;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #005fa3;
  }
`;

const Textarea = styled.textarea`
  width: 90%;
  min-height: 120px;
  resize: vertical;
  padding: 12px 14px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fdfdfd;
  color: #333;
  line-height: 1.4;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #007acc;
    box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.15);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ButtonRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export default function NoticePopup({ notice, onClose, onUpdated }: Props) {
  const popupRef = useRef(null);
  const [form, setForm] = useState({
    content: notice.content,
    classId: notice.classId,
    weekNo: notice.weekNo,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !(popupRef.current as HTMLElement).contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const isNew = notice.id === -1;

  return (
    <Overlay>
      <Popup ref={popupRef}>
        <Title>{isNew ? "📢 새로운 공지사항 작성" : "📢 공지사항 수정"}</Title>

        <Field>
          <Label>공지 내용</Label>
          <Textarea
            rows={5}
            value={form.content}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, content: e.target.value })}
          />
        </Field>

        <Field>
          <Label>주차</Label>
          <Input
            type="number"
            value={form.weekNo}
            min={1}
            onChange={(e : React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, weekNo: Number(e.target.value) })
            }
          />
        </Field>

        <Field>
          <ClassSelector
            selectedId={form.classId}
            onSelect={(id) => setForm({ ...form, classId: id })}
          />
        </Field>

        <ButtonRow>
          <Button type="button" onClick={onClose}>
            닫기
          </Button>
          <Button
            type="button"
            onClick={async () => {
              try {
                if (isNew) {
                  await axios.post(API.NOTICES, form, {
                    withCredentials: true,
                  });
                } else {
                  await axios.put(`${API.NOTICES}/${notice.id}`, form, {
                    withCredentials: true,
                  });
                }
                onUpdated();
                onClose();
              } catch (e) {
                alert(isNew ? "생성 실패" : "수정 실패");
              }
            }}
          >
            {isNew ? "등록" : "수정"}
          </Button>
        </ButtonRow>
      </Popup>
    </Overlay>
  );
}
