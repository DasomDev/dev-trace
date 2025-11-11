import { db } from '@/config/firebase'
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import type { DevTask } from './types'

const COLLECTION_NAME = 'tasks'

export const firebaseTaskStorage = {
  async getAll(): Promise<DevTask[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
    const tasks: DevTask[] = []
    
    querySnapshot.forEach((docSnap) => {
      tasks.push({
        id: docSnap.id,
        ...docSnap.data(),
      } as DevTask)
    })
    
    return tasks
  },

  async getById(id: string): Promise<DevTask | null> {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as DevTask
  },

  async save(task: DevTask): Promise<string> {
    if (task.id) {
      // 기존 문서 업데이트
      const docRef = doc(db, COLLECTION_NAME, task.id)
      await updateDoc(docRef, {
        ...task,
        updatedAt: new Date().toISOString(),
      })
      return task.id
    } else {
      // 새 문서 생성
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return docRef.id
    }
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  },
}

