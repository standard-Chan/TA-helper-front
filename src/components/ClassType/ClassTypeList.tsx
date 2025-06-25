import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../const/api";
import type { ClassType } from "../../types/types";
import ClassTypeItem from "./ClassTypeItem";
import styled from "styled-components";
import axiosInstance from "../../util/axiosInstance";


interface Props {
  onEdit: (data: ClassType) => void;
}

const ScrollList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
`;

export default function ClassTypeList({ onEdit }: Props) {
  const [items, setItems] = useState<ClassType[]>([]);

  const fetchList = async () => {
    const res = await axiosInstance.get(API.CLASS_TYPE, { withCredentials: true });
    setItems(res.data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await axios.delete(`${API.CLASS_TYPE}/${id}`, { withCredentials: true });
    await fetchList();
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <ScrollList>
      {items.length === 0 ? (
        <div style={{ color: "#888" }}>등록된 수업 유형이 없습니다.</div>
      ) : (
        items.map((c) => (
          <ClassTypeItem key={c.id} data={c} onEdit={onEdit} onDelete={handleDelete} />
        ))
      )}
    </ScrollList>
  );
}
