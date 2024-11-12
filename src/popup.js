document.getElementById("newsLinkerBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        
        chrome.runtime.sendMessage({ type: "FETCH_NEWS", videoUrl: activeTab.url }, (response) => {
            const newsList = response.news;
            const resultDiv = document.getElementById("result");

            resultDiv.innerHTML = ""; // 기존 내용을 지우기
            if (newsList && newsList.length > 0) {
                newsList.forEach(article => {
                    const articleElement = document.createElement("div");
                    articleElement.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                    resultDiv.appendChild(articleElement);
                });
            } else {
                resultDiv.innerText = "관련 뉴스를 찾을 수 없습니다.";
            }
        });
    });
});
