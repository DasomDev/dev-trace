# Firebase 연결 가이드

## 1. Firebase 설정 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 Firebase 설정을 추가하세요:

```env
# .env 파일
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 2. Firebase Console에서 설정 가져오기

1. Firebase Console (https://console.firebase.google.com) 접속
2. 프로젝트 선택
3. 프로젝트 설정 (⚙️) > 일반 탭
4. "앱" 섹션에서 웹 앱 설정 복사
5. 위의 `.env` 파일에 붙여넣기

## 3. 사용 방법

### Firestore 사용 예시

```tsx
import { db } from '@/config/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

// 데이터 추가
const addRecord = async () => {
  await addDoc(collection(db, 'records'), {
    featureName: '새 기능',
    author: '홍길동',
    createdAt: new Date()
  })
}

// 데이터 읽기
const getRecords = async () => {
  const querySnapshot = await getDocs(collection(db, 'records'))
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data())
  })
}
```

### Auth 사용 예시

```tsx
import { auth } from '@/config/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

// 로그인
const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
}

// 회원가입
const signup = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
}
```

## 4. 기존 storage를 Firebase로 교체

`src/entities/record/storage.ts`를 Firebase로 교체할 수 있습니다.

