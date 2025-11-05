export interface Project {
  id?: string; // Firestore autoId
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Log {
  id: string;
  projectId: number; // Project와 연결
  authorId: string;
  timestamp: string;
  content: string;
}