// 生成特定范围的随机数函数
function getRandomUptime(min, max) {
    return Math.random() * (max - min) + min;
}

// 逐步增加状态条的宽度
function animateUptime(uptimeBar, targetUptime) {
    let currentUptime = 0; // 从0开始
    const updateSpeed = 1;  // 进度增长速度，值越小增长越慢

    const interval = setInterval(() => {
        // 每次增加指定的进度
        currentUptime += updateSpeed;

        // 当达到目标数值时停止
        if (currentUptime >= targetUptime) {
            currentUptime = targetUptime;
            clearInterval(interval);
        }

        // 更新状态条的宽度
        uptimeBar.style.width = currentUptime + "%";

        // 根据当前的 uptime 数值设置颜色
        if (currentUptime < 30) {
            uptimeBar.style.backgroundColor = 'red';
        } else if (currentUptime < 60) {
            uptimeBar.style.backgroundColor = 'yellow';
        } else {
            uptimeBar.style.backgroundColor = 'green';
        }

        // 更新文本显示 (数值 + 状态)
        let percentageText = uptimeBar.parentElement.parentElement.querySelector('.status-percentage');
        percentageText.textContent = currentUptime.toFixed(2) + "% " + getStatusText(currentUptime);
    }, 20);  // 每20毫秒更新一次
}

// 根据 uptime 数值返回状态文本
function getStatusText(uptime) {
    if (uptime >= 60) {
        return "空闲";
    } else if (uptime >= 30) {
        return "繁忙";
    } else {
        return "阻塞";
    }
}

// 更新每个状态条的 uptime 值
function updateUptime() {
    const uptimes = document.querySelectorAll('.uptime');

    uptimes.forEach(uptimeBar => {
        const min = parseFloat(uptimeBar.getAttribute('data-min')) || 0;
        const max = parseFloat(uptimeBar.getAttribute('data-max')) || 100;

        // 生成目标的随机 uptime 值
        let targetUptime = getRandomUptime(min, max);

        // 动画增加状态条的宽度直到达到目标值
        animateUptime(uptimeBar, targetUptime);
    });
}

// 初始调用一次，确保页面加载时有初始值
updateUptime();
