/* 钱包地址显示 */
const walletTop = document.getElementById('walletTop');
const urlParams = new URLSearchParams(window.location.search);
const account = urlParams.get('account');
walletTop.innerText = account || "未连接钱包";

/* 点击复制钱包地址 */
walletTop.addEventListener('click', ()=>{
    if(!account) return;
    navigator.clipboard.writeText(account).then(()=>alert("钱包地址已复制！"));
});

/* 导航和内容逻辑 */
const mainContent = document.getElementById('mainContent');
const homeBtn = document.getElementById('homeBtn');
const groupBtn = document.getElementById('groupBtn');
const earnBtn = document.getElementById('earnBtn');
const swapBtn = document.getElementById('swapBtn');
const profileBtn = document.getElementById('profileBtn');
const buttons = [homeBtn, groupBtn, earnBtn, swapBtn, profileBtn];

function setActive(btn){
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
}

function updateContent(title, extraHtml=''){
    mainContent.innerHTML = `<h2>${title}</h2><div class="wallet-address">${account?"已连接钱包: "+account:"未获取到钱包地址"}</div>${extraHtml}`;
}

/* 导航绑定 */
homeBtn.addEventListener('click', ()=>{setActive(homeBtn);updateContent('欢迎来到 DApp 主页！');});
groupBtn.addEventListener('click', ()=>{setActive(groupBtn);updateContent('这里是拼团页面（占位）');});
earnBtn.addEventListener('click', ()=>{setActive(earnBtn);updateContent('这里是赚币页面（占位）');});
swapBtn.addEventListener('click', ()=>{setActive(swapBtn);updateContent('这里是兑换页面（占位）');});
profileBtn.addEventListener('click', ()=>{setActive(profileBtn);updateContent('个人中心（占位）');});

/* 页面初始化 */
document.addEventListener('DOMContentLoaded', ()=>{
    setActive(homeBtn);
    updateContent('欢迎来到 DApp 主页！');
});
