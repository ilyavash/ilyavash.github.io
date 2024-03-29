
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
    checkerBoard()
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
    board[0].forEach((e)=>pieces.push(e)); board[7].forEach((e)=>pieces.push(e)); board[1].forEach((e)=>pieces.push(e)); board[6].forEach((e)=>pieces.push(e))
    whiteKing = pieces[12]; blackKing = pieces[4]
}

function checkerBoard(){
    var mark = true
        for (var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                if (clientColor&& i == redSquareX && j == redSquareY){
                    ctx.fillStyle='red'
                }
                else if(!clientColor&& i == 7 - redSquareX && j == 7 - redSquareY) {
                    ctx.fillStyle='red'
                }
                else{
                    mark ? ctx.fillStyle='white': ctx.fillStyle='#2E2934'
                }
                mark=!mark
                ctx.fillRect(i*canvas.width/8,j*canvas.width/8,canvas.width/8,canvas.height/8)
            }
        }
}

function clearSquare(y,x){
    (y%2==0&&x%2==0)||(y%2!=0&&x%2!=0) ? ctx.fillStyle='white': ctx.fillStyle='#2E2934'
    ctx.fillRect(x*canvas.width/8,y*canvas.width/8,canvas.width/8,canvas.height/8)
}
// 1 pawn 2 knight 3 bishop 4 rook 5 queen 6 king
class piece{
    constructor(piece, color,y,x){
        this.piece=piece
        this.color=color
        this.x=x
        this.y=y
        this.isDead = false
        this.notMoved = true
        this.image = this.importImage()

    }
    importImage(){
        const image = new Image()
        image.src = imageURL(this.piece,this.color)
        return image
    }
    loadImage(){
        if(clientColor){
            ctx.drawImage(this.image,this.x*(canvas.height/8),this.y*canvas.width/8,canvas.width/8,canvas.height/8)
        }
        else{
            ctx.drawImage(this.image,(7-this.x)*(canvas.height/8),(7-this.y)*canvas.width/8,canvas.width/8,canvas.height/8)
        }
    }
}
function move(y,x,yy,xx,checkMate,color){
    if (color === undefined){color = clientColor}
    const backupPiece = board[yy][xx]
    clearSquare(y,x);clearSquare(yy,xx);
    if (board[yy][xx]!=null || board[yy][xx]!=undefined){
        board[yy][xx].isDead = true
    }
    board[yy][xx]=board[y][x]
    board[yy][xx].y=yy
    board[yy][xx].x=xx
    board[yy][xx].loadImage()
    board[yy][xx].notMoved = false
    board[y][x]=null
    const check = checkCheck(color)
    if (!check||checkMate){
        board[y][x]=board[yy][xx]; board[y][x].y=y; board[y][x].x=x; board[yy][xx]=backupPiece
        if(board[yy][xx]!=null){board[yy][xx].isDead=false}
        checkerBoard()
        pieces.forEach((e)=>{if(!e.isDead){e.loadImage()}})
    }
    if(check){    allMove+="move("+y+","+x+","+yy+","+xx+")\n"}
    return check

}

function checkMateChecker(color){
    for (let i = 0;i<pieces.length;i++){
        if ((pieces[i].color==color)&&!pieces[i].isDead){
            const moves = validMove(pieces[i].y,pieces[i].x)
            for (j=0;j<moves.length;j++){
                if(move(pieces[i].y,pieces[i].x,moves[j].y,moves[j].x,true,color)){
                    return true
    }   }   }   }
    return false
}

function checkCheck(color){
    if (color){
        if(validMove(whiteKing.y,whiteKing.x,true).length==0){
            return false
        }
    }
    else{
        if(validMove(blackKing.y,blackKing.x,true).length==0){
            return false
        }
    }
    return true
}
function movePiece(y,x,yy,xx){
    if (clientColor!=turn||clientColor==null||y==yy&x==xx||board[y][x]==undefined||board[y][x]==null||!board[y][x].color==turn){return}
    if(validMove(y,x).find(e=>e.x==xx&&e.y==yy)==null){return}
    //castle
    if(board[y][x].piece==6&&Math.abs(x-xx)>1){
        if (xx>x){
            move(y,x,yy,xx)
            move(y,7,y,5)
            moveOracle({move:'castle',x:x,y:y,xx:xx,yy:yy})
            moveOracle({move:'move',x:7,y:y,xx:5,yy:yy,checkmate:redSquare()})
        }
        else{
            move(y,x,yy,xx)
            move(y,0,y,3)
            moveOracle({move:'castle',x:x,y:y,xx:xx,yy:yy})
            moveOracle({move:'move',x:0,y:y,xx:3,yy:yy,checkmate:redSquare()})
        }
        turn=!turn
        return
    }
    //promotion
    else if(board[y][x].piece==1&&(yy==7||yy==0)){
        //////clears image edge cases////////////////////////
        checkerBoard()
        pieces.forEach((e)=>{if(!e.isDead){e.loadImage()}})
        clearSquare(y,x)
        /////////////////////////////////////////////////////
        if (!move(y,x,yy,xx)){return}
        promotePiece(yy,xx)
        socketPromoteX=x; socketPromoteY=y
        return
    }
    if (!move(y,x,yy,xx)){return}
    moveOracle({move:'move',x:x,y:y,xx:xx,yy:yy,checkmate:redSquare()})
    checkerBoard()
    turn= !turn
    return
}
// 1 pawn 2 knight 3 bishop 4 rook 5 queen 6 king
function validMove(y,x,checkmate){
    let piece = board[y][x]
    let validMoves = []
    let i; let j;
    function castle(color){
        if (color){
            if(piece.notMoved&&board[7][7]!=null&&board[7][7].notMoved&&board[7][7].piece==4&&board[7][5]==null&&board[7][6]==null&&underAttack(x+2,y)&& validMoves.find(e=>e.x==5&&e.y==7)!==undefined){
                validMoves.push({y:7,x:6})
            }
            if(piece.notMoved&&board[7][0]!=null&&board[7][0].notMoved&&board[7][0].piece==4&&board[7][3]==null&&board[7][2]==null&& underAttack(x-2,y)&& validMoves.find(e=>e.x==2&&e.y==7)!==undefined ){
                validMoves.push({y:7,x:1})
            }
        }
        else{
            if(piece.notMoved&&board[0][7]!=null&&board[0][7].notMoved&&board[0][7].piece==4&&board[0][5]==null&&board[0][6]==null&& underAttack(x+2,y) && validMoves.find(e=>e.x==5&&e.y==0)!==undefined){
                validMoves.push({y:0,x:6})
            }
            if(piece.notMoved&&board[0][0]!=null&&board[0][0].notMoved&&board[0][0].piece==4&&board[0][3]==null&&board[0][2]==null&&underAttack(x-2,y)&& validMoves.find(e=>e.x==2&&e.y==0)!==undefined ){
                validMoves.push({y:0,x:1})
            }  
        }
    }
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
                break
            }
        }
    }   
    function underAttack(xx,yy){
        return horseAttack(xx,yy,(e)=>e-2,(e)=>e-1)&&
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
        diagonalAttack(xx,yy,(e)=>e-1,(e)=>e-1,false)
    }
    function horseAttack(xx,yy,xop,yop){
        let xxx = xop(xx); let yyy = yop(yy)
        if (xxx>-1&&xxx<8&&yyy>-1&&yyy<8){
            if(board[yyy][xxx]==null){return true}
            if(board[yyy][xxx].color!=board[y][x].color&&board[yyy][xxx].piece==2){return false}
        }
        return true
    }
    function diagonalAttack(xx,yy,xop,yop,hori){
        let i = xop(xx); let j = yop(yy); let pawn = true
        const pawnColorHelper = (pawnY,kingY,kingColor) => {if(kingColor&&kingY>=pawnY||!kingColor&&kingY<=pawnY){return true}return false}
        if (hori){pawn=false}
        while (-1<i&&i<8&&-1<j&&j<8){
            if(board[j][i]==null){
                pawn = false
                i = xop(i); j = yop(j)
                continue
            }
            if(board[j][i].piece==6&&board[j][i].color==board[y][x].color){
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
    function kingCheck(xop,yop){
        let xx = xop(x); let yy = yop(y)
        //checks for attacks from horses and horizental and vertical moves
        //if(xx>-1&&xx<8&&yy>-1&&yy<8&&(board[yy][xx]==null||(board[yy][xx].color!=board[y][x].color)||board[yy][xx].y==yy&&board[yy][xx].x==x)&&
        if(xx>-1&&xx<8&&yy>-1&&yy<8&&(board[yy][xx]==null||board[yy][xx].color!=board[y][x].color||xx==x&&yy==y)&&underAttack(xx,yy))
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
            if(checkmate){
                kingCheck((e)=>e,(e)=>e)
                return validMoves
            }
            kingCheck((e)=>e+1,(e)=>e+1)
            kingCheck((e)=>e+1,(e)=>e)
            kingCheck((e)=>e+1,(e)=>e-1)
            kingCheck((e)=>e,(e)=>e+1)
            kingCheck((e)=>e,(e)=>e-1)
            kingCheck((e)=>e-1,(e)=>e+1)
            kingCheck((e)=>e-1,(e)=>e)
            kingCheck((e)=>e-1,(e)=>e-1)
            castle(piece.color)
            return validMoves
    }
}
function promotePiece(yy,xx){
    promotion=true
    if(clientColor){
        clearSquare(yy,xx)
        if (yy==7){
            ctx.drawImage(pieces[0].image,xx*canvas.height/8,yy*canvas.width/8,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[1].image,xx*canvas.height/8+canvas.width/16,yy*canvas.width/8,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[2].image,xx*canvas.height/8,yy*canvas.width/8+canvas.height/16,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[3].image,xx*canvas.height/8+canvas.width/16,yy*canvas.width/8+canvas.height/16,canvas.width/16,canvas.height/16)
            
        }
        else{
            ctx.drawImage(pieces[8].image,xx*canvas.height/8,yy*canvas.width/8,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[9].image,xx*canvas.height/8+canvas.width/16,yy*canvas.width/8,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[10].image,xx*canvas.height/8,yy*canvas.width/8+canvas.height/16,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[11].image,xx*canvas.height/8+canvas.width/16,yy*canvas.width/8+canvas.height/16,canvas.width/16,canvas.height/16)
        }
    }
    else{
        clearSquare(7-yy,7-xx)
        if (yy==7){
            ctx.drawImage(pieces[0].image,(7-xx)*canvas.height/8,(7-yy)*canvas.width/8,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[1].image,(7-xx)*canvas.height/8+canvas.width/16,(7-yy)*canvas.width/8,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[2].image,(7-xx)*canvas.height/8,(7-yy)*canvas.width/8+canvas.height/16,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[3].image,(7-xx)*canvas.height/8+canvas.width/16,(7-yy)*canvas.width/8+canvas.height/16,canvas.width/16,canvas.height/16)
            
        }
        else{
            ctx.drawImage(pieces[8].image,(7-xx)*canvas.height/8,(7-yy)*canvas.width/8,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[9].image,(7-xx)*canvas.height/8+canvas.width/16,(7-yy)*canvas.width/8,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[10].image,(7-xx)*canvas.height/8,(7-yy)*canvas.width/8+canvas.height/16,canvas.width/16,canvas.height/16)
            ctx.drawImage(pieces[11].image,(7-xx)*canvas.height/8+canvas.width/16,(7-yy)*canvas.width/8+canvas.height/16,canvas.width/16,canvas.height/16)
        }
    }
    isDrawing=false
    promoteY=yy
    promoteX=xx
}

function redSquare(){
    checkmate = undefined
    if(validMove(blackKing.y,blackKing.x,true).length==0){
        redSquareX = blackKing.x; redSquareY = blackKing.y
        if (!checkMateChecker(false)){
            checkmate = false
        }
    }
    else if(validMove(whiteKing.y,whiteKing.x,true).length==0){
        redSquareX = whiteKing.x; redSquareY = whiteKing.y
        if (!checkMateChecker(true)){
            checkmate = true
        }
    }
    else{
        redSquareX = -1; redSquareY = -1
    }
    if (checkmate !== undefined){
        if (checkmate === clientColor){
            hideCheckBundle2('Checkmate, you lost!')
            return true
        }
        else{
            hideCheckBundle2('Checkmate, you won!')
            return true
        }
    }
    return false
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
    if(promotion){
        if(clientColor){
            if(x>promoteX*canvas.width/8&&x<promoteX*canvas.width/8+canvas.width/16&&y>promoteY*canvas.height/8&&y<promoteY*canvas.height/8+canvas.height/16){
                board[promoteY][promoteX].piece=4
                board[promoteY][promoteX].color?board[promoteY][promoteX].image=pieces[8].image:board[promoteY][promoteX].image=pieces[0].image
                moveOracle({move:'promotion',x:socketPromoteX,y:socketPromoteY,xx:promoteX,yy:promoteY,piece:4,imageHelper1:8,imageHelper2:0})
            }
            if(x>promoteX*canvas.width/8+canvas.width/16&&x<promoteX*canvas.width/8+canvas.width/8&&y>promoteY*canvas.height/8&&y<promoteY*canvas.height/8+canvas.height/16){
                board[promoteY][promoteX].piece=2
                board[promoteY][promoteX].color?board[promoteY][promoteX].image=pieces[9].image:board[promoteY][promoteX].image=pieces[1].image
                moveOracle({move:'promotion',x:socketPromoteX,y:socketPromoteY,xx:promoteX,yy:promoteY,piece:2,imageHelper1:9,imageHelper2:1})
            }
            if(x>promoteX*canvas.width/8&&x<promoteX*canvas.width/8+canvas.width/16&&y>promoteY*canvas.height/8+canvas.height/16&&y<promoteY*canvas.height/8+canvas.height/8){
                board[promoteY][promoteX].piece=3
                board[promoteY][promoteX].color?board[promoteY][promoteX].image=pieces[10].image:board[promoteY][promoteX].image=pieces[2].image
                moveOracle({move:'promotion',x:socketPromoteX,y:socketPromoteY,xx:promoteX,yy:promoteY,piece:3,imageHelper1:10,imageHelper2:2})
            }
            if(x>promoteX*canvas.width/8+canvas.width/16&&x<promoteX*canvas.width/8+canvas.width/8&&y>promoteY*canvas.width/8+canvas.width/16&&y<promoteY*canvas.width/8+canvas.width/8){
                board[promoteY][promoteX].piece=5
                board[promoteY][promoteX].color?board[promoteY][promoteX].image=pieces[11].image:board[promoteY][promoteX].image=pieces[3].image
                moveOracle({move:'promotion',x:socketPromoteX,y:socketPromoteY,xx:promoteX,yy:promoteY,piece:5,imageHelper1:11,imageHelper2:3})
            }
        }
        else{
            if(x>(7-promoteX)*canvas.width/8&&x<(7-promoteX)*canvas.width/8+canvas.width/16&&y>(7-promoteY)*canvas.height/8&&y<(7-promoteY)*canvas.height/8+canvas.height/16){
                board[promoteY][promoteX].piece=4
                board[promoteY][promoteX].color?board[promoteY][promoteX].image=pieces[8].image:board[promoteY][promoteX].image=pieces[0].image
                moveOracle({move:'promotion',x:socketPromoteX,y:socketPromoteY,xx:promoteX,yy:promoteY,piece:4,imageHelper1:8,imageHelper2:0})
            }
            if(x>(7-promoteX)*canvas.width/8+canvas.width/16&&x<(7-promoteX)*canvas.width/8+canvas.width/8&&y>(7-promoteY)*canvas.height/8&&y<(7-promoteY)*canvas.height/8+canvas.height/16){
                board[promoteY][promoteX].piece=2
                board[promoteY][promoteX].color?board[promoteY][promoteX].image=pieces[9].image:board[promoteY][promoteX].image=pieces[1].image
                moveOracle({move:'promotion',x:socketPromoteX,y:socketPromoteY,xx:promoteX,yy:promoteY,piece:2,imageHelper1:9,imageHelper2:1})
            }
            if(x>(7-promoteX)*canvas.width/8&&x<(7-promoteX)*canvas.width/8+canvas.width/16&&y>(7-promoteY)*canvas.height/8+canvas.height/16&&y<(7-promoteY)*canvas.height/8+canvas.height/8){
                board[promoteY][promoteX].piece=3
                board[promoteY][promoteX].color?board[promoteY][promoteX].image=pieces[10].image:board[promoteY][promoteX].image=pieces[2].image
                moveOracle({move:'promotion',x:socketPromoteX,y:socketPromoteY,xx:promoteX,yy:promoteY,piece:3,imageHelper1:10,imageHelper2:2})
            }
            if(x>(7-promoteX)*canvas.width/8+canvas.width/16&&x<(7-promoteX)*canvas.width/8+canvas.width/8&&y>(7-promoteY)*canvas.width/8+canvas.width/16&&y<(7-promoteY)*canvas.width/8+canvas.width/8){
                board[promoteY][promoteX].piece=5
                board[promoteY][promoteX].color?board[promoteY][promoteX].image=pieces[11].image:board[promoteY][promoteX].image=pieces[3].image
                moveOracle({move:'promotion',x:socketPromoteX,y:socketPromoteY,xx:promoteX,yy:promoteY,piece:5,imageHelper1:11,imageHelper2:3})
            }
        }
        promotion=false
        turn = !turn
        return
    }
    xSquare = Math.floor((x)*8/canvas.width)
    Ysquare = Math.floor((y)*8/canvas.height)
    if (!clientColor){xSquare=7-xSquare;Ysquare=7-Ysquare}
    if (board[Ysquare][xSquare]!=null){
        isDrawing = true
        drawingImage = board[Ysquare][xSquare].image
    }
}
function mouseUp(e){
    if(clientColor){
        movePiece(Ysquare,xSquare,Math.floor((y)*8/canvas.width),Math.floor((x)*8/canvas.width))
    }
    else{
        movePiece(Ysquare,xSquare,7-Math.floor((y)*8/canvas.width),7-Math.floor((x)*8/canvas.width))
    }
    isDrawing = false
    if(promotion){
        return
    }
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

function onlineHelper(e){
    if(e.move==='move'){
        if (board[e.yy][e.xx]!=null){
            board[e.yy][e.xx].isDead = true
        }
        board[e.yy][e.xx]=board[e.y][e.x]
        board[e.yy][e.xx].y=e.yy
        board[e.yy][e.xx].x=e.xx
        board[e.y][e.x]=null
    }
    if(e.move==='promotion'){
        if (board[e.yy][e.xx]!=null){
            board[e.yy][e.xx].isDead = true
        }
        board[e.yy][e.xx]=board[e.y][e.x]
        board[e.yy][e.xx].y=e.yy
        board[e.yy][e.xx].x=e.xx
        board[e.y][e.x]=null
        board[e.yy][e.xx].piece=e.piece
        board[e.yy][e.xx].color?board[e.yy][e.xx].image=pieces[e.imageHelper1].image:board[e.yy][e.xx].image=pieces[e.imageHelper2].image
    }
    if(e.move==='castle'){
        board[e.yy][e.xx]=board[e.y][e.x]
        board[e.yy][e.xx].y=e.yy
        board[e.yy][e.xx].x=e.xx
        board[e.y][e.x]=null
        turn = !turn
    }
    turn = !turn
    redSquare()
    checkerBoard()
    pieces.forEach((e)=>{if(!e.isDead){e.loadImage()}})
}

function moveOracle(obj){
    if (!botGame){
        connectionLink.send(JSON.stringify(obj))
        return
    }
    if (obj.move!=='castle'&&!obj.checkmate){
        if (bot.nextMove()){
            onlineHelper({})
            return
        }
    }
}
//button functions
document.getElementById("newGameButton").onclick = function(){
    clientColor = pickColor(document.getElementById('colorPick').value)
    gameType = document.getElementById('gameType').value
    opponentColor = !clientColor?'w':'b'
    if (gameType === 'Human'){
        alert("Sent this code to player2:    "+opponentColor+peer.id)
    }
    else{
        botGame = true
        bot = new ai(opponentColor)
        initialize()
        if (!clientColor){
            bot.nextMove()
            onlineHelper({})
        }
    }

}
document.getElementById("joinGameButton").onclick = function(){
    let codeInfo = window.prompt("Enter Game Id")
    if (codeInfo !== null || codeInfo !== ""){
        connectionLink = peer.connect(codeInfo.substring(1))
        connectionLink.on('open', function() {
            clientColor= codeInfo.substring(0,1)==='w'?true:false
            initialize()
            connectionLink.on('data', function(data) {
                const result = JSON.parse(data)
                onlineHelper(result)
            })
        })
    }
}
document.getElementById("playAgainButton").onclick = function(){
    bootup()
    hideCheckBundle()
}

function mouseFunc(){
    canvas.addEventListener("mousemove",function(e){mouseMove(e)})
    canvas.addEventListener("mousedown",function(e){mouseDown(e)})
    canvas.addEventListener("mouseup",function(e){mouseUp(e)})
}

function hideCheckBundle(){
    var popwindow = document.getElementById("checkBundle")
    if (popwindow.style.display === "none") {
        popwindow.style.display = "block"
   } else {
         popwindow.style.display = "none"
     }
}

function hideCheckBundle2(str){
    document.getElementById("checkmate").innerHTML = str
    var popwindow = document.getElementById("checkBundle2")
    if (popwindow.style.display === "none") {
        popwindow.style.display = "block"
   } else {
         popwindow.style.display = "none"
     }
}

function pickColor(color){
    if (color == 'Black'){return false}
    else if (color == 'White'){return true}
    return Math.random()>0.5?true:false
}
function initialize(){
    hideCheckBundle()
    mouseFunc()
    pieces.forEach(e=>e.loadImage())
}

let x; let y; let isDrawing; let Xsquare; 
let Ysquare; let drawingImage; let turn; let promotion;
let promoteY; let promoteX; let socketPromoteX; let socketPromoteY;
let whiteKing; let blackKing; let redSquareX; let redSquareY;
let clientColor; let clientID; let gameID; let botGame; let bot
let canvas; let ctx; var board; var pieces; var allMove; var peer;var connectionLink

//bootup 
function bootup(){
    //Server stuff
    peer = new Peer()
    peer.on('connection', function(conn) {
        connectionLink = conn
        conn.on('open', function() {
            initialize()
            conn.on('data', function(data) {
                const result = JSON.parse(data)
                onlineHelper(result)
            })
        })});

    //variables
    isDrawing = false;
    turn=true; promotion = false;
    promoteY = null;promoteX = null;socketPromoteX;socketPromoteY;
    whiteKing; blackKing; redSquareX = -1; redSquareY = -1;
    clientColor = null; clientID =null; gameID = null; botGame = false; 
    
    canvas = document.querySelector('canvas')
    ctx = canvas.getContext("2d")

    canvas.width=window.innerWidth/2.5
    canvas.height=window.innerWidth/2.5
    board = []; pieces = []
    allMove =''
    setupBoard()
    hideCheckBundle2()
}
bootup()