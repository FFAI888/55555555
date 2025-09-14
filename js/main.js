// 公共元素
const connectWalletBtn = document.getElementById('connectWalletBtn');
const inviteAddressInput = document.getElementById('inviteAddress');
const copyInviteBtn = document.getElementById('copyInviteAddress');

// 模拟获取邀请人地址
function getInviteAddressFromConfirmPage(){
    return "0xAbCd...1234";
}

// 绑定钱包与邀请人
function bindWalletToInvite(wallet, inviteAddress){
    console.log("绑定钱包", wallet, "到邀请人", inviteAddress);
}

// 登录页面逻辑
if(connectWalletBtn){
    connectWalletBtn.addEventListener('click', async () => {
        const account = "0xUserWalletAddress123";
        const inviteAddress = getInviteAddressFromConfirmPage();

        if(inviteAddress){
            inviteAddressInput.value = inviteAddress;
            bindWalletToInvite(account, inviteAddress);
            localStorage.setItem('walletBound', 'true');
            localStorage.setItem('inviteAddress', inviteAddress);
            window.location.href = 'home.html';
        } else {
            window.location.href = 'confirm.html';
        }
    });
}

// 页面刷新自动跳转
if(window.location.pathname.endsWith('login.html')){
    if(localStorage.getItem('walletBound') === 'true'){
        window.location.href = 'home.html';
    }
}

// 复制邀请人地址
if(copyInviteBtn){
    copyInviteBtn.addEventListener('click', () => {
        const addr = inviteAddressInput.value;
        if(addr){
            navigator.clipboard.writeText(addr).then(()=>alert("邀请人地址已复制"));
        } else {
            alert("邀请人地址为空");
        }
    });
}

// 确认关系页面按钮事件
document.addEventListener('click', e=>{
    if(e.target.classList.contains('confirm-btn')){
        alert(e.target.innerText + ' 已点击');
        localStorage.setItem('walletBound', 'true'); // 点击确认关系后绑定
        window.location.href = 'home.html';
    }
});
