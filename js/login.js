const connectBtn = document.getElementById('connectWalletBtn');
const status = document.getElementById('statusMessage');

async function connectWallet() {
    if(!window.ethereum){
        status.innerText = "请安装 MetaMask 或其他支持 BSC 的钱包！";
        return;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const network = await provider.getNetwork();
        if(network.chainId !== 56){
            status.innerText = "请切换到 BSC 主网！";
            return;
        }

        status.innerText = `已连接钱包: ${address}`;
        // 延迟跳转到主页
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (err) {
        console.error(err);
        status.innerText = "连接钱包失败，请重试！";
    }
}

connectBtn.addEventListener("click", connectWallet);
