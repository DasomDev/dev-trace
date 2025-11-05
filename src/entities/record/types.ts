export interface DevRecord {
  id: string;
  featureName: string;
  relatedFiles: string[];
  intent: string;
  errorCases: string;
  dependencies: string;
  testCriteria: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  tags: string[];
  history?: DevRecordHistory[];
}

export interface DevRecordFormData {
  featureName: string;
  relatedFiles: string[];
  intent: string;
  errorCases: string;
  dependencies: string;
  testCriteria: string;
  author: string;
  tags: string[];
}

export interface DevRecordHistory {
  version: number;
  changedBy: string;
  changedAt: string;
  changes: string;
  reason?: string;
}
