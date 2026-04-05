# Step 5: GitHub Codespaces — 교사 지침서

## 한줄 요약
브라우저만으로 클라우드 개발 환경(Codespaces)에서 코드를 편집/실행하고, 공개 URL로 앱을 공유한다.

## 차시 구성
| 차시 | 핵심 활동 | 시간 |
|------|---------|------|
| 1차시 | Codespace 생성 + 서버 실행 + 포트 Public + URL 공유 | 45분 |
| 2차시 | 코드 수정(CSS) + commit/push + (심화) Live Share | 45분 |

## 수업 전 준비물
- [ ] 학교 네트워크에서 `*.github.dev` 도메인 접속 가능 확인
- [ ] Step 4 완료 (GitHub 저장소에 코드 push 상태)
- [ ] 설치 필요 없음! 브라우저만 있으면 됨 (크롬북, 태블릿도 가능)
- [ ] 교사가 미리 Codespace 생성~서버 실행까지 1회 테스트

## 학생이 자주 막히는 곳 Top 3
1. **`.github.dev`(웹 편집기)로 열림** → 터미널이 없으면 Codespace가 아님. github.com/codespaces에서 직접 생성 (3분)
2. **포트를 Public으로 안 바꿈** → PORTS 탭 > 3000번 우클릭 > Port Visibility > Public (1분)
3. **Codespace 중지(Stop) 안 함** → 무료 월 60시간 소모. 수업 종료 3분 전 반드시 확인 (1분)

## 시간 조절 팁
- 시간 부족 시 생략 가능: 2차시 Live Share 활동
- 여유 시 추가 가능: CSS 자유 수정, 바이브코딩 프롬프트 활용

## 핵심 확인 포인트
- [ ] Codespace가 정상 생성되었는가 (터미널이 보이는가)
- [ ] npm install + .env 설정 + node server.js 성공
- [ ] PORTS 탭에서 3000번 포트가 Public으로 설정되었는가
- [ ] 친구가 공유 URL로 앱에 접속할 수 있는가
- [ ] 수업 종료 시 Codespace를 Stop 했는가

## 실행 테스트에서 발견된 주의사항
- **`.github.dev`는 Codespace가 아님**: `.github.dev`는 단순 웹 편집기로 터미널/서버 실행 불가. 구분 기준은 "터미널이 보이는가". Codespace는 Code 버튼 > Codespaces 탭에서 생성.
- **첫 생성 시 3~5분 대기**: 처음 Codespace를 만들면 환경 설정에 시간이 걸림. 학생에게 미리 안내하여 불안감 해소.
- **Public 포트 접속 시 GitHub 인증 경고**: 외부 접속자에게 GitHub 로그인 또는 "Continue" 확인 페이지가 나타남. 위험한 것이 아니라 정상 동작. 완전 공개는 Step 6(Render)에서 가능.
- **Codespace 중지 필수**: 수업 종료 시 반드시 Stop. github.com > Your codespaces > "..." > Stop codespace. 비활성 30분 후 자동 중지되지만 수동 중지를 습관화. 중지 안 하면 무료 시간(월 60시간) 빠르게 소모.
