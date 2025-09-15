// ====== 从 URL 获取钱包地址 ======
function getAccountFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('account');
}

// ====== 隐藏钱包地址中间部分 ======
function hideWalletAddress(address){
    if(!address) return '';
    const start = address.slice(0,6);   // 前6位
    const end = address.slice(-4);     // 后4位
    return start + '...' + end;
}

// ====== 初始化页面 ======
const walletTop = document.getElementById('walletTop');
const walletAddressDiv = document.getElementById('walletAddress');

const account = getAccountFromUrl();
if(account){
    const hidden = hideWalletAddress(account);
    walletTop.innerText = hidden;           // 顶部显示缩短后的地址
    walletAddressDiv.innerText = '已连接钱包: ' + hidden; // 主体显示缩短后的地址
}

// ====== 底部导航切换逻辑 ======
const navButtons = document.querySelectorAll('.bottom-nav button');
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.getAttribute('data-page');

        // Ripple 水波纹效果
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // 页面切换
        switch(page){
            case 'home':
                window.location.href = 'index.html' + (account ? '?account='+account : '');
                break;
            case 'group':
                alert('拼团页面开发中...');
                break;
            case 'earn':
                alert('赚币页面开发中...');
                break;
            case 'swap':
                alert('兑换页面开发中...');
                break;
            case 'profile':
                window.location.href = 'profile.html' + (account ? '?account='+account : '');
                break;
        }
    });
});
