# Firebase 환경 변수 설정 예시

## .env 파일 생성

프로젝트 루트에 `.env` 파일을 만들고 아래 내용을 추가하세요:

```env
# Firebase 설정
# Firebase Console > 프로젝트 설정 > 일반 탭에서 복사
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 설정 방법

1. [Firebase Console](https://console.firebase.google.com) 접속
2. 프로젝트 선택
3. 프로젝트 설정(⚙️) > 일반 탭
4. "내 앱" 섹션에서 웹 앱 선택 또는 새로 만들기
5. Firebase SDK 설정 코드 복사
6. `.env` 파일에 붙여넣기

## 주의사항

- `.env` 파일은 Git에 올라가지 않습니다 (`.gitignore`에 포함됨)
- 개발 서버를 재시작해야 환경 변수가 적용됩니다
- 프로덕션 배포 시 Firebase Console > Hosting > 환경 변수에서 설정해야 합니다

