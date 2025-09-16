window.addEventListener('DOMContentLoaded', async () => {

    // 安全检测：必须登录
    if(sessionStorage.getItem('walletConnected') !== 'true'){
        alert("请先连接钱包！");
        window.location.href = "login.html";
        return;
    }

    if(!window.ethereum){
        alert("未检测到钱包插件，请安装钱包！");
        window.location.href = "login.html";
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    async function updateWallet(){
        try{
            const accounts = await provider.listAccounts();
            if(accounts.length === 0){
                alert("钱包未连接，请重新登录！");
                sessionStorage.removeItem('walletConnected');
                window.location.href = "login.html";
                return;
            }
            const chainId = (await provider.getNetwork()).chainId;
            if(chainId !== 1){ // 可改为你支持的网络ID
                alert("网络错误，请切换正确网络！");
            }

            const walletTop = document.getElementById('walletTop');
            const walletAddress = document.getElementById('walletAddress');
            walletTop.textContent = accounts[0];
            walletAddress.textContent = accounts[0];

            walletTop.onclick = () => {
                navigator.clipboard.writeText(accounts[0]);
                alert("钱包地址已复制");
            };
        }catch(err){
            console.error(err);
            alert("钱包异常，请重新登录！");
            sessionStorage.removeItem('walletConnected');
            window.location.href = "login.html";
        }
    }

    // 首次更新
    await updateWallet();

    // 监听账户变化
    window.ethereum.on('accountsChanged', async (accounts) => {
        if(accounts.length === 0){
            alert("钱包已断开，请重新登录！");
            sessionStorage.removeItem('walletConnected');
            window.location.href = "login.html";
        } else {
            await updateWallet();
        }
    });

    // 监听网络变化
    window.ethereum.on('chainChanged', async (chainIdHex) => {
        const chainId = parseInt(chainIdHex,16);
        if(chainId !== 1){
            alert("网络切换错误，请切换正确网络！");
        }
    });

    // 底部导航和Ripple效果
    const buttons = document.querySelectorAll('.bottom-nav button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
        btn.addEventListener('click', e => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            btn.appendChild(ripple);
            const rect = btn.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            setTimeout(() => ripple.remove(), 600);
        });
    });

});
