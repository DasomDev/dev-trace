import { useCallback } from 'react'
import { taskStorage } from '@/entities/task/storage'
import type { DevTask, DevTaskFormData } from '@/entities/task/types'

export const useTask = () => {
  const getAll = useCallback((): DevTask[] => {
    return taskStorage.getAll()
  }, [])

  const getById = useCallback((id: string): DevTask | null => {
    return taskStorage.getById(id)
  }, [])

  const save = useCallback((formData: DevTaskFormData): DevTask => {
    const now = new Date().toISOString()
    const task: DevTask = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: now,
      updatedAt: now,
      version: 1,
      history: [],
    }
    
    taskStorage.save(task)
    return task
  }, [])

  const update = useCallback((id: string, formData: DevTaskFormData, author: string): DevTask => {
    const existing = taskStorage.getById(id)
    if (!existing) {
      throw new Error('작업을 찾을 수 없습니다.')
    }

    const updated: DevTask = {
      ...existing,
      ...formData,
      author,
      updatedAt: new Date().toISOString(),
    }

    taskStorage.save(updated)
    return updated
  }, [])

  const deleteTask = useCallback((id: string): void => {
    taskStorage.delete(id)
  }, [])

  return {
    task: {
      getAll,
      getById,
    },
    save,
    update,
    deleteTask,
  }
}

