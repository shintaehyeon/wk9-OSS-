# 작은도서관

OSS Assignment 4-1: REST API-Based CRUD Service with JavaScript

## 현재 진행 상황

프로젝트 기본 파일과 홈 / 도서 관리 페이지 연결을 준비했습니다.
MockAPI GET 요청, 연결 상태 표시와 대출 기록 표 출력을 구현했습니다.
현재 API는 대출 기록(id, borrower, bookTitle, borrowedAt, loanDays, status)을 반환합니다.
대출 기록 등록·수정·삭제, 검색, 입력 검증 및 배포는 아직 구현하지 않았습니다.

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
- 예정 Field: `id`, `title`, `author`, `category`, `price`
- 예정 기능: 조회 / 등록 / 수정 / 삭제 / 제목 검색
- 예정 검증: 제목 2자 이상, 저자 공백 금지, 가격은 0 이상 숫자
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
- 현재 초기 파일과 API 연결 코드 초안은 AI가 생성했습니다. 핵심 도서 CRUD 기능은 아직 없습니다.
- 직접 수정한 내용 / 배운 점: 작업 후 본인이 작성할 예정입니다.
- 최종 AI 코드 기여율(%): 전체 구현 완료 후 실제 반영 내역을 기준으로 본인이 산정할 예정입니다.

### Problem & Solution / Reflection

구현 중 발생한 문제와 해결 과정은 직접 확인한 뒤 기록할 예정입니다.
