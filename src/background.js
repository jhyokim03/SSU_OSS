// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "FETCH_DATA") {
        const videoUrl = request.videoUrl;

        // Django 서버에 요청을 보내는 부분
        fetch('http://your-django-server.com/api/video-data/', { // Django API 엔드포인트
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoUrl: videoUrl }), // 유튜브 링크를 JSON 형식으로 전송
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }
            return response.json();
        })
        .then(data => {
            sendResponse({ result: data }); // Django 서버의 응답을 content.js로 반환
        })
        .catch(error => {
            console.error("서버 요청 실패:", error);
            sendResponse({ result: null });
        });

        return true; // 비동기 응답을 보낼 수 있도록 설정
    }
});

