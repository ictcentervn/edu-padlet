# Step 1: Notion API — 교사 지침서

## 한줄 요약
Notion을 데이터베이스로 사용하여 웹 앱(패들렛 클론)을 처음 만들고, DB/서버/API 개념을 이해한다.

## 차시 구성
| 차시 | 핵심 활동 | 시간 |
|------|---------|------|
| 1차시 | 개념(DB, 서버, API) + Notion DB 만들기 | 45분 |
| 2차시 | API 키 발급 + Integration 연결 + .env 설정 | 45분 |
| 3차시 | 서버 실행 + 브라우저에서 CRUD + 자유 활동 | 45분 |

## 수업 전 준비물
- [ ] 학생 노트북에 Node.js(v18+), VS Code 사전 설치
- [ ] 학교 Wi-Fi 정상 작동 확인
- [ ] 프로젝트 파일 USB/공유폴더 준비
- [ ] 교사 노트북에서 전체 과정 1회 사전 실행
- [ ] Notion 계정 가입 사전 공지 (무료 플랜 OK)

## 학생이 자주 막히는 곳 Top 3
1. **Integration-DB 연결 누락** → Notion DB 페이지 "..." > Connections에서 Integration 연결 확인 (5~10분 소요)
2. **DB ID 복사 실수** (페이지명/`?v=` 포함) → URL에서 `?v=` 앞 32자리 영숫자만 복사 (3분)
3. **.env 파일 오류** (숨김파일, 공백, 따옴표) → VS Code에서 편집, `=` 앞뒤 공백 없이 (3분)

## 시간 조절 팁
- 시간 부족 시 생략 가능: 2차시 server.js 코드 설명 (실습에 집중)
- 여유 시 추가 가능: 바이브코딩 기본 프롬프트 체험, 브라우저 개발자 도구(F12) Network 탭

## 핵심 확인 포인트
- [ ] Notion에 Full page DB가 만들어졌는가
- [ ] Integration이 DB에 연결(Connections)되었는가
- [ ] .env 파일에 API 키와 DB ID가 올바르게 입력되었는가
- [ ] `node server.js` 실행 후 localhost:3000에서 카드 추가/삭제가 되는가
- [ ] Notion DB에서 데이터 반영이 확인되는가

## 실행 테스트에서 발견된 주의사항
- **.env는 숨김파일**: Finder/탐색기에서 안 보임. Mac: `Cmd+Shift+.`, Windows: "숨겨진 항목" 체크. VS Code에서는 항상 보임.
- **API 키가 `ntn_`으로 시작**: 2024년 이후 Notion 키 형식 변경. `ntn_`도 정상 작동하므로 그대로 사용.
- **DB ID에 페이지명 포함**: URL에서 `Paddle-339a5a...` 형태로 복사하면 안 됨. 하이픈 뒤 32자리만.
- **DB ID에 `?v=` 포함**: `?v=` 이후는 뷰 ID이므로 반드시 제거.
- **인라인 DB vs Full page DB**: 인라인 DB의 ID를 넣으면 "Provided ID is a page" 에러 발생. 반드시 "Open as full page"로 열어서 ID 복사.
- **컬럼 대소문자 불일치**: Notion에서 `color`(소문자)로 만들었는데 코드가 `Color`(대문자)를 기대하면 에러. 컬럼명 정확히 맞출 것.
