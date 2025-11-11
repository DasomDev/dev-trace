export interface DevTask {
  id: string
  featureName: string
  relatedFiles: string[]
  intent: string
  errorCases: string
  dependencies: string
  testCriteria: string
  author: string
  createdAt: string
  updatedAt: string
  version: number
  tags: string[]
  history?: DevTaskHistory[]
}

export interface DevTaskFormData {
  featureName: string
  relatedFiles: string[]
  intent: string
  errorCases: string
  dependencies: string
  testCriteria: string
  author: string
  tags: string[]
}

export interface DevTaskHistory {
  version: number
  changedBy: string
  changedAt: string
  changes: string
  reason?: string
}

