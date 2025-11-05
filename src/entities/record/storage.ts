import type { DevRecord } from './types'

const STORAGE_KEY = 'dev-trace-records'

export const recordStorage = {
  getAll(): DevRecord[] {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    try {
      return JSON.parse(data)
    } catch {
      return []
    }
  },

  save(record: DevRecord): void {
    const records = this.getAll()
    const existingIndex = records.findIndex((r) => r.id === record.id)
    
    if (existingIndex >= 0) {
      // 기존 기록 수정 시 히스토리 저장
      const existing = records[existingIndex]
      const history: DevRecordHistory = {
        version: existing.version,
        changedBy: record.author,
        changedAt: new Date().toISOString(),
        changes: this.getChanges(existing, record),
      }
      
      record.version = existing.version + 1
      record.history = [...(existing.history || []), history]
      records[existingIndex] = record
    } else {
      records.push(record)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  },

  delete(id: string): void {
    const records = this.getAll()
    const filtered = records.filter((r) => r.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  },

  getById(id: string): DevRecord | null {
    const records = this.getAll()
    return records.find((r) => r.id === id) || null
  },

  getChanges(old: DevRecord, updated: DevRecord): string {
    const changes: string[] = []
    
    if (old.featureName !== updated.featureName) changes.push(`기능명: ${old.featureName} → ${updated.featureName}`)
    if (old.intent !== updated.intent) changes.push('의도 변경')
    if (old.errorCases !== updated.errorCases) changes.push('에러/예외 케이스 변경')
    if (old.dependencies !== updated.dependencies) changes.push('의존 관계 변경')
    if (old.testCriteria !== updated.testCriteria) changes.push('테스트 기준 변경')
    if (JSON.stringify(old.tags) !== JSON.stringify(updated.tags)) changes.push('태그 변경')
    
    return changes.join(', ') || '내용 수정'
  },
}

interface DevRecordHistory {
  version: number
  changedBy: string
  changedAt: string
  changes: string
  reason?: string
}

