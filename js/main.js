document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".bottom-nav a");
    const mainContent = document.getElementById("mainContent");

    // 获取 URL 钱包参数
    const urlParams = new URLSearchParams(window.location.search);
    const account = urlParams.get('account');
    const walletEl = document.getElementById("walletAddress");

    // 没登录 → 跳 login
    if (!account && window.location.pathname.endsWith("index.html")) {
        window.location.href = "login.html";
        return;
    }
    if (walletEl && account) walletEl.innerText = account;

    // 导航切换 & ripple
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            // ripple
            const circle = document.createElement("span");
            const diameter = Math.max(link.clientWidth, link.clientHeight);
            const radius = diameter/2;
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - link.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - link.offsetTop - radius}px`;
            circle.classList.add("ripple");
            const ripple = link.getElementsByClassName("ripple")[0];
            if (ripple) ripple.remove();
            link.appendChild(circle);

            // 切换 active
            navLinks.forEach(l=>l.classList.remove("active"));
            link.classList.add("active");

            // 页面内容
            const page = link.dataset.page;
            if(page==="home") mainContent.innerHTML=`<h2>首页</h2><p>欢迎来到 RongChain DApp 首页！</p>`;
            else if(page==="group") mainContent.innerHTML=`<h2>拼团</h2><p>这里是拼团功能页面。</p>`;
            else if(page==="earn") mainContent.innerHTML=`<h2>赚币</h2><p>在这里可以赚取代币。</p>`;
            else if(page==="swap") mainContent.innerHTML=`<h2>兑换</h2><p>在这里可以兑换代币。</p>`;
            else if(page==="profile") mainContent.innerHTML=`
                <div class="profile">
                    <img src="https://via.placeholder.com/80" alt="头像">
                    <h3>用户中心</h3>
                    <p>钱包: ${walletEl.innerText}</p>
                    <p>余额: 0.00 ETH</p>
                    <button onclick="alert('修改资料')">修改资料</button>
                    <button onclick="logout()">退出登录</button>
                </div>
            `;
        });
    });

    // 钱包地址点击复制
    if(walletEl){
        walletEl.addEventListener("click",()=>{
            navigator.clipboard.writeText(walletEl.innerText).then(()=>{alert("钱包地址已复制");});
        });
    }
});

function logout(){window.location.href="login.html";}
