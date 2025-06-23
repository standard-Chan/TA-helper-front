export interface Academy {
  id: number;
  name: string;
  address: string;
  tel: string;
}

export interface ClassType {
  id: number;
  name: string;
  book: string;
  test: string;
  homework: string;
}

export interface Notice {
  id: number;
  content: string;
  classId: number;
  createdAt: string;
  weekNo: number;
  academyName: string;
  classTypeName: string;
  days: string;
}