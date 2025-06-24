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

export interface Staff {
  id: number;
  name: string;
  userId: string;
  phoneNumber: string;
  role: 'ADMIN' | 'STAFF';
}

export interface Role {
  role: 'ADMIN' | 'STAFF';
}

export interface Student {
  id: number;
  name: string;
  classId: number;
  school: string;
  parentPhoneNumber: string;
  phoneNumber: string;
  email: string;
  age: number;
}



export interface RegularClass {
  id: number;
  academyId: number;
  academyName: string;
  classTypeId: number;
  classTypeName: string;
  days: string;
  startTime: string;
  endTime: string;
}