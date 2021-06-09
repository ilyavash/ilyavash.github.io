const canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");
canvas.width=window.innerWidth/2;
canvas.height=window.innerWidth/2;
checkerBoard();
function checkerBoard(){
var mark = true;
    for (var i=0;i<9;i++){
        for(var j=0;j<9;j++){
        mark ? c.fillStyle='white': c.fillStyle='#2E2934';
        mark=!mark;
        c.fillRect(i*canvas.width/8,j*canvas.width/8,canvas.width/8,canvas.height/8);
        }
    }
}


//c.fillRect(0,0,canvas.width/8,canvas.height/8);
//c.fillRect(canvas.width/8,canvas.height/8,canvas.width/8,canvas.height/8);
//c.stroke();

console.log("hello?");
console.log(c);