// ====== 变量绑定 ======
const homeBtn = document.getElementById('homeBtn');
const groupBtn = document.getElementById('groupBtn');
const earnBtn = document.getElementById('earnBtn');
const swapBtn = document.getElementById('swapBtn');
const profileBtn = document.getElementById('profileBtn');
const bottomNav = document.getElementById('bottomNav');
const mainContent = document.getElementById('mainContent');
const walletTop = document.getElementById('walletTop');
const walletAddressDiv = document.getElementById('walletAddress');

const buttons = [homeBtn, groupBtn, earnBtn, swapBtn, profileBtn];

const navGradients = {
    homeBtn:'linear-gradient(270deg,#f0d6ff,#e0b3ff,#f0d6ff)',
    groupBtn:'linear-gradient(270deg,#fff3e6,#ffe6cc,#fff3e6)',
    earnBtn:'linear-gradient(270deg,#f3ffe6,#e6ffcc,#f3ffe6)',
    swapBtn:'linear-gradient(270deg,#e6f0ff,#cce0ff,#e6f0ff)',
    profileBtn:'linear-gradient(270deg,#faf0ff,#f5e6ff,#faf0ff)'
};
const pageBackgrounds = {
    homeBtn:'#f5f7fa',
    groupBtn:'#fff3e6',
    earnBtn:'#f3ffe6',
    swapBtn:'#e6f0ff',
    profileBtn:'#faf0ff'
};

// ====== URL 获取钱包地址 ======
function getAccountFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('account') || '';
}
const account = getAccountFromUrl();
if(account){
    walletTop.innerText = account;
    walletAddressDiv.innerText = '已连接钱包: '+account;
}

// ====== 导航切换 ======
function setActive(btn){
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    bottomNav.style.background = navGradients[btn.id] || navGradients.homeBtn;
    document.body.style.backgroundColor = pageBackgrounds[btn.id] || '#f0f2f5';
}

function updateContent(title,extraHtml=''){
    mainContent.innerHTML = `<h2>${title}</h2><div class="wallet-address">${account?"已连接钱包: "+account:"未获取到钱包地址"}</div>${extraHtml}`;
}

// ====== Ripple 效果 ======
function addRippleEffect(e){
    const t = e.currentTarget;
    const rect = t.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className='ripple';
    ripple.style.left = x+'px';
    ripple.style.top = y+'px';
    t.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
}

// ====== 导航按钮绑定 ======
homeBtn.addEventListener('click', e=>{
    setActive(homeBtn);
    updateContent('欢迎来到 DApp 主页！');
    addRippleEffect(e);
});
groupBtn.addEventListener('click', e=>{
    setActive(groupBtn);
    updateContent('这里是拼团页面（占位）');
    addRippleEffect(e);
});
earnBtn.addEventListener('click', e=>{
    setActive(earnBtn);
    updateContent('这里是赚币页面（占位）');
    addRippleEffect(e);
});
swapBtn.addEventListener('click', e=>{
    setActive(swapBtn);
    updateContent('这里是兑换页面（占位）');
    addRippleEffect(e);
});
profileBtn.addEventListener('click', e=>{
    setActive(profileBtn);
    const html=`<div class="profile-container">
        <div class="profile-avatar"></div>
        <div class="profile-info">
            用户名: 占位用户<br>
            钱包状态: ${account?'已连接':'未连接'}<br>
            钱包余额: 0.0 ETH
        </div>
        <div class="profile-buttons">
            <button onclick="alert('修改资料功能开发中')">修改资料</button>
            <button id="logoutBtn">退出登录</button>
        </div>
    </div>`;
    updateContent('个人中心',html);
    addRippleEffect(e);

    // ====== 退出按钮功能 ======
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn){
        logoutBtn.addEventListener('click', ()=>{
            window.location.href = 'login.html';
        });
    }
});

// ====== 页面加载默认显示 ======
document.addEventListener('DOMContentLoaded', ()=>{
    setActive(homeBtn);
    updateContent('欢迎来到 DApp 主页！');
});
