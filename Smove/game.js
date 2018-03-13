var canvas = document.getElementById('palette');
var context = canvas.getContext('2d');
var midx = canvas.width / 2 - 150;
var ball= new Ball(midx + 50, 450, 20, 100);
var arrow = new Arrow(midx + 50, 350);
var grid = new Grid()
var angle = 0;
var timer;
var judgefourth = false;
//arrow.x = canvas.width/2;
//arrow.y = canvas.height/2;
var then = Date.now();
var whole_level = 1;
var myenermy = new wholeEnermy(whole_level);
var count = 0;
var writecount = 0;
var controlwrite = false;
var mywrite = new LevelWrite();
var gamestart = false;
var first_level = false;
var second_level = false;
var third_level = false;
var enermyone;
var enermysecond;
var enermyThird;
var enermyFourth;
var enermyFifth;
var enermySixth;
var judgethird = false;
var registscore = 0;
var eat = false;
var score = 0;
var globalx = midx + 50;
var globaly = 350;
var start = false;
var restart = false;
function Grid() {
    this.yheight = 100;
    this.xwidth = 100;
    this.radio = 50;


}
function Enermy(x, y, speed, direction, level, a)
{
   this.x = x||-100;
   this.y = y||350;
   this.direction = direction||0;
   this.speed = speed || 1;
   this.a = a || 0;
   this.level = level || 1;
   this.rx = x||-100;
   this.ry = y||350;
   this.rdirection = direction;
   this.rspeed = speed;
   this.ra = a ;
   this.rlevel = level ;
   this.reset = function () {
       this.x = this.rx;
       this.y = this.ry;
       this.level = this.rlevel;
       this.a = this.ra;
       this.direction = this.rdirection

   }
   this.moveUp = function(){
        this.speed += this.a;
        this.y -= this.speed;
        if(this.y <-50){
            //防止超出上边界
            var px = midx + 50 + (parseInt(10 * Math.random()) % 3) * 100;
            if(px >= 1150)
                px -= 300;
            this.y = -10;
            this.x = px;
            this.direction = 1;
        }
    };

    //向右移动
    this.moveRight = function(){
        this.speed += this.a;
        this.x += this.speed;
        var maxX = canvas.width - this.radius;
        if(this.x > 1950){
            //防止超出右边界
            //this.x -= this.speed;
            this.y = 350 + (parseInt(10 * Math.random()) % 3) * 100;
            if(this.y >= 650)
                this.y -= 300;
            //var y_pos = 350 + (parseInt(10 * Math.random()) % 3) * 100;
           // this.x = 850;
            this.x = 1600;
            this.direction = 2;
        }
    };

    //向左移动
    this.moveLeft = function(){
        this.speed += this.a;
        this.x -= this.speed;
        if(this.x < -10){
            //防止超出左边界
            this.x = -10;
            this.y = 350 + (parseInt(10 * Math.random()) % 3) * 100;
            if(this.y >= 650)
                this.y -= 300;
            this.direction = 0;
        }
    };

    //向下移动
    this.moveDown = function(){
        this.speed += this.a;
        this.y += this.speed;
        var maxY = canvas.height - this.radius;
        if(this.y > 1200){
            //防止超出下边界
           // var x_pos = 850 + (parseInt(10 * Math.random()) % 3) * 100;
            this.x = midx + 50 + (parseInt(10 * Math.random()) % 3) * 100;
            if(this.x >= 1150)
                this.x -= 300;
            //this.y = 550;
            this.y = 1200;
            this.direction = 3;
        }
    };
    this.move = function (judge) {
        switch(judge)
        {
            case 0: this.moveRight();break;
            case 1: this.moveDown();break;
            case 2: this.moveLeft();break;
            case 3: this.moveUp();break;

        }
    }
}

Enermy.prototype.draw = function(context){
    var x = this.x||0;
    var y = this.y||0;
    context.save();

   // context.translate(x,y);
    context.beginPath();
    context.arc(x, y, 30, 0, Math.PI * 2, false);
    context.fillStyle = "#161615";
    context.fill();
    context.restore();
};

function wholeEnermy(level)
{
    this.enermy = [];
    this.number = 0;
    this.level = level || 1;
    this.reset = function () {
        for(var i = 0; i < this.number; i++)
        {
            this.enermy[i].reset();
        }
        this.level = 1;
        while(this.enermy.length > 0)
        {
            this.enermy.pop();
        }
        this.number = 0;
    }
}
function Ball(x, y ,radius, speed){
    this.x = x || 650;
    this.y = y || 450;
    this.rx = x;
    this.ry = y;
    this.radius = radius || 50;
    this.speed = speed || 100;
    this.reset = function () {
        this.x = this.rx;
        this.y = this.ry;
    }
    //向上移动
    this.moveUp = function(){
        this.y -= this.speed;
        if(this.y < 300 || this.y > 600){
            //防止超出上边界

            this.y  += this.speed;

        }
    };

    //向右移动
    this.moveRight = function(){
        this.x += this.speed;
        var maxX = canvas.width - this.radius;
        if(this.x > midx + 300){
            //防止超出右边界
            this.x -= this.speed;
        }
    };

    //向左移动
    this.moveLeft = function(){
        this.x -= this.speed;
        if(this.x < midx){
            //防止超出左边界
            this.x += this.speed;
        }
    };

    //向下移动
    this.moveDown = function(){
        this.y += this.speed;
        var maxY = canvas.height - this.radius;
        if(this.y > 600){
            //防止超出下边界
            this.y -= this.speed;
        }
    };
}


CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.closePath();
    return this;
}
Grid.prototype.draw = function(palette){
    palette.save()
    palette.strokeStyle = "#FBFBFB";
    palette.moveTo(midx + 100.5 ,  305);
    palette.lineTo(midx + 100.5,595);
    palette.moveTo(midx + 200.5,305);
    palette.lineTo(midx + 200.5,595);
    palette.moveTo(midx,400);
    palette.lineTo(midx + 300,400);
    palette.moveTo(midx + 0.5,500);
    palette.lineTo(midx + 300,500);
    palette.stroke();
    palette.lineWidth = 5;
    palette.strokeStyle = "#FFFAF0";
    //palette.roundRect(600,300,300,300,60).stroke();
    palette.roundRect(midx,300,300,300,60).stroke();
    palette.restore();

};
function Arrow(x, y){
    this.x = x||midx + 50;
    this.y = y||350;
    this.rotation = 0;
    this.color = '#2a27ff';
    this.scaleX = 1;
    this.scaleY = 1;
}
function clearCanvas(){
    if(typeof context != "undefined"){
        context.clearRect(0, 0, canvas.width,canvas.height);
    }
}
function drawBall(ball){
    if(typeof context != "undefined"){
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
        context.fillStyle = "#FFFAF0";
        context.fill();
    }
}


Arrow.prototype.draw = function(context){
    var x = this.x||midx + 50;
    var y = this.y||350;
    context.save();

    context.translate(x,y);
    context.rotate(this.rotation);
    context.scale(this.scaleX,this.scaleY);
    context.fillStyle =  this.color;
    context.fillRect(-12.5, -12.5, 25, 25)
    context.restore();
};
function LevelWrite()
{
    this.x = midx + 50;
    this.y = 200;
    this.color = '#FFFAF0';
    this.scaleX = 1;
    this.scaleY = 1;
    this.string = "level 1";
}
LevelWrite.prototype.draw = function (context) {
    context.save();
    context.translate(this.x,this.y);
    context.scale(this.scaleX,this.scaleY);
    context.fillStyle =  this.color;
    context.fillText(this.string, 20, 20);
    context.restore();

}
function moveBall(event){
    switch(event.keyCode){
        case 37:    //左方向键
            ball.moveLeft();
            break;
        case 38:    //上方向键
            ball.moveUp();
            break;
        case 39:    //右方向键
            ball.moveRight();
            break;
        case 40:    //下方向键
            ball.moveDown();
            break;
        default:    //其他按键操作不响应
            return;
    }

}
function fadeOut(el){
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .01) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .01) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}
var torestart = false;
function update(modifier) {
    if(start === false )
    {
        //alert("h")
        start = true;
        first_level  = true;
        //ball = null;

    }
    if(first_level === true && score < 10)
    {
        if(myenermy.number === 0)
        {
            enermyone = new Enermy(0, 350, 6, 0, 1, 0);
            enermysecond = new Enermy(midx + 150, 0, 6, 1, 1, 0);
            myenermy.enermy.push(enermyone);
            myenermy.enermy.push(enermysecond);
            myenermy.number = 2;
        }
        enermyone.move(enermyone.direction);
        enermysecond.move(enermysecond.direction);

    }
    if(score >= 10 && score < 20)
    {
        if(myenermy.number === 2) {

            mywrite.string = "level 2";
            controlwrite = false;
            enermyThird = new Enermy(midx + 50, 1200, 3, 3, 3, 0);
            enermyFourth = new Enermy(1650, 450, 2, 2, 2, 0);
            myenermy.enermy.push(enermyThird);
            myenermy.enermy.push(enermyFourth);
            myenermy.number = 4;
            var backgroundcolor = document.getElementById("mybody");
            var i=0;
            var children = backgroundcolor.childNodes;
            for(i = 0; i < children.length; i++){
                if (children[i].nodeType === 1) {
                    children[i].style.background ='#7A08cc' ;
                }
            }

        }
        enermyone.move(enermyone.direction);
        enermysecond.move(enermysecond.direction);
        enermyThird.move(enermyThird.direction);
        enermyFourth.move(enermyFourth.direction);
        enermyFourth.speed = 7;
        enermyThird.speed = 7;
        enermyone.speed = 7;
        enermysecond.speed = 7;
    }
    if(score >= 20 && score < 30)
    {
        if(judgethird === false)
        {
            mywrite.string = "level 3";
            controlwrite = false;
            judgethird = true;
            enermyFourth.speed = 10;
            enermyThird.speed = 10;
            enermyone.speed = 10;
            enermysecond.speed = 10;
            var backgroundcolor = document.getElementById("mybody");
            var i=0;
            var children = backgroundcolor.childNodes;
            for(i = 0; i < children.length; i++){
                if (children[i].nodeType === 1) {
                    children[i].style.background = '#cc179d';
                }
            }
        }
        enermyone.move(enermyone.direction);
        enermysecond.move(enermysecond.direction);
        enermyThird.move(enermyThird.direction);
        enermyFourth.move(enermyFourth.direction);
    }
    if(score >= 30)
    {
        if(judgefourth === false)
        {
            mywrite.string = "level 4";
            controlwrite = false;
            judgefourth = true;
            enermyFourth.speed = 15;
            enermyThird.speed = 15;
            enermyone.speed = 10;
            enermysecond.speed = 10;
            enermyFifth = new Enermy(midx + 50, 1200, 10, 1, 3, 0);
            var backgroundcolor = document.getElementById("mybody");
            var i=0;
            var children = backgroundcolor.childNodes;
            for(i = 0; i < children.length; i++){
                if (children[i].nodeType === 1) {
                    children[i].style.background = '#cc1050';
                }
            }
            myenermy.push(enermyFifth);
            myenermy.number = 5;
        }
        enermyone.move(enermyone.direction);
        enermysecond.move(enermysecond.direction);
        enermyThird.move(enermyThird.direction);
        enermyFourth.move(enermyFourth.direction);
    }
    for(var i = 0; i < myenermy.number; i++)
    {
        if(myenermy.enermy[i].x - ball.x < 15 && myenermy.enermy[i].x - ball.x > -15 && myenermy.enermy[i].y - ball.y < 15 && myenermy.enermy[i].y - ball.y > -15)
        {
            //s = false;
            myenermy.enermy[i].speed = 0;
            //mywrite.string = "gameover";
            var over = document.getElementById("btn")
            over.style.display = "block";
            cancelAnimationFrame(timer);
            restart = true;
            torestart = true;

            break;
        }
    }
    arrow.x = globalx;
    arrow.y = globaly;

     if(arrow.x - ball.x < 3 && arrow.y - ball.y < 3 && arrow.y - ball.y > -3 && arrow.x - ball.x > -3)
     {
          var x_pos = midx + 50 + (parseInt(10 * Math.random()) % 3) * 100;
          var y_pos = 350 + (parseInt(10 * Math.random()) % 3) * 100;
          arrow.x = x_pos;
          arrow.y = y_pos;
          globalx = x_pos;
          globaly = y_pos;


         // score++;
         // registscore++;
          if(registscore % 10 === 0 && registscore >= 10)
          {
              score += 1;
              registscore += 1;
              arrow.color = '#fffc43'
          }
          else {
              score++;
              registscore++;
              arrow.color = '#2a27ff';
          }
         eat = true;

     }

}
    //var test = new Enermy(0, 100, 10, 0, 1, 0);
function toBegin() {

    gamestart = true;
}
var s = false;
function toDraw() {
    if(controlwrite === false)
    {
        writecount += 0.05;
        mywrite.scaleX = mywrite.scaleY = 1 + Math.sin(writecount)*1;
        if(mywrite.scaleX - 1 < 0.02 && mywrite.scaleY - 1 > -0.02)
        {
            writecount = 0;
            controlwrite = true;
            mywrite.scaleX = mywrite.scaleY = 1;
        }
    }
    mywrite.draw(context);
    if(eat)
    {
        count += 0.05;
        arrow.scaleX = arrow.scaleY = 1 + Math.sin(count)*1;
        if(arrow.scaleX - 1 < 0.02 && arrow.scaleY - 1 > -0.02)
        {
            count = 0;
            eat = false;
            arrow.scaleX = arrow.scaleY = 1;
        }
    }
    arrow.rotation = angle;
    angle += 0.01;
    drawBall(ball); //再绘制最新的小球
    var Now = Date.now();
    var delt = Now - then;

    update(delt / 1000);
    arrow.draw(context);
    grid.draw(context);
    for(var i = 0; i < myenermy.number; i++)
    {
        myenermy.enermy[i].draw(context);
    }
    var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0,'black');
    gradient.addColorStop(0.3,'green');
    gradient.addColorStop(0.6,'yellow');
    gradient.addColorStop(1,'red');
    context.fontSize = 50;
    context.font = '40px yahei';
    context.fillStyle = '#fffaf0'
    context.fillText("Score: " + score, 32, 32);

}
function  play() {
    if(torestart === true) {
        var backgroundcolor = document.getElementById("mybody");
        var i = 0;
        var children = backgroundcolor.childNodes;
        for (i = 0; i < children.length; i++) {
            if (children[i].nodeType === 1) {
                children[i].style.background = '#00B7FF';
            }
        }
        start = false;
        first_level = false;
        myenermy.reset();
        ball.reset();
        score = 0;
        registscore = 0;
        arrow.color = '#2a27ff';
        mywrite.string = "level 1";
        controlwrite = false;
        count = 0;
        writecount = 0;
        judgethird = false;
        judgefourth = false;
        restart = false;
        torestart = false;
    }
    (function drawFrame(){
        //toBegin();
        var mybutton = document.getElementById("btn")
        mybutton.style.display = "none";
        var mytext = document.getElementById("smove_text");
        mytext.style.display = "none";
        if(gamestart === false)
        {
            timer = window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);
            //context.clearRect(last.x,last.y,last.width,last.height);
            toDraw();
        }
    })();
}
function replay() {
    if(1) {
        var backgroundcolor = document.getElementById("mybody");
        var i = 0;
        var children = backgroundcolor.childNodes;
        for (i = 0; i < children.length; i++) {
            if (children[i].nodeType === 1) {
                children[i].style.background = '#00B7FF';
            }
        }
        start = false;
        first_level = false;

        score = 0;
        registscore = 0;
        arrow.color = '#2a27ff';
        mywrite.string = "level 1";
        controlwrite = false;
        count = 0;
        writecount = 0;
        judgethird = false;
        judgefourth = false;
        restart = false;
        timer = window.requestAnimationFrame(drawFrame,canvas);
    }
}






