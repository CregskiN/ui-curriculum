/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var rounds = [];
var WIDTH = document.documentElement.clientWidth;
var HEIGHT = document.documentElement.clientHeight;
var initRoundPopulation = 80; // 初始化圆的个数
canvas.width = WIDTH;
canvas.height = HEIGHT;

/**
 * 定义一个圆
 * @param index 圆下标
 * @param x
 * @param y
 */
function Round_item(index, x, y) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = Math.random() * 2 + 1;
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = 'rgba(255,255,255,' + alpha + ')';
}

Round_item.prototype.draw = function () {
    context.fillStyle = this.color;
    context.shadowBlur = this.r * 2;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();
};

Round_item.prototype.move = function () {
    this.y -= 0.15;
    if (this.y <= -10) {
        this.y = HEIGHT + 10;
    }
    this.draw();
};

/**
 * 动画：清理上一帧，渲染下一帧
 */
function animate() {
    context.clearRect(0, 0, WIDTH, HEIGHT);

    for (var round of rounds) {
        round.move();
    }
    requestAnimationFrame(animate);
}

/**
 * 
 * 初始化
 */
function init() {
    for (var i = 0; i < initRoundPopulation; i++) {
        rounds[i] = new Round_item(i, Math.random() * WIDTH, Math.random() * HEIGHT);
        rounds[i].draw();
    }
    animate();
}

init();