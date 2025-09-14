/* 钱包地址显示和自动缩放 */
function setWalletAddress(address){
    const walletTop = document.getElementById('walletTop');
    walletTop.innerText = address || "未连接钱包";
    walletTop.style.fontSize = "12px";
    const maxWidth = 200;
    let fontSize = 12;
    const testDiv = document.createElement('div');
    testDiv.style.position = 'absolute';
    testDiv.style.visibility = 'hidden';
    testDiv.style.whiteSpace = 'nowrap';
    document.body.appendChild(testDiv);
    testDiv.innerText = address;
    while(testDiv.offsetWidth > maxWidth && fontSize > 8){
        fontSize -= 1;
        testDiv.style.fontSize = fontSize + "px";
    }
    walletTop.style.fontSize = fontSize + "px";
    document.body.removeChild(testDiv);
}

/* 点击复制钱包地址 */
const walletTop = document.getElementById('walletTop');
walletTop.addEventListener('click', () => {
    const address = walletTop.innerText;
    if(!address || address==="未连接钱包") return;
    navigator.clipboard.writeText(address).then(() => {
        alert("钱包地址已复制！");
    }).catch(()=>alert("复制失败，请手动复制"));
});

/* 获取钱包地址参数 */
const urlParams = new URLSearchParams(window.location.search);
const account = urlParams.get('account');
setWalletAddress(account);

/* 导航和内容逻辑 */
const mainContent=document.getElementById('mainContent');
const bottomNav=document.getElementById('bottomNav');
const homeBtn=document.getElementById('homeBtn');
const groupBtn=document.getElementById('groupBtn');
const earnBtn=document.getElementById('earnBtn');
const swapBtn=document.getElementById('swapBtn');
const profileBtn=document.getElementById('profileBtn');
const buttons=[homeBtn,groupBtn,earnBtn,swapBtn,profileBtn];

const navGradients={
    homeBtn:'linear-gradient(270deg,#e0e0e0cc,#d0e6f5cc,#e0e0e0cc)',
    groupBtn:'linear-gradient(270deg,#ffe6cc,#ffd9b3,#ffe6cc)',
    earnBtn:'linear-gradient(270deg,#e6f5cc,#d9f5b3,#e6f5cc)',
    swapBtn:'linear-gradient(270deg,#cce0ff,#b3d9ff,#cce0ff)',
    profileBtn:'linear-gradient(270deg,#f0d6ff,#e0b3ff,#f0d6ff)'
};
const pageBackgrounds={homeBtn:'#f5f7fa',groupBtn:'#fff3e6',earnBtn:'#f3ffe6',swapBtn:'#e6f0ff',profileBtn:'#faf0ff'};

function setActive(btn){
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    bottomNav.style.background = navGradients[btn.id]||navGradients.homeBtn;
    document.body.style.backgroundColor = pageBackgrounds[btn.id]||'#f0f2f5';
}

function updateContent(title,extraHtml=''){
    mainContent.innerHTML=`<h2>${title}</h2><div class="wallet-address">${account?"已连接钱包: "+account:"未获取到钱包地址"}</div>${extraHtml}`;
}

function addRippleEffect(e){
    const t=e.currentTarget;
    const rect=t.getBoundingClientRect();
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;
    const ripple=document.createElement('span');
    ripple.className='ripple';
    ripple.style.left=x+'px';
    ripple.style.top=y+'px';
    t.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
}

/* 导航绑定 */
homeBtn.addEventListener('click',e=>{setActive(homeBtn);updateContent('欢迎来到 DApp 主页！');addRippleEffect(e);});
groupBtn.addEventListener('click',e=>{setActive(groupBtn);updateContent('这里是拼团页面（占位）');addRippleEffect(e);});
earnBtn.addEventListener('click',e=>{setActive(earnBtn);updateContent('这里是赚币页面（占位）');addRippleEffect(e);});
swapBtn.addEventListener('click',e=>{setActive(swapBtn);updateContent('这里是兑换页面（占位）');addRippleEffect(e);});
profileBtn.addEventListener('click',e=>{
    setActive(profileBtn);
    const html=`<div class="profile-container">
        <div class="profile-avatar"></div>
        <div class="profile-info">用户名: 占位用户<br>钱包状态: ${account?'已连接':'未连接'}<br>钱包余额: 0.0 ETH</div>
        <div class="profile-buttons"><button onclick="alert('修改资料功能开发中')">修改资料</button><button onclick="alert('退出登录功能开发中')">退出登录</button></div>
    </div>`;
    updateContent('个人中心',html);
    addRippleEffect(e);
});

document.addEventListener('DOMContentLoaded',()=>{setActive(homeBtn);updateContent('欢迎来到 DApp 主页！');});
