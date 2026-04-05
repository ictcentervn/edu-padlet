# Step 6: Render 배포 — 교사 지침서

## 한줄 요약
GitHub 코드를 Render에 배포하여 24시간 접속 가능한 실제 웹 서비스를 완성하고, CI/CD를 체험한다.

## 차시 구성
| 차시 | 핵심 활동 | 시간 |
|------|---------|------|
| 1차시 | 배포/CI/CD 개념 + Render 가입 + 환경변수 설정 + 첫 배포 | 45분 |
| 2차시 | 코드 수정 > push > 자동 배포 확인 + 6단계 전체 회고 | 45분 |

## 수업 전 준비물
- [ ] render.com에 교사 계정으로 미리 테스트 배포
- [ ] 학생 GitHub 저장소에 최신 코드 push 확인
- [ ] Supabase 프로젝트 활성 상태 확인 (무료 플랜 1주 비활동 시 일시정지 가능)
- [ ] 학교 네트워크에서 render.com 접속 확인
- [ ] Supabase URL/Key를 학생이 알고 있는지 확인

## 학생이 자주 막히는 곳 Top 3
1. **환경변수 누락/오타** → Render 대시보드 > Environment 탭에서 SUPABASE_URL, SUPABASE_ANON_KEY 확인 (3분)
2. **빌드 실패** (Start Command 오류, package.json 위치) → Logs 탭에서 에러 확인, Build Command/Start Command 재설정 (5분)
3. **GitHub 저장소 연결 안 됨** → "Configure account"로 Render 앱 설치 권한 부여 (3분)

## 시간 조절 팁
- 시간 부족 시 생략 가능: 2차시 "발전 방향 토론" (과제 전환), 커스텀 도메인
- 여유 시 추가 가능: GitHub Actions 소개, 다른 배포 플랫폼 비교, 로그 분석

## 핵심 확인 포인트
- [ ] Render에서 Web Service 생성 완료
- [ ] 환경변수 2개 (SUPABASE_URL, SUPABASE_ANON_KEY) 설정 완료
- [ ] 배포 URL에서 앱이 정상 동작하는가
- [ ] 코드 수정 > git push 후 자동 배포가 트리거되는가
- [ ] 친구의 배포 URL에 접속하여 카드 추가가 되는가

## 실행 테스트에서 발견된 주의사항
- **환경변수는 서비스 생성 후 Environment 메뉴에서 설정**: .env 파일은 Render에 올라가지 않음. Render 대시보드 > 내 서비스 > Environment 탭에서 직접 입력. 환경변수 추가/수정 후 Manual Deploy > Deploy latest commit으로 재배포 필요.
- **무료 플랜 슬립 30초~1분**: 15분간 미접속 시 서버가 슬립 모드로 전환. 다시 접속하면 30초~1분 걸려 깨어남. 정상 동작이며 기다리면 됨. **수업 시연 전에 미리 한 번 접속하여 서버를 깨워둘 것.**
- server.js에서 `process.env.PORT || 3000` 패턴을 사용해야 Render에서 작동.
- 빌드에 2~5분 소요. 대기 시간에 CI/CD 퀴즈나 빌드 로그 읽기 활동 활용.
