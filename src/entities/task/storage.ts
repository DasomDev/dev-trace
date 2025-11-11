import type { DevTask } from './types'

const STORAGE_KEY = 'dev-trace-tasks'

export const taskStorage = {
  getAll(): DevTask[] {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    try {
      return JSON.parse(data)
    } catch {
      return []
    }
  },

  save(task: DevTask): void {
    const tasks = this.getAll()
    const existingIndex = tasks.findIndex((t) => t.id === task.id)
    
    if (existingIndex >= 0) {
      // 기존 작업 수정 시 히스토리 저장
      const existing = tasks[existingIndex]
      const history: DevTaskHistory = {
        version: existing.version,
        changedBy: task.author,
        changedAt: new Date().toISOString(),
        changes: this.getChanges(existing, task),
      }
      
      task.version = existing.version + 1
      task.history = [...(existing.history || []), history]
      tasks[existingIndex] = task
    } else {
      tasks.push(task)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  },

  delete(id: string): void {
    const tasks = this.getAll()
    const filtered = tasks.filter((t) => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  },

  getById(id: string): DevTask | null {
    const tasks = this.getAll()
    return tasks.find((t) => t.id === id) || null
  },

  getChanges(old: DevTask, updated: DevTask): string {
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

interface DevTaskHistory {
  version: number
  changedBy: string
  changedAt: string
  changes: string
  reason?: string
}

