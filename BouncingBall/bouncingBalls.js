console.log("HELLO");  //intialize
//create a canvas template
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
let tx = window.innerWidth;
let ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;

//mouse hover
var mousex = 0;
var mousey = 0;

addEventListener("mousemove",function(event){
    mousex = event.clientX;
    mousey = event.clientY;
});

//gravity and strokes if neccessary
var grav = 0.99;
c.strokeWidth = 5;

//accessing random color
function randomColour(){
    return(
        "rgba("+ 
        Math.round(Math.random() * 250) + "," +
        Math.round(Math.random() * 250) + "," +
        Math.round(Math.random() * 250) + "," + 
        Math.ceil(Math.random()*10)/10 + ")"
    );
}

//function of Ball
function Ball(){
    this.color = randomColour();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (tx- this.radius *2) + this.radius;
    this.y = Math.random() *(ty- this.radius);
    this.dy = Math.random()* 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() / 5;
    this.update = function() {
        c.beginPath();
        c.arc(this.x , this.y ,this.radius, 0 , 2* Math.PI);
        c.fillStyle = this.color;
        c.fill();
    };
    }

//creating ball about 50
var bal = [];
for (var i=0 ; i<50 ; i++){
    bal.push(new Ball());
}

//animating loop
function animate() {
    if(tx !== window.innerHeight || ty !== window.innerWidth){
        tx = window.innerHeight;
        ty = window.innerWidth;
        canvas.height = ty;
        canvas.width = tx;
    }
    requestAnimationFrame(animate);
    c.clearRect(0,0,tx,ty);
    for ( var i =0; i< bal.length; i++) {
        bal[i].update();
        bal[i].x += bal[i].dx;
        bal[i].y += bal[i].dy;
        if( bal[i].y + bal[i].radius >= ty){
            bal[i].dy = -bal[i].dy * grav;
        }
        else{
            bal[i].dy += bal[i].vel;
            }
        if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
            bal[i].dx = - bal[i].dx;
        }
        if(mousex > bal[i].x - 20 &&
            mousex < bal[i].x + 20 &&
            mousey > bal[i].y - 50 &&
            mousey < bal[i].y + 50 &&
            bal[i].radius < 70) {
                bal[i].radius += 5; 
            }
            else{
                if(bal[i].radius > bal[i].startradius){
                    bal[i].radius += -5;
                }
            }
        }
    }

animate();
// add and removal of balls for every 400ms
setInterval(function(){
    bal.push(new Ball());
    bal.splice(0,1);
},400);

