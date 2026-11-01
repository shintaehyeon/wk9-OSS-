# 작은도서관 — 도서 대출·반납 관리

OSS Assignment 4-1: REST API-Based CRUD Service with JavaScript

## Deployment

- 제출용 GitHub: https://github.com/2026-2-OSS/assign09-c02-22101046
- Vercel 연결용 개인 GitHub: https://github.com/shintaehyeon/wk9-OSS-
- Vercel 홈: https://wk9-oss-123.vercel.app/
- Vercel CRUD 화면: https://wk9-oss-123.vercel.app/crud.html
- MockAPI Endpoint: https://69182cef21a96359486efe99.mockapi.io/students/students

기존 리소스 이름인 `students`를 유지하고, 내부 데이터는 도서 대출 기록으로 구성했습니다. 비밀 키나 비밀번호는 사용하지 않습니다. 실습 데이터에는 실제 개인정보를 입력하지 않습니다.

## Service

도서 대출 기록을 등록하고 반납 상태를 관리하는 서비스입니다. HTML, CSS, Vanilla JavaScript를 사용했습니다.

| Field | 타입 | 의미 |
|---|---|---|
| id | Object ID | 기록을 구분하는 고유 번호 |
| borrower | String | 대출자 가명 |
| bookTitle | String | 도서명 |
| borrowedAt | String | 대출일, YYYY-MM-DD |
| loanDays | Number | 대출 기간(일) |
| status | String | 대출중 또는 반납완료 |

- GET: 페이지를 열면 서버 목록을 가져와 표로 출력합니다.
- POST: Form으로 새 기록을 등록하고 서버에서 ID를 생성합니다.
- PUT: 기존 값을 Form에 불러와 수정합니다. 수정 취소도 가능합니다.
- DELETE: 확인창에서 승인하면 서버 기록을 삭제합니다.
- 검색: 대출자 또는 도서명으로 검색하며 영문 대소문자를 구분하지 않습니다.
- 등록·수정 검증: 대출자와 도서명 각각 2자 이상, 유효한 대출일, 대출 기간 1~30일 정수, 허용된 반납 상태를 확인합니다.
- 실패 시 오류 메시지를 표시하고, 성공하면 서버 목록을 다시 조회합니다.

배열은 목록 표시와 검색에 사용하며 최종 데이터는 MockAPI에 저장합니다.

## 실행 및 파일

배포 주소에 접속하거나 로컬에서 `index.html`을 열고 도서 관리 화면으로 이동합니다. 별도 패키지 설치는 필요하지 않으며 인터넷 연결이 필요합니다.

- `index.html`: 서비스 소개와 관리 화면 이동
- `crud.html`: 등록·수정 Form, 목록, 검색
- `script.js`: Fetch CRUD, 입력 검증, 화면 갱신
- `style.css`: 파란색 테마와 홈 중앙 정렬
- `sample-data.json`: 초기 데이터 참고용 파일. 사이트의 실제 저장소는 MockAPI입니다.

## Weekly Review

### Key Learning

1. **fetch()와 응답 확인**: 서버에 요청을 보내 데이터를 주고받는 방법을 익혔습니다. 응답이 왔다고 모두 성공한 것은 아니므로 `response.ok`로 성공 여부를 확인하고, 실패했을 때 메시지를 표시해야 한다는 점을 배웠습니다.
2. **JSON과 DOM 갱신**: `response.json()`으로 서버 응답을 JavaScript 객체나 배열로 바꾸고, 반복문으로 표를 만드는 흐름을 배웠습니다. 저장할 때는 `JSON.stringify()`로 객체를 JSON 문자열로 바꿔 전송합니다.
3. **async/await와 서버 저장**: 서버 응답을 기다린 뒤 목록을 갱신하도록 `await`를 사용했습니다. 화면 배열만 바꾸는 것과 POST·PUT·DELETE로 서버 데이터를 변경하는 것의 차이를 배웠습니다. 서버에 저장해야 새로고침 후에도 결과가 유지됩니다.

### Problem & Solution / Reflection

처음에는 학생 데이터용 필드를 그대로 사용해서 도서 대출 기록이 제대로 표시되지 않았습니다. MockAPI Schema와 화면에서 읽는 필드를 `borrower`, `bookTitle`, `borrowedAt`, `loanDays`, `status`로 맞춰 해결했습니다.

또한 ID와 대출자 이름을 혼동하여 이름을 ID에 넣었습니다. ID는 기록을 구분하는 번호로 두고 이름은 `borrower`에 넣도록 데이터를 수정했습니다. 새 기록을 등록할 때는 ID를 직접 보내지 않고 MockAPI에서 생성하도록 했습니다.

MockAPI를 처음 사용해 봤는데, 저장된 데이터를 한 번의 GET 요청으로 불러와 목록으로 보여줄 수 있어서 편리했습니다. 처음에는 데이터만 바꾸면 화면도 바로 맞게 나올 줄 알았지만, 서버 필드와 JavaScript에서 읽는 이름이 같아야 한다는 점을 알게 되었습니다. 단순히 화면에 표시되는 것뿐 아니라 새로고침 후에도 변경한 내용이 유지되는지 확인하는 과정이 중요하다고 느꼈습니다.

### AI / Search Usage

- 도구: OpenAI Codex
- 사용 목적: 코드 구조 설명, 기능 구현 보조, 오류 확인, 테스트, Git 작업 및 README 초안 작성
- 반영한 내용: 초기 HTML/CSS와 Fetch 기반 조회·등록·수정·삭제·검색·검증 코드, 기능별 주석과 UI 수정에 AI가 생성·수정한 코드가 반영되었습니다.
- 직접 수행한 작업: 서비스 주제와 화면 요구사항 결정, MockAPI Schema 설정과 데이터 입력·수정, Vercel 배포 및 배포 화면 기능 검사
- 학습에 활용한 내용: GET·POST·PUT·DELETE의 차이, ID와 대출자 필드의 구분, 서버 응답을 화면에 반영하는 과정
- 본인 추정 AI 코드 기여율(%): 제출 전 실제 핵심 코드 작성·수정 내역을 기준으로 본인이 산정해야 합니다. 현재 대화 이력에서 핵심 CRUD 코드 대부분은 AI가 작성·수정했으며, 골격에만 도움받았다고 설명할 수는 없습니다.

## 검증 내역

- Organization 저장소에 의미 있는 커밋 10개가 올라간 것을 확인했습니다(README 최종 수정 전 기준).
- 배포된 HTML·CSS·JavaScript와 Organization 저장소 파일의 일치를 확인했습니다.
- 실제 MockAPI에 검증용 가상 기록을 생성하여 POST·PUT·DELETE와 재조회 결과를 확인하고 검증 기록은 삭제했습니다.
- AI 도구의 배포 브라우저 검사로 목록 조회, 등록, 기존 값 불러오기, 수정, 대출자·도서명 검색, 새로고침 후 수정 결과 유지를 확인했습니다.
- 등록·수정 검증, 실패 시 입력 유지, 삭제 취소·실패 처리 등은 모의 DOM/응답 검사도 수행했습니다.
- 작성자는 배포 화면의 삭제·삭제 취소를 포함한 전체 기능 검사를 완료했다고 확인했습니다.

## Sample Project 확인

- Sample: https://github.com/2026-2-OSS/week09_sample_project
- 2026-11-01 AI 도구가 Sample을 임시 폴더에 clone하고 로컬 서버에서 실행·분석했습니다.
- 버튼 클릭 → `loadStudents()` → `fetch()` → `response.ok` → `response.json()` → `forEach()`로 이름·이메일 DOM 생성 순서를 확인했습니다.
- Chrome DevTools Network에서 요청 URL `https://jsonplaceholder.typicode.com/users`, Method `GET`, Status Code `200 OK`, JSON Response를 확인했습니다.
- 화면에 사용자 10건이 출력되는 것을 확인했습니다. 이 도구 검사는 작성자 본인의 코드 이해·설명을 대신하지 않습니다.

## 제출

LMS 텍스트 상자에 제출할 주소:

```text
GitHub Repository URL: https://github.com/2026-2-OSS/assign09-c02-22101046
Vercel 배포 URL: https://wk9-oss-123.vercel.app/crud.html
```

Weekly Question 2문제(정답·해설 포함)는 작성자가 수업 Google Form에 제출했다고 확인했습니다. LMS 최종 제출은 작성자가 진행합니다.
