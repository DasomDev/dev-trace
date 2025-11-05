import { db } from '@/config/firebase'
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import type { DevRecord } from './types'

const COLLECTION_NAME = 'records'

export const firebaseRecordStorage = {
  async getAll(): Promise<DevRecord[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
    const records: DevRecord[] = []
    
    querySnapshot.forEach((docSnap) => {
      records.push({
        id: docSnap.id,
        ...docSnap.data(),
      } as DevRecord)
    })
    
    return records
  },

  async getById(id: string): Promise<DevRecord | null> {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as DevRecord
  },

  async save(record: DevRecord): Promise<string> {
    if (record.id) {
      // 기존 문서 업데이트
      const docRef = doc(db, COLLECTION_NAME, record.id)
      await updateDoc(docRef, {
        ...record,
        updatedAt: new Date().toISOString(),
      })
      return record.id
    } else {
      // 새 문서 생성
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...record,
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

