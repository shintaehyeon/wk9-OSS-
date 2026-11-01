const API_URL = 'https://69182cef21a96359486efe99.mockapi.io/students/students';
const message = document.getElementById('message');

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

        message.textContent = `MockAPI 연결 성공: 학생 데이터 ${students.length}건을 조회했습니다. 도서 목록은 도서용 리소스 연결 후 표시됩니다.`;
    } catch (error) {
        message.textContent = 'MockAPI 연결에 실패했습니다. 네트워크와 API 주소를 확인하고 새로고침해 주세요.';
        console.error('MockAPI 연결 오류:', error);
    }
}

checkApiConnection();
