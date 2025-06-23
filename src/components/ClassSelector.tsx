import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API } from "../const/api";

interface Props {
  selectedId: number;
  onSelect: (id: number) => void;
}

interface ClassItem {
  id: number;
  academyName: string;
  classTypeName: string;
  days: string;
}

const Container = styled.div`
  margin: 1.5rem 0;
`;

const Title = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 180px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
`;

const ListItem = styled.li<{ selected: boolean }>`
  padding: 12px 16px;
  font-size: 0.95rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#f0f8ff" : "white")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  color: ${({ selected }) => (selected ? "#007acc" : "#333")};

  &:hover {
    background-color: #f5f5f5;
  }

  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export default function ClassSelector({ selectedId, onSelect }: Props) {
  const [classList, setClassList] = useState<ClassItem[]>([]);

  useEffect(() => {
    axios
      .get(API.CLASSES, { withCredentials: true })
      .then((res) => setClassList(res.data))
      .catch(() => alert("수업 목록 불러오기 실패"));
  }, []);

  return (
    <Container>
      <Title>수업 선택</Title>
      <List>
        {classList.map((cls) => (
          <ListItem
            key={cls.id}
            selected={cls.id === selectedId}
            onClick={() => onSelect(cls.id)}
          >
            {cls.academyName} - {cls.classTypeName} ({cls.days})
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
