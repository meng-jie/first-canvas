var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
var RADIUS=8;

const endTime = new Date (2017,10,6,10,23,45);   //截止时间
var curShowTimeSeconds = 0;  //对当前时间的初始化

var balls = [];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CCOO","#669900","#FFBB33","#FF8800","FF4444","#CC0000"];

window.onload = function () {
    var canvas=document.getElementById('canvas');    //调用canvas
    var context=canvas.getContext("2d");   //调用绘图的上下文环境

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;  //调用全局变量

    curShowTimeSeconds = getCurrentShowTimeSeconds();   //差值

    setInterval(      //动画效果
        function () {
            render(context);   //绘图函数
            update();     //数字改变的函数
        },
        50   //帧，即每秒播放速度,数越大，速度越快
    );
};

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();  //得到的是毫秒数
    ret = Math.round(ret/1000);    //转换成秒

    return ret >=0?ret:0;
}

function update() {

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt((nextShowTimeSeconds - nextHours*3600)/60);
    var nextSeconds=parseInt(nextShowTimeSeconds%60);

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds - curHours*3600)/60);
    var curSeconds=parseInt(curShowTimeSeconds%60);

    if(nextSeconds !== curShowTimeSeconds){

        if(parseInt(curHours/10) !== parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT ,MARGIN_TOP,parseInt(curHours/10));   //加小球函数，获得小球位置及此时的数字
        }  //小时的是十位数字改变时进行加小球的操作
        if(parseInt(curHours%10) !== parseInt(nextHours%10)) {
            addBalls(MARGIN_LEFT +15*(RADIUS+1), MARGIN_TOP, parseInt(curHours % 10));
        }
        if(parseInt(curMinutes/10) !== parseInt(nextMinutes/10)) {
            addBalls(MARGIN_LEFT +39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if(parseInt(curMinutes%10) !== parseInt(nextMinutes%10)) {
            addBalls(MARGIN_LEFT +54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes % 10));
        }
        if(parseInt(curSeconds/10) !== parseInt(nextSeconds/10)) {
            addBalls(MARGIN_LEFT +78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if(parseInt(curSeconds%10) !== parseInt(nextSeconds%10)) {
            addBalls(MARGIN_LEFT +93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();   //对小球进行更新操作
}

function updateBalls() {

    for(var i=0;i<balls.length;i++) {
        balls[i].x += balls[i].vx;  //x，y轴的运动变化
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }   
}

function addBalls(x,y,num){

    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j] === 1)
            {   //添加小球
                var aBall={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                     };
                     balls.push(aBall);
            }
}


function render(cxt) {
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds - hours*3600)/60);
    var seconds=parseInt(curShowTimeSeconds%60);  //定义时间

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);  //将数拆开，一个数一个数的绘制
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    for(var i=0;i<balls.length;i++)   //对加的小球的绘制
    {
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill()
    }
}

function renderDigit(x,y,num,cxt){
    cxt.fillStyle="rgb(0,102,153)";

    for(var i=0;i<digit[num].length;i++)   //i代表行，j代表列，num代表数，.length代表方法
        for(var j=0;j<digit[num][i].length;j++)     //1是矩阵里的，代表绘制小球
        {
            if(digit[num][i][j] === 1) {

                cxt.beginPath();  //绘图的一个区间
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill()
            }
        }
}
