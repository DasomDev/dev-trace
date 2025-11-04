export interface Project {
  id: number;
  name: string;
  logs?: Log[]; // 선택적으로 프로젝트 안에 포함
}

export interface Log {
  id: string;
  projectId: number; // Project와 연결
  authorId: string;
  timestamp: string;
  content: string;
}