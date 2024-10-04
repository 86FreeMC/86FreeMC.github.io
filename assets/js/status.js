// 生成特定范围的随机数函数
function getRandomUptime(min, max) {
    return Math.random() * (max - min) + min;
}

// 更新每个状态条的 uptime 值
function updateUptimeRandomly() {
    // 获取所有状态条
    const uptimes = document.querySelectorAll('.uptime');

    uptimes.forEach(uptimeBar => {
        // 获取状态条的唯一ID或名称（如：服务器、主页等）
        const id = uptimeBar.parentElement.previousElementSibling.textContent.trim();
        const min = parseFloat(uptimeBar.getAttribute('data-min')) || 0;
        const max = parseFloat(uptimeBar.getAttribute('data-max')) || 100;

        // 从 localStorage 读取保存的 uptime 值，如果没有就生成新的
        let savedUptime = localStorage.getItem(id);
        let randomUptime = savedUptime ? parseFloat(savedUptime) : getRandomUptime(min, max);

        // 更新状态条的宽度
        uptimeBar.style.width = randomUptime + "%";

        // 根据 uptime 数值设置颜色
        if (randomUptime < 50) {
            uptimeBar.style.backgroundColor = 'red';  // 低于50%显示红色
        } else if (randomUptime < 80) {
            uptimeBar.style.backgroundColor = 'yellow';  // 低于80%显示黄色
        } else {
            uptimeBar.style.backgroundColor = 'green';  // 超过80%显示绿色
        }

        // 更新状态条下方的文本显示 (数值 + 状态)
        let percentageText = uptimeBar.parentElement.parentElement.querySelector('.status-percentage');
        percentageText.textContent = randomUptime.toFixed(2) + "% " + getStatusText(randomUptime);

        // 保存新的 uptime 到 localStorage，模拟下一次变化
        let newUptime = getRandomUptime(min, max);
        localStorage.setItem(id, newUptime.toFixed(2));  // 保存为字符串
    });
}

// 根据 uptime 数值返回状态文本
function getStatusText(uptime) {
    if (uptime >= 80) {
        return "空闲";
    } else if (uptime >= 50) {
        return "繁忙";
    } else {
        return "阻塞";
    }
}

// 每隔10秒随机更新一次 uptime，但刷新页面时不重置
setInterval(updateUptimeRandomly, 10000);

// 初始调用一次，确保页面加载时有初始值
updateUptimeRandomly();
