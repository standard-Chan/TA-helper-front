import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../const/api";
import type { Academy } from "../../types/types";

import styled from "styled-components";
import AcademyItem from "./AcademyItem";


interface Props {
  onEdit: (academy: Academy) => void;
}

const ScrollableList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px; /* 🔸 최대 높이 지정 */
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 6px;
  }
`;

export default function AcademyList({ onEdit }: Props) {
  const [academies, setAcademies] = useState<Academy[]>([]);

  const fetchAcademies = async () => {
    const res = await axios.get(API.ACADEMY, { withCredentials: true });
    setAcademies(res.data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await axios.delete(`${API.ACADEMY}/${id}`, { withCredentials: true });
    await fetchAcademies();
  };

  useEffect(() => {
    fetchAcademies();
  }, []);

  return (
    <ScrollableList>
      {academies.length === 0 ? (
        <div style={{ color: "#888" }}>등록된 학원이 없습니다.</div>
      ) : (
        academies.map((a) => (
          <AcademyItem key={a.id} academy={a} onEdit={onEdit} onDelete={handleDelete} />
        ))
      )}
    </ScrollableList>
  );
}