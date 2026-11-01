// MockAPI 주소와 화면에서 사용할 요소 가져오기
const API_URL = 'https://69182cef21a96359486efe99.mockapi.io/students/students';
const message = document.getElementById('message');
const apiList = document.getElementById('apiList');
const loanForm = document.getElementById('loanForm');
const formMessage = document.getElementById('formMessage');
const submitLoan = document.getElementById('submitLoan');
const cancelEdit = document.getElementById('cancelEdit');
const formTitle = document.getElementById('formTitle');
const fields = ['borrower', 'bookTitle', 'borrowedAt', 'loanDays', 'status'];
const inputs = loanForm.elements;
// 수정 중인 기록의 ID 저장 (null이면 새 기록 등록)
let editingId = null;

// 입력 폼을 초기화하고 등록 모드로 돌아가는 기능
function resetLoanForm() {
    editingId = null;
    loanForm.reset();
    formTitle.textContent = '대출 등록';
    submitLoan.textContent = '대출 등록';
    cancelEdit.hidden = true;
}

// 수정 버튼을 누른 기록의 값을 폼에 채우는 기능
function startEditing(loan) {
    if (submitLoan.disabled) return;
    editingId = String(loan.id);
    for (const field of fields) {
        inputs[field].value = loan[field];
    }
    formTitle.textContent = `대출 수정 (ID: ${editingId})`;
    submitLoan.textContent = '수정 저장';
    cancelEdit.hidden = false;
    formMessage.textContent = '내용을 변경한 뒤 수정 저장을 눌러 주세요.';
    inputs.borrower.focus();
}

// 대출 목록을 표로 출력하고 각 행에 수정 버튼을 만드는 기능
function renderLoans(loans) {
    apiList.replaceChildren();
    for (const loan of loans) {
        const row = document.createElement('tr');
        const columns = ['id', 'borrower', 'bookTitle', 'borrowedAt', 'loanDays', 'status'];
        for (const field of columns) {
            const cell = document.createElement('td');
            cell.textContent = loan[field] ?? '-';
            row.appendChild(cell);
        }
        const actions = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = '수정';
        editButton.disabled = loan.id == null;
        editButton.addEventListener('click', () => startEditing(loan));
        actions.appendChild(editButton);
        row.appendChild(actions);
        apiList.appendChild(row);
    }
}

// GET 요청으로 서버의 대출 목록을 가져오는 기능
async function checkApiConnection() {
    message.textContent = 'MockAPI에 연결 중입니다...';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const loans = await response.json();
        if (!Array.isArray(loans)) {
            throw new Error('목록 형식이 아닙니다.');
        }

        renderLoans(loans);
        message.textContent = loans.length === 0
            ? 'MockAPI 연결 성공: 등록된 데이터가 없습니다.'
            : `MockAPI 연결 성공: 대출 기록 ${loans.length}건을 조회했습니다.`;
    } catch (error) {
        message.textContent = 'MockAPI 연결에 실패했습니다. 네트워크와 API 주소를 확인하고 새로고침해 주세요.';
        console.error('MockAPI 연결 오류:', error);
    }
}

// 입력값을 검사하고 등록 또는 수정을 저장하는 기능
async function saveLoan(event) {
    event.preventDefault();
    if (submitLoan.disabled) return;

    // 입력값의 앞뒤 공백을 제거하고 대출 기간은 숫자로 변환
    const loan = {};
    for (const field of fields) {
        loan[field] = inputs[field].value.trim();
    }
    loan.loanDays = Number(loan.loanDays);

    // 등록과 수정에 같은 검증 적용
    let error = '';
    if (loan.borrower.length < 2 || loan.bookTitle.length < 2) {
        error = '대출자와 도서명은 각각 2자 이상 입력해 주세요.';
    } else if (!loan.borrowedAt || !inputs.borrowedAt.checkValidity()) {
        error = '올바른 대출일을 입력해 주세요.';
    } else if (!Number.isInteger(loan.loanDays) || loan.loanDays < 1 || loan.loanDays > 30) {
        error = '대출 기간은 1~30일 사이의 정수로 입력해 주세요.';
    } else if (!['대출중', '반납완료'].includes(loan.status)) {
        error = '반납 상태를 선택해 주세요.';
    }
    if (error) {
        formMessage.textContent = error;
        return;
    }

    const isEditing = editingId !== null;
    // 기본은 POST 등록, 수정 중인 ID가 있으면 PUT 요청
    let requestUrl = API_URL;
    let method = 'POST';
    if (isEditing) {
        requestUrl = `${API_URL}/${encodeURIComponent(editingId)}`;
        method = 'PUT';
    }

    // 저장 중에는 중복 제출과 수정 취소 방지
    submitLoan.disabled = true;
    cancelEdit.disabled = true;
    formMessage.textContent = '대출 기록을 저장 중입니다...';
    try {
        const response = await fetch(requestUrl, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loan)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const savedLoan = await response.json();
        // 저장 성공 후 폼 초기화 및 서버 목록 다시 조회
        resetLoanForm();
        formMessage.textContent = `대출 기록을 ${isEditing ? '수정' : '등록'}했습니다. (ID: ${savedLoan.id})`;
        await checkApiConnection();
    } catch (error) {
        formMessage.textContent = '저장 결과를 확인하지 못했습니다. 새로고침해 목록을 확인한 뒤 다시 시도해 주세요.';
        console.error('대출 저장 오류:', error);
    } finally {
        // 성공과 실패에 관계없이 버튼을 다시 사용할 수 있게 복구
        submitLoan.disabled = false;
        cancelEdit.disabled = false;
    }
}

// 수정 취소 버튼 기능
cancelEdit.addEventListener('click', () => {
    if (submitLoan.disabled) return;
    resetLoanForm();
    formMessage.textContent = '수정을 취소했습니다.';
});
// 폼 제출 이벤트 연결
loanForm.addEventListener('submit', saveLoan);
// 페이지를 열면 대출 목록 조회
checkApiConnection();
