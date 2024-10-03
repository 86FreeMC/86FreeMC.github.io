// JavaScript动态改变uptime条的颜色
document.querySelectorAll('.uptime').forEach(bar => {
    let uptime = parseFloat(bar.getAttribute('data-uptime'));

    // 设置宽度
    bar.style.width = uptime + "%";

    // 根据uptime百分比设置颜色
    if (uptime < 30) {
        bar.style.backgroundColor = 'red';  // 红色表示低于30%
    } else if (uptime < 60) {
        bar.style.backgroundColor = 'yellow';  // 黄色表示低于60%
    } else {
        bar.style.backgroundColor = '#2d8b45';  // 绿色表示高于60%
    }
});
