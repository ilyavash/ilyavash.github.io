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
    checkerBoard();
    for(var i=0; i<8; i++) {
        board[i] = new Array(8)
    }
    board[0][0]= new piece(4,false,0,0);  board[7][0]= new piece(4,true,7,0); board[1][0]= new piece(1,false,1,0);  board[6][0]= new piece(1,true,6,0);
    board[0][1]= new piece(2,false,0,1);  board[7][1]= new piece(2,true,7,1); board[1][1]= new piece(1,false,1,1);  board[6][1]= new piece(1,true,6,1);
    board[0][2]= new piece(3,false,0,2);  board[7][2]= new piece(3,true,7,2); board[1][2]= new piece(1,false,1,2);  board[6][2]= new piece(1,true,6,2);
    board[0][3]= new piece(5,false,0,3);  board[7][3]= new piece(5,true,7,3); board[1][3]= new piece(1,false,1,3);  board[6][3]= new piece(1,true,6,3);
    board[0][4]= new piece(6,false,0,4);  board[7][4]= new piece(6,true,7,4); board[1][4]= new piece(1,false,1,4);  board[6][4]= new piece(1,true,6,4);
    board[0][5]= new piece(3,false,0,5);  board[7][5]= new piece(3,true,7,5); board[1][5]= new piece(1,false,1,5);  board[6][5]= new piece(1,true,6,5);
    board[0][6]= new piece(2,false,0,6);  board[7][6]= new piece(2,true,7,6); board[1][6]= new piece(1,false,1,6);  board[6][6]= new piece(1,true,6,6);
    board[0][7]= new piece(4,false,0,7);  board[7][7]= new piece(4,true,7,7); board[1][7]= new piece(1,false,1,7);  board[6][7]= new piece(1,true,6,7);
    board[0].forEach((e)=>pieces.push(e)); board[1].forEach((e)=>pieces.push(e)); board[6].forEach((e)=>pieces.push(e)); board[7].forEach((e)=>pieces.push(e))
    
}

function checkerBoard(){
    var mark = true;
        for (var i=0;i<9;i++){
            for(var j=0;j<9;j++){
            mark ? ctx.fillStyle='white': ctx.fillStyle='#2E2934';
            mark=!mark;
            ctx.fillRect(i*canvas.width/8,j*canvas.width/8,canvas.width/8,canvas.height/8);
            }
        }
}

function clearSquare(y,x){
    (y%2==0&&x%2==0)||(y%2!=0&&x%2!=0) ? ctx.fillStyle='white': ctx.fillStyle='#2E2934'
    ctx.fillRect(x*canvas.width/8,y*canvas.width/8,canvas.width/8,canvas.height/8);
}

// 1 pawn 2 knight 3 bishop 4 rook 5 queen 6 king
class piece{
    constructor(piece, color,y,x){
        this.piece=piece;
        this.color=color;
        this.x=x;
        this.y=y;
        this.inital = true;
        this.isDead = false
        this.image = this.importImage()
        this.loadImage()
    }
    importImage(){
        var image=new Image();
        image.src=imageURL(this.piece,this.color);
        return image;
    }
    loadImage(){
        if (this.inital){
            let xx = this.x; let yy = this.y; let image = this.image
            setTimeout(function() {
            ctx.drawImage(image,xx*(canvas.height/8),yy*canvas.width/8,canvas.width/8,canvas.height/8);
            }, 300 );
            this.inital = false
            return
        }
        ctx.drawImage(this.image,this.x*(canvas.height/8),this.y*canvas.width/8,canvas.width/8,canvas.height/8);
    }
}

function movePiece(y,x,yy,xx){
    if (y==yy&x==xx){return}
    if(!board[y][x].color==turn){return}
    turn = !turn;
    if(validMove(y,x).find(e=>e.x==xx&&e.y==yy)==null){return}
    clearSquare(y,x);
    if (board[yy][xx]!=null){
        board[yy][xx].isDead = true
    }
    board[yy][xx]=board[y][x];
    board[yy][xx].y=yy;
    board[yy][xx].x=xx;
    clearSquare(yy,xx);
    board[yy][xx].loadImage();
    board[y][x]=null;
}

// 1 pawn 2 knight 3 bishop 4 rook 5 queen 6 king

function validMove(y,x){
    let piece = board[y][x]
    let validMoves = []
    let i; let j;
    function horseCheck(xop,yop){
        if(xop(x)>-1&&xop(x)<8&&yop(y)>-1&&yop(y)<8&&
        (board[yop(y)][xop(x)]==null||board[yop(y)][xop(x)].color!=board[y][x].color)){validMoves.push({y:yop(y),x:xop(x)})}
    }
    function diagonalCheck(xop,yop){
        i = xop(x); j = yop(y)
        while (-1<i&&i<8&&-1<j&&j<8){
            if(board[j][i]==null){
                validMoves.push({y:j,x:i})
                i=xop(i); j=yop(j)
            }
            else{
                if(board[j][i].color!=board[y][x].color){
                    validMoves.push({y:j,x:i})
                }
                break;
            }
        }
    }   
    function kingCheck(xop,yop){
        function horseAttack(xx,yy,xop,yop){
            let xxx = xop(xx); let yyy = yop(yy)
            if (xxx>-1&&xxx<8&&yyy>-1&&yyy<8){
                if(board[yyy][xxx]==null){return true}
                if(board[yyy][xxx].color!=board[y][x].color&&board[yyy][xxx].piece==2){return false}
            }
            return true
        }
        function diagonalAttack(xx,yy,xop,yop,hori){
            let i = xop(xx); let j = yop(yy); let pawn = true;
            const pawnColorHelper = (pawnY,kingY,kingColor) => {if(kingColor&&kingY>=pawnY||!kingColor&&kingY<=pawnY){return true}return false}
            if (hori){pawn=false}
            while (-1<i&&i<8&&-1<j&&j<8){
                if(board[j][i]==null){
                    pawn = false
                    i = xop(i); j = yop(j)
                    continue
                }
                if(board[j][i].color==board[y][x].color){
                    break
                }
                if(hori&&(board[j][i].piece==4||board[j][i].piece==5||(board[j][i].piece==6&&((xx==i&&Math.abs(j-yy)<2)||(yy==j&&Math.abs(i-xx)<2))))){
                    return false
                }
                if(!hori&&board[j][i].piece==3||board[j][i].piece==5||(board[j][i].piece==6&&Math.abs(j-yy)<2&&Math.abs(i-xx)<2)||(pawn&&board[j][i].piece==1&&pawnColorHelper(j,yy,board[y][x].color))){
                    return false
                }
                else{break}
            }
            return true

        }
        let xx = xop(x); let yy = yop(y)
        //checks for attacks from horses and horizental and vertical moves
        if(xx>-1&&xx<8&&yy>-1&&yy<8&&(board[yy][xx]==null||board[yy][xx].color!=board[y][x].color)&&
            horseAttack(xx,yy,(e)=>e-2,(e)=>e-1)&&
            horseAttack(xx,yy,(e)=>e-1,(e)=>e-2)&&
            horseAttack(xx,yy,(e)=>e-2,(e)=>e+1)&&
            horseAttack(xx,yy,(e)=>e-1,(e)=>e+2)&&
            horseAttack(xx,yy,(e)=>e+1,(e)=>e-2)&&
            horseAttack(xx,yy,(e)=>e+2,(e)=>e-1)&&
            horseAttack(xx,yy,(e)=>e+2,(e)=>e+1)&&
            horseAttack(xx,yy,(e)=>e+1,(e)=>e+2)&&
            diagonalAttack(xx,yy,(e)=>e+1,(e)=>e,true)&&
            diagonalAttack(xx,yy,(e)=>e-1,(e)=>e,true)&&
            diagonalAttack(xx,yy,(e)=>e,(e)=>e+1,true)&&
            diagonalAttack(xx,yy,(e)=>e,(e)=>e-1,true)&&
            diagonalAttack(xx,yy,(e)=>e+1,(e)=>e+1,false)&&
            diagonalAttack(xx,yy,(e)=>e+1,(e)=>e-1,false)&&
            diagonalAttack(xx,yy,(e)=>e-1,(e)=>e+1,false)&&
            diagonalAttack(xx,yy,(e)=>e-1,(e)=>e-1,false))
            {validMoves.push({y:yop(y),x:xop(x)})}
    }

    switch(piece.piece){
        case 1:
            if (piece.color){
                if(piece.y==6){
                    if(board[5][x]==null){validMoves.push({y:5,x:x})}
                    if(board[5][x]==null&&board[4][x]==null){validMoves.push({y:4,x:x})}
                }
                else{
                    if(board[y-1][x]==null){validMoves.push({y:y-1,x:x})}
                }
                if (x-1!=-1&&board[y-1][x-1]!=null&&!board[y-1][x-1].color){validMoves.push({y:y-1,x:x-1,})}
                if (x+1!=8&&board[y-1][x+1]!=null&&!board[y-1][x+1].color){validMoves.push({y:y-1,x:x+1})}
                return validMoves
            }
            else{
                if(piece.y==1){
                    if(board[2][x]==null){validMoves.push({y:2,x:x})}
                    if(board[2][x]==null&&board[3][x]==null){validMoves.push({y:3,x:x})}
                }
                else{
                    if(board[y+1][x]==null){validMoves.push({y:y+1,x:x})}
                }
                if (x-1!=-1&&board[y+1][x-1]!=null&&board[y+1][x-1].color){validMoves.push({y:y+1,x:x-1,})}
                if (x+1!=8&&board[y+1][x+1]!=null&&board[y+1][x+1].color){validMoves.push({y:y+1,x:x+1})}
                return validMoves
            }
        case 2:
            horseCheck((e)=>e-2,(e)=>e-1)
            horseCheck((e)=>e-1,(e)=>e-2)
            horseCheck((e)=>e-2,(e)=>e+1)
            horseCheck((e)=>e-1,(e)=>e+2)
            horseCheck((e)=>e+1,(e)=>e-2)
            horseCheck((e)=>e+2,(e)=>e-1)
            horseCheck((e)=>e+2,(e)=>e+1)
            horseCheck((e)=>e+1,(e)=>e+2)
            return validMoves
        case 3:
            diagonalCheck((e)=>e+1,(e)=>e+1)
            diagonalCheck((e)=>e+1,(e)=>e-1)
            diagonalCheck((e)=>e-1,(e)=>e+1)
            diagonalCheck((e)=>e-1,(e)=>e-1)
            return validMoves

        case 4:
            diagonalCheck((e)=>e+1,(e)=>e)
            diagonalCheck((e)=>e-1,(e)=>e)
            diagonalCheck((e)=>e,(e)=>e+1)
            diagonalCheck((e)=>e,(e)=>e-1)
            return validMoves
        case 5:
            diagonalCheck((e)=>e+1,(e)=>e+1)
            diagonalCheck((e)=>e+1,(e)=>e-1)
            diagonalCheck((e)=>e-1,(e)=>e+1)
            diagonalCheck((e)=>e-1,(e)=>e-1)
            diagonalCheck((e)=>e+1,(e)=>e)
            diagonalCheck((e)=>e-1,(e)=>e)
            diagonalCheck((e)=>e,(e)=>e+1)
            diagonalCheck((e)=>e,(e)=>e-1)
            return validMoves
        case 6:
            kingCheck((e)=>e+1,(e)=>e+1)
            kingCheck((e)=>e+1,(e)=>e)
            kingCheck((e)=>e+1,(e)=>e-1)
            kingCheck((e)=>e,(e)=>e+1)
            kingCheck((e)=>e,(e)=>e-1)
            kingCheck((e)=>e-1,(e)=>e+1)
            kingCheck((e)=>e-1,(e)=>e)
            kingCheck((e)=>e-1,(e)=>e-1)
            return validMoves
    }

}
function mouseMove(e){
    let rect = canvas.getBoundingClientRect()
    x = e.clientX-rect.left
    y = e.clientY-rect.top
    if (isDrawing){
        checkerBoard()
        pieces.forEach((e)=>{if(!e.isDead){e.loadImage()}})
        ctx.drawImage(drawingImage,x-canvas.width/16,y-canvas.width/16,canvas.width/8,canvas.height/8)
    }
}
function mouseDown(e){
    xSquare = Math.floor((x)*8/canvas.width)
    ySquare = Math.floor((y)*8/canvas.height)
    if (board[ySquare][xSquare]!=null){
        isDrawing = true
        drawingImage = board[ySquare][xSquare].image
    }
}
function mouseUp(e){
    movePiece(ySquare,xSquare,Math.floor((y)*8/canvas.width),Math.floor((x)*8/canvas.width))
    isDrawing = false
    checkerBoard()
    pieces.forEach((e)=>{if(!e.isDead){e.loadImage()}})
}

//color:true==white // 1 pawn 2 knight 3 bishop 4 rook 5 queen 6 king
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

//bootup 
const canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");
canvas.width=window.innerWidth/2.5;
canvas.height=window.innerWidth/2.5;
var board = []; var pieces = [];
let x; let y; let isDrawing = false; let Xsquare; let ySquare; let drawingImage; let turn=true;
setupBoard();
canvas.addEventListener("mousemove", function(e){mouseMove(e)})
canvas.addEventListener("mousedown",function(e){mouseDown(e)})
canvas.addEventListener("mouseup",function(e){mouseUp(e)})
console.log(board);
console.log(pieces);
