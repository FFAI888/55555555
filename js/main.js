// 元素
const connectWalletBtn = document.getElementById('connectWalletBtn');
const inviteAddressInput = document.getElementById('inviteAddress');
const copyInviteBtn = document.getElementById('copyInviteAddress');
const mainContent = document.getElementById('mainContent');
const walletTop = document.getElementById('walletTop');

// 模拟函数
function getInviteAddressFromConfirmPage(){
    // 模拟获取邀请人地址，空字符串表示没有邀请人
    return "0xAbCd...1234";
}

function bindWalletToInvite(wallet, inviteAddress){
    console.log("绑定钱包", wallet, "到邀请人", inviteAddress);
}

// 显示主页
function showHomePage(){
    mainContent.innerHTML = `<h2>欢迎来到 DApp 主页！</h2>`;
}

// 显示确认关系页面
function showConfirmPage(){
    const html = `
    <div class="confirm-container">
        <h2>确认关系</h2>
        <div class="confirm-card">
            <div class="user-info">
                <img class="avatar" src="https://img.icons8.com/fluency/96/000000/user-male-circle.png" alt="用户A">
                <div class="user-name">用户A</div>
                <div class="wallet-address">0x1234...abcd</div>
            </div>
            <div class="arrow">→</div>
            <div class="user-info">
                <img class="avatar" src="https://img.icons8.com/fluency/96/000000/user-male-circle.png" alt="用户B">
                <div class="user-name">用户B</div>
                <div class="wallet-address">0xabcd...1234</div>
            </div>
        </div>
        <div class="confirm-buttons">
            <button class="confirm-btn">确认接收</button>
            <button class="confirm-btn">确认发送</button>
            <button class="confirm-btn">确认关系</button>
        </div>
    </div>
    `;
    mainContent.innerHTML = html;
}

// 钱包连接逻辑
connectWalletBtn.addEventListener('click', async () => {
    const account = "0xUserWalletAddress123";
    const inviteAddress = getInviteAddressFromConfirmPage();

    if(inviteAddress){
        inviteAddressInput.value = inviteAddress;
        bindWalletToInvite(account, inviteAddress);
        showHomePage();
    } else {
        showConfirmPage();
    }
});

// 复制邀请人地址
copyInviteBtn.addEventListener('click', () => {
    const addr = inviteAddressInput.value;
    if(addr){
        navigator.clipboard.writeText(addr).then(()=>alert("邀请人地址已复制"));
    } else {
        alert("邀请人地址为空");
    }
});

// 确认关系按钮事件
document.addEventListener('click', e=>{
    if(e.target.classList.contains('confirm-btn')){
        alert(e.target.innerText + ' 已点击');
    }
});
