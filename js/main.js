// 页面内容切换
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".bottom-nav a");
    const mainContent = document.getElementById("mainContent");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // 移除 active
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // 页面切换
            const page = link.dataset.page;
            if (page === "home") {
                mainContent.innerHTML = `<h2>首页</h2><p>欢迎来到 RongChain DApp 首页！</p>`;
            } else if (page === "group") {
                mainContent.innerHTML = `<h2>拼团</h2><p>这里是拼团功能页面。</p>`;
            } else if (page === "earn") {
                mainContent.innerHTML = `<h2>赚币</h2><p>在这里可以赚取代币。</p>`;
            } else if (page === "swap") {
                mainContent.innerHTML = `<h2>兑换</h2><p>在这里可以兑换代币。</p>`;
            } else if (page === "profile") {
                mainContent.innerHTML = `
                    <div class="profile">
                        <img src="https://via.placeholder.com/80" alt="头像">
                        <h3>用户中心</h3>
                        <p>钱包: ${document.getElementById("walletAddress").innerText}</p>
                        <p>余额: 0.00 ETH</p>
                        <button onclick="alert('修改资料')">修改资料</button>
                        <button onclick="logout()">退出登录</button>
                    </div>
                `;
            }
        });
    });

    // 钱包地址点击复制
    const walletEl = document.getElementById("walletAddress");
    if (walletEl) {
        walletEl.addEventListener("click", () => {
            navigator.clipboard.writeText(walletEl.innerText).then(()=>{
                alert("钱包地址已复制");
            });
        });
    }
});

// 退出登录
function logout() {
    window.location.href = "login.html";
}
