window.addEventListener('DOMContentLoaded', async () => {
    if(sessionStorage.getItem('walletConnected')!=='true'){
        alert("请先连接钱包！");
        window.location.href="login.html";
        return;
    }
    if(!window.ethereum){
        alert("未检测到钱包插件！");
        window.location.href="login.html";
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum,"any");

    async function updateWallet(){
        try{
            const accounts = await provider.listAccounts();
            if(accounts.length===0){
                alert("钱包未连接，请重新登录！");
                sessionStorage.removeItem('walletConnected');
                window.location.href="login.html";
                return;
            }
            const chainId = (await provider.getNetwork()).chainId;
            if(chainId!==1){
                alert("网络错误，请切换正确网络！");
            }
            document.getElementById('walletTop').textContent = accounts[0];
            document.getElementById('walletAddress').textContent = accounts[0];
            document.getElementById('walletTop').onclick=()=>{navigator.clipboard.writeText(accounts[0]); alert("钱包地址已复制");};
        }catch(err){
            console.error(err);
            alert("钱包异常，请重新登录！");
            sessionStorage.removeItem('walletConnected');
            window.location.href="login.html";
        }
    }

    await updateWallet();

    window.ethereum.on('accountsChanged', async accounts=>{
        if(accounts.length===0){
            alert("钱包已断开，请重新登录！");
            sessionStorage.removeItem('walletConnected');
            window.location.href="login.html";
        } else await updateWallet();
    });

    window.ethereum.on('chainChanged', chainIdHex=>{
        const chainId=parseInt(chainIdHex,16);
        if(chainId!==1) alert("网络切换错误，请切换正确网络！");
    });

    const buttons=document.querySelectorAll('.bottom-nav button');
    buttons.forEach(btn=>{
        btn.addEventListener('click',()=>{
            buttons.forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
        });
        btn.addEventListener('click', e=>{
            const ripple=document.createElement('span');
            ripple.className='ripple';
            btn.appendChild(ripple);
            const rect=btn.getBoundingClientRect();
            ripple.style.left=(e.clientX-rect.left)+'px';
            ripple.style.top=(e.clientY-rect.top)+'px';
            setTimeout(()=>ripple.remove(),600);
        });
    });
});
