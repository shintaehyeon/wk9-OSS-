# 작은도서관

OSS Assignment 4-1: REST API-Based CRUD Service with JavaScript

## 현재 진행 상황

프로젝트 기본 파일과 홈 / 도서 관리 페이지 연결을 준비했습니다.
MockAPI GET 요청, 연결 상태 표시와 대출 기록 표 출력을 구현했습니다.
현재 API는 대출 기록(id, borrower, bookTitle, borrowedAt, loanDays, status)을 반환합니다.
대출 등록 Form과 POST 저장, 등록 후 목록 갱신을 구현했습니다.
등록 시 대출자·도서명 길이, 대출일, 대출 기간(1~30일 정수), 반납 상태를 검증합니다.
수정 버튼으로 기존 값을 Form에 불러오고 PUT 저장 후 목록을 갱신합니다. 수정 취소를 지원하며 등록과 같은 입력 검증을 적용합니다.
삭제, 검색 및 배포는 아직 구현하지 않았습니다.

## 실행

`index.html`을 브라우저에서 열고 도서 관리 링크로 이동합니다.
HTML, CSS, Vanilla JavaScript를 사용하며 별도 설치는 필요하지 않습니다.

## 파일

- `index.html`: 서비스 소개
- `crud.html`: 도서 관리 화면
- `style.css`: 기본 스타일
- `script.js`: MockAPI 조회 및 로딩 / 성공 / 실패 상태 표시

## Service

- 주제: 도서 관리
- Field: `id`, `borrower`, `bookTitle`, `borrowedAt`, `loanDays`, `status`
- 구현: 조회 / 등록 / 수정
- 예정 기능: 삭제 / 도서명 검색
- 등록 검증: 대출자·도서명 각각 2자 이상, 유효한 대출일, 대출 기간 1~30일 정수, 허용된 반납 상태
- 가상 대출 데이터만 사용

## Deployment

- GitHub: https://github.com/2026-2-OSS/assign09-c02-22101046
- Vercel: 배포 전
- MockAPI Endpoint: https://69182cef21a96359486efe99.mockapi.io/students/students
- 리소스 이름은 students를 유지하며 대출 기록을 저장합니다.

## Weekly Review

### Key Learning

기능 구현 및 직접 확인 후 fetch(), JSON, async/await 학습 내용을 작성할 예정입니다.

### AI / Search Usage

- 도구: OpenAI Codex
- 목적: 초기 프로젝트 파일 생성, MockAPI 연결 및 Git 작업 보조
- 반영 내용: 초기 HTML 두 페이지, 기본 CSS, JavaScript 주석, README 및 .gitignore
- 추가 반영 내용: fetch(), HTTP 응답 및 배열 형식 확인, 연결 상태 표시
- 현재 초기 파일과 API 연결 코드 초안은 AI가 생성했습니다. 조회·등록·수정이 구현돼 있으며 삭제는 아직 없습니다.
- 직접 수정한 내용 / 배운 점: 작업 후 본인이 작성할 예정입니다.
- 최종 AI 코드 기여율(%): 전체 구현 완료 후 실제 반영 내역을 기준으로 본인이 산정할 예정입니다.

### Problem & Solution / Reflection

구현 중 발생한 문제와 해결 과정은 직접 확인한 뒤 기록할 예정입니다.

## 등록 기능 확인

- 실제 MockAPI POST로 가상 기록 생성 후 GET 재조회로 저장 유지 확인, 검증 기록 삭제 완료
- 요청 본문 숫자 타입·자동 ID 생성 방식, 등록 성공 후 폼 초기화 및 목록 재조회 검사
- 등록 실패 시 입력 유지와 버튼 복구 검사
- 브라우저 및 Vercel 배포 주소에서의 직접 검증은 아직 수행하지 않았습니다.

## 수정 기능 확인

- 모의 DOM/응답으로 수정 버튼, 기존 값 불러오기, PUT 요청, 목록 재조회, 수정 취소 확인
- 수정 실패 시 입력 유지, 등록 POST 회귀 및 잘못된 입력 차단 검사 통과
- 실제 MockAPI의 검증용 기록에 PUT 수행 후 GET으로 대출 기간·반납 상태 변경 유지 확인, 검증 기록 삭제 완료
- 브라우저 및 Vercel 배포 주소에서 직접 조작하는 확인은 아직 남아 있습니다.
