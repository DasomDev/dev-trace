import { useCallback } from 'react'
import { recordStorage } from '@/entities/record/storage'
import type { DevRecord, DevRecordFormData } from '@/entities/record/types'

export const useRecord = () => {
  const getAll = useCallback((): DevRecord[] => {
    return recordStorage.getAll()
  }, [])

  const getById = useCallback((id: string): DevRecord | null => {
    return recordStorage.getById(id)
  }, [])

  const save = useCallback((formData: DevRecordFormData): DevRecord => {
    const now = new Date().toISOString()
    const record: DevRecord = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: now,
      updatedAt: now,
      version: 1,
      history: [],
    }
    
    recordStorage.save(record)
    return record
  }, [])

  const update = useCallback((id: string, formData: DevRecordFormData, author: string): DevRecord => {
    const existing = recordStorage.getById(id)
    if (!existing) {
      throw new Error('기록을 찾을 수 없습니다.')
    }

    const updated: DevRecord = {
      ...existing,
      ...formData,
      author,
      updatedAt: new Date().toISOString(),
    }

    recordStorage.save(updated)
    return updated
  }, [])

  const deleteRecord = useCallback((id: string): void => {
    recordStorage.delete(id)
  }, [])

  return {
    record: {
      getAll,
      getById,
    },
    save,
    update,
    deleteRecord,
  }
}

