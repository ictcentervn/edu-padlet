# Step 2: SQLite — 교사 지침서

## 한줄 요약
Notion 대신 로컬 파일 DB(SQLite)를 사용하도록 전환하고, SQL 기본 개념을 이해한다.

## 차시 구성
| 차시 | 핵심 활동 | 시간 |
|------|---------|------|
| 1차시 | SQL 개념 + Step1에서 Step2로 전환 실습 + 서버 실행 | 45분 |
| 2차시 | SQLite Viewer로 데이터 확인 + 심화(SQL 직접 실행/바이브코딩) | 45분 |

## 수업 전 준비물
- [ ] Step 1 완료 상태 (Node.js, VS Code 설치됨)
- [ ] **교사/학생 노트북에서 `npm install better-sqlite3` 사전 테스트** (빌드 에러 가능)
- [ ] Windows 학생이 있다면 빌드 도구 사전 설치 확인
- [ ] 인터넷은 npm install 시에만 필요 (이후 오프라인 가능)

## 학생이 자주 막히는 곳 Top 3
1. **better-sqlite3 빌드 에러** → Mac: `xcode-select --install`, Windows: `npm install -g windows-build-tools` (5~10분 소요)
2. **실행 경로 오류** (다른 폴더에서 node server.js) → `pwd`로 확인, step2-sqlite 폴더에서 실행 (2분)
3. **padlet.db 안 생김** → 올바른 폴더에서 실행했는지 확인, VS Code 탐색기 새로고침 (2분)

## 시간 조절 팁
- 시간 부족 시 생략 가능: SQL 개념 설명을 10분으로 압축, 심화 SQL 실행
- 여유 시 추가 가능: 터미널에서 SQL 직접 실행, 바이브코딩 기능 추가

## 핵심 확인 포인트
- [ ] npm install이 에러 없이 완료되었는가 (better-sqlite3 빌드 성공)
- [ ] `node server.js` 후 카드 추가 시 padlet.db 파일이 생성되는가
- [ ] SQLite Viewer에서 데이터가 보이는가
- [ ] 서버 종료 후 재시작해도 데이터가 유지되는가

## 실행 테스트에서 발견된 주의사항
- **better-sqlite3 빌드 에러 가능성**: C++ 컴파일 도구가 필요한 native module. Windows 환경에서 특히 문제가 많음. **수업 전에 반드시 학생 노트북에서 사전 설치 테스트** 권장. 대안으로 `sql.js` 패키지 사용 가능 (빌드 불필요, 단 db.js 코드 수정 필요).
- Step 1 대비 설정이 매우 간단 (API 키 불필요). 학생들이 빠르게 성공 경험을 얻음.
- Step 1에서 막혀서 완성 못 한 학생도 Step 2에서 성공 가능. 격려 포인트.
