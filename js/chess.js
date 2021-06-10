const canvas = document.querySelector('canvas');
var c = canvas.getContext("2d");
canvas.width=window.innerWidth/2.5;
canvas.height=window.innerWidth/2.5;
checkerBoard();
var board = [];
for(var i=0; i<8; i++) {
    board[i] = new Array(8);
}
setupBoard();
move(6,3,4,3);
console.log(board);
/*
[4,2,3,5,6,3,2,4] ^ 
[1,1,1,1,1,1,1,1] |
[-,-,-,-,-,-,-,-] |
[-,-,-,-,-,-,-,-] |
[-,-,-,-,-,-,-,-] |
[-,-,-,-,-,-,-,-] |
[1,1,1,1,1,1,1,1] |
[4,2,3,5,6,3,2,4] |
x-------------->  y
[y][x]
*/
function setupBoard(){
    board[0][0]= new piece(4,false,0,0);  board[7][0]= new piece(4,true,7,0); board[1][0]= new piece(1,false,1,0);  board[6][0]= new piece(1,true,6,0);
    board[0][1]= new piece(2,false,0,1);  board[7][1]= new piece(2,true,7,1); board[1][1]= new piece(1,false,1,1);  board[6][1]= new piece(1,true,6,1);
    board[0][2]= new piece(3,false,0,2);  board[7][2]= new piece(3,true,7,2); board[1][2]= new piece(1,false,1,2);  board[6][2]= new piece(1,true,6,2);
    board[0][3]= new piece(5,false,0,3);  board[7][3]= new piece(5,true,7,3); board[1][3]= new piece(1,false,1,3);  board[6][3]= new piece(1,true,6,3);
    board[0][4]= new piece(6,false,0,4);  board[7][4]= new piece(6,true,7,4); board[1][4]= new piece(1,false,1,4);  board[6][4]= new piece(1,true,6,4);
    board[0][5]= new piece(3,false,0,5);  board[7][5]= new piece(3,true,7,5); board[1][5]= new piece(1,false,1,5);  board[6][5]= new piece(1,true,6,5);
    board[0][6]= new piece(2,false,0,6);  board[7][6]= new piece(2,true,7,6); board[1][6]= new piece(1,false,1,6);  board[6][6]= new piece(1,true,6,6);
    board[0][7]= new piece(4,false,0,7);  board[7][7]= new piece(4,true,7,7); board[1][7]= new piece(1,false,1,7);  board[6][7]= new piece(1,true,6,7);
}

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
// 1 pawn 2 knight 3 bishop 4 rook 5 queen 6 king

function piece(piece, color,y,x){
    this.piece=piece;
    this.color=color;
    this.x=x;
    this.y=y;
    var image=new Image();
    image.onload=function(){
        c.drawImage(image,x*canvas.height/8,y*canvas.width/8,canvas.width/8,canvas.height/8);
    };
    image.src=imageURL(piece,color);
}

function move(y,x,yy,xx){
    board[yy][xx]=board[y][x];
    board[yy][xx].y=this.y;
    board[yy][xx].x=this.x;
    board[yy][xx].onload;
    board[y][x]=undefined;
}






function imageURL(piece,color){
    if (color){
        switch(piece){
            case 1:
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/1920px-Chess_plt45.svg.png";
            case 2:
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/1920px-Chess_nlt45.svg.png";
            case 3:
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/1920px-Chess_blt45.svg.png";
            case 4:
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/1920px-Chess_rlt45.svg.png";
            case 5:
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/1920px-Chess_qlt45.svg.png";
            case 6:
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/1920px-Chess_klt45.svg.png";
        }
    }
    switch(piece){
        case 1:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/1920px-Chess_pdt45.svg.png";
        case 2:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/1920px-Chess_ndt45.svg.png";
        case 3:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/1920px-Chess_bdt45.svg.png";
        case 4:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/1920px-Chess_rdt45.svg.png";
        case 5:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/1920px-Chess_qdt45.svg.png";
        case 6:
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/1920px-Chess_kdt45.svg.png";
    }

}

