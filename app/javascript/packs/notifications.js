// ブラウザ通知の許可をリクエストする
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  });
  
  function showNotification(subject, deadline) {
    if (Notification.permission === 'granted') {
      const notification = new Notification('Homework Reminder', {
        body: `科目: ${subject} の締切は ${deadline} です！`,
        icon: '/path/to/icon.png'  // 任意でアイコンを設定
      });
  
      // 通知クリック時の処理
      notification.onclick = () => {
        window.focus();
      };
    } else {
      console.error('通知の許可がされていません。');
    }
  }
  
  function checkDeadlines(deadlines) {
    const now = new Date();
    console.log("現在の時刻:", now);  // 現在時刻を表示
  
    deadlines.forEach((deadline) => {
      const deadlineTime = new Date(deadline.time);
      const fiveMinutesBefore = new Date(deadlineTime.getTime() - 5 * 60 * 1000);
  
      // デバッグ用のログ
      console.log(`チェック中の締切: ${deadline.subject} - 締切: ${deadlineTime} - 5分前: ${fiveMinutesBefore}`);
  
      // 現在の時刻が5分前になったら通知を表示
      if (now >= fiveMinutesBefore && now < deadlineTime && !deadline.notified) {
        console.log(`通知を表示: ${deadline.subject}`); // 通知を表示するタイミングをログに表示
        showNotification(deadline.subject, deadlineTime);
        deadline.notified = true; // 通知が表示されたことを記録
      }
    });
  }
  // 定期的に時間をチェックする
  window.startDeadlineChecker = function(deadlines) {
    setInterval(() => {
      checkDeadlines(deadlines);
    }, 60000); // 1分ごとにチェック
  };