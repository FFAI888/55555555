// BSC 链代币合约地址
const BSC_TOKENS = {
    USDT: "0x55d398326f99059ff775485246999027b3197955",
    CRC: "0x5b2fe2b06e714b7bea4fd35b428077d850c48087",
    RongChain: "0x0337a015467af6605c4262d9f02a3dcd8b576f7e"
};
const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)","function decimals() view returns (uint8)"];

// 元素
const walletFull = document.getElementById('walletAddressFull');
const tokenBalances = document.getElementById('tokenBalances');
const connectWalletBtn = document.getElementById('connectWalletBtn');

async function connectWallet() {
    if(!window.ethereum){ alert("请安装MetaMask或支持BSC的钱包！"); return; }
    const provider = new ethers.BrowserProvider(window.ethereum);
    try{
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        walletFull.innerText = address;

        const network = await provider.getNetwork();
        if(network.chainId !== 56){ alert("请切换到BSC主网！"); }

    }catch(err){ console.error(err); alert("连接钱包失败！"); }
}
connectWalletBtn.addEventListener("click", connectWallet);

// v1.2 导航、Ripple、页面切换逻辑
const homeBtn=document.getElementById('homeBtn');
const groupBtn=document.getElementById('groupBtn');
const earnBtn=document.getElementById('earnBtn');
const swapBtn=document.getElementById('swapBtn');
const profileBtn=document.getElementById('profileBtn');
const bottomNav=document.getElementById('bottomNav');
const mainContent=document.getElementById('mainContent');
const buttons=[homeBtn,groupBtn,earnBtn,swapBtn,profileBtn];

function setActive(btn){
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.body.style.backgroundColor = "#f0f2f5";
}
function updateContent(title,extraHtml=''){ mainContent.innerHTML=`<h2>${title}</h2>${extraHtml}`; }
function addRippleEffect(e){const t=e.currentTarget;const rect=t.getBoundingClientRect();const x=e.clientX-rect.left;const y=e.clientY-rect.top;const ripple=document.createElement('span');ripple.className='ripple';ripple.style.left=x+'px';ripple.style.top=y+'px';t.appendChild(ripple);setTimeout(()=>ripple.remove(),600);}

// 导航按钮
homeBtn.addEventListener('click',e=>{setActive(homeBtn);updateContent('欢迎来到 DApp 主页！');addRippleEffect(e);});
groupBtn.addEventListener('click',e=>{setActive(groupBtn);updateContent('这里是拼团页面（占位）');addRippleEffect(e);});
earnBtn.addEventListener('click',e=>{setActive(earnBtn);updateContent('这里是赚币页面（占位）');addRippleEffect(e);});
swapBtn.addEventListener('click',e=>{setActive(swapBtn);updateContent('这里是兑换页面（占位）');addRippleEffect(e);});
profileBtn.addEventListener('click',e=>{
    setActive(profileBtn);
    const html = `
        <div class="profile-container">
            <div class="profile-avatar"></div>
            <div class="profile-info">
                用户名: 占位用户<br>
                钱包状态: ${walletFull.innerText?'已连接':'未连接'}<br>
                钱包地址: ${walletFull.innerText || '未连接'}
            </div>
            <div class="profile-tokens">
                <h4>代币余额：</h4>
                <div>稳定币 USDT: 0.00</div>
                <div>消费币 CRC: 0.00</div>
                <div>平台币 RongChain: 0.00</div>
            </div>
            <div class="profile-buttons">
                <button onclick="alert('修改资料功能开发中')">修改资料</button>
                <button onclick="alert('退出登录功能开发中')">退出登录</button>
            </div>
        </div>
    `;
    updateContent('个人中心', html);

    if(walletFull.innerText && walletFull.innerText!=='未连接钱包'){
        displayTokenBalancesInProfile();
    }
    addRippleEffect(e);
});

// 显示余额在个人中心
async function displayTokenBalancesInProfile(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const address = walletFull.innerText;
    const tokenDivs = document.querySelectorAll('.profile-tokens div');
    for(const [i,[name,addr]] of Object.entries(Object.entries(BSC_TOKENS))){
        const tokenContract = new ethers.Contract(addr,ERC20_ABI,provider);
        const decimals = await tokenContract.decimals();
        const balanceRaw = await tokenContract.balanceOf(address);
        const balance = Number(balanceRaw)/10**decimals;
        const displayName = name==="USDT"?"稳定币 USDT":name==="CRC"?"消费币 CRC":"平台币 RongChain";
        tokenDivs[i].innerText = `${displayName}: ${balance.toFixed(4)}`;
    }
}
