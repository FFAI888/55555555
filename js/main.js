// main.js v0.39

// =============== 导航逻辑 ===============
const homeBtn=document.getElementById('homeBtn');
const groupBtn=document.getElementById('groupBtn');
const earnBtn=document.getElementById('earnBtn');
const swapBtn=document.getElementById('swapBtn');
const profileBtn=document.getElementById('profileBtn');
const mainContent=document.getElementById('mainContent');

// 新增：钱包显示区域
const walletAddressEl=document.getElementById('walletAddress');
const walletBalanceEl=document.getElementById('walletBalance');

let account=null;
let provider, signer;

// =============== 新增：连接钱包并实时获取余额 ===============
async function connectWallet(){
    if(window.ethereum){
        provider=new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts",[]);
        signer=provider.getSigner();
        account=await signer.getAddress();
        walletAddressEl.innerText=shortAddr(account);
        updateBalance();
        listenTx();
    }else{
        alert("请安装 MetaMask 等钱包扩展");
    }
}

// 地址缩写函数
function shortAddr(addr){
    return addr.slice(0,6)+"..."+addr.slice(-4);
}

// 更新余额
async function updateBalance(){
    if(!signer) return;
    const balance=await provider.getBalance(account);
    const ethBalance=ethers.utils.formatEther(balance);
    walletBalanceEl.innerText=`余额: ${parseFloat(ethBalance).toFixed(4)} ETH`;
    document.getElementById("walletInfo").innerText=`钱包: ${account}\n余额: ${ethBalance} ETH`;
}

// 监听交易事件
function listenTx(){
    provider.on("block", async ()=>{
        const txs=await provider.getHistory(account, "latest");
        if(txs && txs.length>0){
            const last=txs[txs.length-1];
            const isSend=last.from.toLowerCase()===account.toLowerCase();
            const type=isSend?"发送":"接收";
            const value=ethers.utils.formatEther(last.value);
            alert(`交易提示: ${type} ${value} ETH`);
        }
        updateBalance();
    });
}

// =============== 页面导航逻辑 ===============
function setActive(btn){
    [homeBtn,groupBtn,earnBtn,swapBtn,profileBtn].forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
}

function updateContent(title,extraHtml=''){
    mainContent.innerHTML=`<h2>${title}</h2><div class="wallet-address">${account?"已连接钱包: "+account:"未获取到钱包地址"}</div>${extraHtml}`;
}

homeBtn.addEventListener('click',()=>{setActive(homeBtn);updateContent('欢迎来到 DApp 主页！');});
groupBtn.addEventListener('click',()=>{setActive(groupBtn);updateContent('这里是拼团页面（占位）');});
earnBtn.addEventListener('click',()=>{setActive(earnBtn);updateContent('这里是赚币页面（占位）');});
swapBtn.addEventListener('click',()=>{setActive(swapBtn);updateContent('这里是兑换页面（占位）');});
profileBtn.addEventListener('click',()=>{
    setActive(profileBtn);
    const html=`<div class="profile-container">
        <div class="profile-avatar"></div>
        <div class="profile-info">用户名: 占位用户<br>钱包状态: ${account?'已连接':'未连接'}</div>
    </div>`;
    updateContent('个人中心',html);
});

document.addEventListener('DOMContentLoaded',()=>{
    setActive(homeBtn);
    updateContent('欢迎来到 DApp 主页！');
    connectWallet();
});
