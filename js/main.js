// main.js
window.addEventListener('DOMContentLoaded', () => {
    const walletTop = document.getElementById('walletTop');
    const walletAddress = document.getElementById('walletAddress');

    // 模拟钱包地址
    const address = '0x1234...ABCD';
    walletTop.textContent = address;
    walletAddress.textContent = address;

    // 点击复制
    walletTop.addEventListener('click', () => {
        navigator.clipboard.writeText(address).then(() => {
            alert('钱包地址已复制');
        });
    });

    // 底部导航示例
    const buttons = document.querySelectorAll('.bottom-nav button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Ripple 点击效果
    buttons.forEach(btn => {
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
