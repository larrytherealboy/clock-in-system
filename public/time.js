function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString(); // 根據用戶的語言環境將時間格式化為字符串
  document.getElementById('clock').textContent = timeString;
}

setInterval(updateTime, 1000); // 每秒調用一次 updateTime 函數
updateTime(); // 立即更新一次時間，避免在頁面加載後的第一秒內沒有顯示時間