/* 获取导航按钮和主内容元素 */
const homeBtn=document.getElementById('homeBtn');
const groupBtn=document.getElementById('groupBtn');
const earnBtn=document.getElementById('earnBtn');
const swapBtn=document.getElementById('swapBtn');
const profileBtn=document.getElementById('profileBtn');
const mainContent=document.getElementById('mainContent');
const bottomNav=document.getElementById('bottomNav');

/* 新增：右上角钱包地址显示和点击复制 */
const walletTop=document.getElementById('walletTop');
const account="0x1234567890abcdef1234567890abcdef12345678"; // 模拟钱包地址

if(walletTop){
    walletTop.innerText=account; // 显示钱包地址
    walletTop.addEventListener('click',()=>{
        navigator.clipboard.writeText(account); // 复制到剪贴板
        alert('已复制钱包地址: '+account);
    });
}

/* 导航切换函数 */
function setActive(btn){
    [homeBtn,groupBtn,earnBtn,swapBtn,profileBtn].forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
}

/* 更新主内容 */
function updateContent(title,extraHtml=''){
    mainContent.innerHTML=`<h2>${title}</h2><div class="wallet-address">${account?"已连接钱包: "+account:"未获取到钱包地址"}</div>${extraHtml}`;
}

/* 点击导航绑定 */
homeBtn.addEventListener('click',e=>{setActive(homeBtn);updateContent('欢迎来到 DApp 主页！');});
groupBtn.addEventListener('click',e=>{setActive(groupBtn);updateContent('这里是拼团页面（占位）');});
earnBtn.addEventListener('click',e=>{setActive(earnBtn);updateContent('这里是赚币页面（占位）');});
swapBtn.addEventListener('click',e=>{setActive(swapBtn);updateContent('这里是兑换页面（占位）');});
profileBtn.addEventListener('click',e=>{
    setActive(profileBtn);
    const html=`<div class="profile-container">
        <div class="profile-avatar"></div>
        <div class="profile-info">用户名: 占位用户<br>钱包状态: ${account?'已连接':'未连接'}<br>钱包余额: 0.0 ETH</div>
        <div class="profile-buttons"><button onclick="alert('修改资料功能开发中')">修改资料</button><button onclick="alert('退出登录功能开发中')">退出登录</button></div>
    </div>`;
    updateContent('个人中心',html);
});

document.addEventListener('DOMContentLoaded',()=>{setActive(homeBtn);updateContent('欢迎来到 DApp 主页！');});
