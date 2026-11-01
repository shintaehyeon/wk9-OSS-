const API_URL = 'https://69182cef21a96359486efe99.mockapi.io/students/students';
const message = document.getElementById('message');
const apiList = document.getElementById('apiList');
const loanForm = document.getElementById('loanForm');
const formMessage = document.getElementById('formMessage');
const submitLoan = document.getElementById('submitLoan');

function renderLoans(loans) {
    apiList.replaceChildren();
    for (const loan of loans) {
        const row = document.createElement('tr');
        for (const field of ['id', 'borrower', 'bookTitle', 'borrowedAt', 'loanDays', 'status']) {
            const cell = document.createElement('td');
            cell.textContent = loan[field] ?? '-';
            row.appendChild(cell);
        }
        apiList.appendChild(row);
    }
}

async function checkApiConnection() {
    message.textContent = 'MockAPI에 연결 중입니다...';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

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

async function createLoan(event) {
    event.preventDefault();
    if (submitLoan.disabled) return;

    const loan = {
        borrower: loanForm.elements.borrower.value.trim(),
        bookTitle: loanForm.elements.bookTitle.value.trim(),
        borrowedAt: loanForm.elements.borrowedAt.value,
        loanDays: Number(loanForm.elements.loanDays.value),
        status: loanForm.elements.status.value
    };

    if (loan.borrower.length < 2 || loan.bookTitle.length < 2) {
        formMessage.textContent = '대출자와 도서명은 공백을 제외하고 각각 2자 이상 입력해 주세요.';
        return;
    }
    if (!loan.borrowedAt || !loanForm.elements.borrowedAt.checkValidity()) {
        formMessage.textContent = '올바른 대출일을 입력해 주세요.';
        return;
    }
    if (!Number.isInteger(loan.loanDays) || loan.loanDays < 1 || loan.loanDays > 30) {
        formMessage.textContent = '대출 기간은 1~30일 사이의 정수로 입력해 주세요.';
        return;
    }
    if (!['대출중', '반납완료'].includes(loan.status)) {
        formMessage.textContent = '반납 상태를 선택해 주세요.';
        return;
    }

    submitLoan.disabled = true;
    formMessage.textContent = '대출 기록을 저장 중입니다...';
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loan)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const savedLoan = await response.json();
        loanForm.reset();
        formMessage.textContent = `대출 기록을 등록했습니다. (ID: ${savedLoan.id})`;
        await checkApiConnection();
    } catch (error) {
        formMessage.textContent = '등록 결과를 확인하지 못했습니다. 새로고침해 목록을 확인한 뒤 다시 시도해 주세요.';
        console.error('대출 등록 오류:', error);
    } finally {
        submitLoan.disabled = false;
    }
}

loanForm.addEventListener('submit', createLoan);
checkApiConnection();
