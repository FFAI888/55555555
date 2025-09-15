// 简单底部导航切换示例
const homeBtn = document.getElementById('homeBtn');
const groupBtn = document.getElementById('groupBtn');
const earnBtn = document.getElementById('earnBtn');
const swapBtn = document.getElementById('swapBtn');
const profileBtn = document.getElementById('profileBtn');
const buttons = [homeBtn, groupBtn, earnBtn, swapBtn, profileBtn];
const mainContent = document.getElementById('mainContent');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mainContent.innerHTML = `<h2>${btn.innerText} 页面（占位）</h2>`;
    });
});
