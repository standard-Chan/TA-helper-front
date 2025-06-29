import { useState } from "react";
import styled from "styled-components";
import ClassSelector from "../WeeklyRecord/ClassSelector";

interface Props {
  initial?: {
    classId: number;
    content: string;
    weekNo: number;
  };
  onSubmit: (form: { classId: number; content: string; weekNo: number }) => void;
  submitLabel: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 500px;
  padding: 1.5rem;
  background-color: #fafafa;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 1rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #005fa3;
  }
`;

export default function NoticeForm({ initial, onSubmit, submitLabel }: Props) {
  const [classId, setClassId] = useState(initial?.classId || 1);
  const [content, setContent] = useState(initial?.content || "");
  const [weekNo, setWeekNo] = useState(initial?.weekNo || 1);

  return (
    <Form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ classId, content, weekNo });
      }}
    >
      <Field>
        <ClassSelector selectedId={classId} onSelect={setClassId} />
      </Field>

      <Field>
        <Label>주차</Label>
        <Input
          type="number"
          value={weekNo}
          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setWeekNo(Number(e.target.value))}
          min={1}
        />
      </Field>

      <Field>
        <Label>공지 내용</Label>
        <Textarea
          rows={5}
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        />
      </Field>

      <SubmitButton type="submit">{submitLabel}</SubmitButton>
    </Form>
  );
}
