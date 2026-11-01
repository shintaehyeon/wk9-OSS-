const API_URL = 'https://69182cef21a96359486efe99.mockapi.io/students/students';
const message = document.getElementById('message');
const apiList = document.getElementById('apiList');

function renderStudents(students) {
    apiList.replaceChildren();
    for (const student of students) {
        const row = document.createElement('tr');
        for (const field of ['id', 'name', 'major', 'email', 'grade']) {
            const cell = document.createElement('td');
            cell.textContent = student[field] ?? '-';
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

        const students = await response.json();
        if (!Array.isArray(students)) {
            throw new Error('목록 형식이 아닙니다.');
        }

        renderStudents(students);
        message.textContent = students.length === 0
            ? 'MockAPI 연결 성공: 등록된 데이터가 없습니다.'
            : `MockAPI 연결 성공: 학생 데이터 ${students.length}건을 조회했습니다.`;
    } catch (error) {
        message.textContent = 'MockAPI 연결에 실패했습니다. 네트워크와 API 주소를 확인하고 새로고침해 주세요.';
        console.error('MockAPI 연결 오류:', error);
    }
}

checkApiConnection();
