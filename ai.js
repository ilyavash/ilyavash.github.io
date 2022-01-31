const pieceWorth = [0,1,3,3,5,9,100]
// 1 pawn 2 knight 3 bishop 4 rook 5 queen 6 king
const positionWorth = [[{1:0,2:2,3:2,4:2,5:2,6:0},{1:0,2:3,3:3,4:3,5:3,6:0},{1:0,2:4,3:4,4:4,5:4,6:0},{1:0,2:4,3:4,4:4,5:4,6:0},{1:0,2:4,3:4,4:4,5:4,6:0},{1:0,2:4,3:4,4:4,5:4,6:0},{1:0,2:3,3:3,4:3,5:3,6:0},{1:0,2:2,3:2,4:2,5:2,6:0}],
                      [{1:7,2:3,3:3,4:4,5:3,6:0},{1:7,2:3,3:3,4:3,5:3,6:0},{1:7,2:4,3:4,4:4,5:4,6:0},{1:7,2:4,3:4,4:4,5:4,6:0},{1:7,2:4,3:4,4:4,5:4,6:0},{1:7,2:4,3:4,4:4,5:4,6:0},{1:7,2:3,3:3,4:3,5:3,6:0},{1:7,2:3,3:3,4:4,5:3,6:0}],
                      [{1:5,2:3,3:3,4:4,5:3,6:0},{1:5,2:3,3:3,4:3,5:3,6:0},{1:6,2:5,3:5,4:5,5:5,6:0},{1:6,2:5,3:4,4:5,5:5,6:0},{1:6,2:5,3:4,4:5,5:5,6:0},{1:6,2:5,3:4,4:5,5:5,6:0},{1:5,2:3,3:3,4:3,5:3,6:0},{1:5,2:3,3:3,4:4,5:3,6:0}],
                      [{1:4,2:2,3:2,4:4,5:2,6:0},{1:4,2:3,3:3,4:3,5:3,6:0},{1:5,2:4,3:4,4:4,5:4,6:0},{1:5,2:5,3:4,4:5,5:5,6:0},{1:5,2:5,3:4,4:5,5:5,6:0},{1:5,2:4,3:4,4:4,5:4,6:0},{1:4,2:3,3:3,4:3,5:3,6:0},{1:4,2:2,3:2,4:4,5:2,6:0}],
                      [{1:3,2:2,3:2,4:4,5:2,6:0},{1:3,2:3,3:3,4:3,5:3,6:0},{1:4,2:4,3:4,4:4,5:4,6:0},{1:4,2:5,3:4,4:5,5:5,6:0},{1:4,2:5,3:4,4:5,5:5,6:0},{1:4,2:4,3:4,4:4,5:4,6:0},{1:3,2:3,3:3,4:3,5:3,6:0},{1:3,2:2,3:2,4:4,5:2,6:0}],
                      [{1:1,2:2,3:2,4:2,5:2,6:0},{1:1,2:3,3:3,4:3,5:3,6:0},{1:3,2:4,3:4,4:4,5:4,6:0},{1:3,2:4,3:4,4:4,5:4,6:0},{1:3,2:4,3:4,4:4,5:4,6:0},{1:3,2:4,3:4,4:4,5:4,6:0},{1:1,2:3,3:3,4:3,5:3,6:0},{1:1,2:2,3:2,4:2,5:2,6:0}],
                      [{1:0,2:1,3:1,4:1,5:1,6:0},{1:0,2:1,3:1,4:1,5:1,6:0},{1:0,2:1,3:1,4:1,5:1,6:0},{1:0,2:1,3:1,4:1,5:1,6:0},{1:0,2:1,3:1,4:1,5:1,6:0},{1:0,2:1,3:1,4:1,5:1,6:0},{1:0,2:1,3:1,4:1,5:1,6:0},{1:0,2:1,3:1,4:1,5:1,6:0}],
                      [{1:0,2:0,3:0,4:0,5:0,6:0},{1:0,2:0,3:0,4:0,5:0,6:0},{1:0,2:0,3:0,4:0,5:0,6:4},{1:0,2:0,3:3,4:4,5:0,6:0},{1:0,2:0,3:0,4:0,5:0,6:0},{1:0,2:0,3:0,4:10,5:0,6:0},{1:0,2:0,3:0,4:0,5:0,6:10},{1:0,2:0,3:0,4:0,5:0,6:0}]]
let counter = 0
class ai{
    constructor(color){
        this.color = color==='w'?true:false
        this.maxDepth = 4
    }
    nextMove(){
        counter=0
        var maxValue = -1000
        var bestMove = {}
        var moves = this.possibleMoves(this.color)
        moves.forEach(e=>{
            let score = this.calculateMove(e,1,-1001,1001)
            if (maxValue<= score){
                maxValue = score
                bestMove = e
            }
        })
        return this.makeMove(bestMove)
    }

    possibleMoves(color){
        const moves = []
        for (let i = 0;i<pieces.length;i++){
            if ((pieces[i].color==color)&&!pieces[i].isDead){
                var pieceMoves = validMove(pieces[i].y,pieces[i].x)
                pieceMoves.forEach(e => {
                    moves.push({x:pieces[i].x,y:pieces[i].y,xx:e.x,yy:e.y})
                });
            }
        }
        return moves
    }

    calculateMove(move,depth,alpha,beta){
        counter++

        function resetBoard(){
            board[y][x]=board[yy][xx]; 
            board[y][x].y=y; 
            board[y][x].x=x; 
            board[yy][xx]=backupPiece; 
            board[y][x].notMoved = notMovedhelper
            if(board[yy][xx]!=null){board[yy][xx].isDead=false}
            if (backupPiece2!==null&&backupPiece2.move==='promo'){
                board[y][x].piece = 1
            }
            else if(backupPiece2!==null && backupPiece2.move==='castle'){
                board[y][backupPiece2.x]=board[y][backupPiece2.xx]; 
                board[y][backupPiece2.x].y=y
                board[y][backupPiece2.x].x=backupPiece2.x; 
                board[yy][backupPiece2.xx]=null; 
                board[y][backupPiece2.x].notMoved = true
            }
        }

        function castleHelper(xBefore,xAfter){
            backupPiece2 ={move:'castle',x:xBefore,xx:xAfter}
            board[y][xAfter]=board[y][xBefore]
            board[y][xAfter].y=y
            board[y][xAfter].x=xAfter
            board[y][xx].notMoved = false
            board[y][xBefore]=null
        }

        let backupPiece2 = null
        let yy = move.yy; let xx = move.xx; let y = move.y; let x = move.x; let notMovedhelper = board[y][x].notMoved

        let thisTurn = depth%2==0

        const backupPiece = board[yy][xx]
        if (board[yy][xx]!=null){
            if (backupPiece.piece===6){
                return !thisTurn ? 1001:-1001
            }
            board[yy][xx].isDead = true
        }
        board[yy][xx]=board[y][x]
        board[yy][xx].y=yy
        board[yy][xx].x=xx
        board[yy][xx].notMoved = false
        board[y][x]=null

        if ((yy==7 || yy ==0) && board[yy][xx].piece == 1){
            backupPiece2 = {move:'promo'}
            board[yy][xx].piece = 5 
        }
        if(board[yy][xx].piece==6 && Math.abs(x-xx)>1){
            xx>x ? castleHelper(7,5) : castleHelper(0,3)
        }
        if(!checkCheck(thisTurn)){
            resetBoard()
            return !thisTurn ? -1001:1001
        }
        if(depth != this.maxDepth){
            //odd == human
            var value =  thisTurn ? -1000 : 1000
            var moves =  thisTurn ? this.possibleMoves(this.color) : this.possibleMoves(!this.color)
            for (var i = 0;i<moves.length;i++){
                move = this.calculateMove(moves[i],depth+1,alpha,beta)
                if (thisTurn){
                    value = move>value ? move : value
                    alpha = Math.max(alpha,value)
                    if (beta <= alpha){break}
                }
                else{
                    value = move < value ? move : value
                    beta  = Math.min(beta,value)
                    if(beta<=alpha){break}
                }
            }
            resetBoard()
            return value
        }
        const score = this.calculateBoard()
        resetBoard()
        return score
    }

    positionScore(e){
        if (e.color){
            return positionWorth[e.y][e.x][e.piece]
        }
        return positionWorth[7-e.y][7-e.x][e.piece]
    }

    calculateBoard(){
        let aiScore = 0
        let playerScore = 0 


        pieces.forEach(e=>{
            if (!e.isDead){
                if (e.color===this.color){
                    aiScore += pieceWorth[e.piece]
                    aiScore += this.positionScore(e)*1/3
                }
                else{
                    playerScore += pieceWorth[e.piece]
                    playerScore += this.positionScore(e)*1/3
                }
            }
        })
        return aiScore - playerScore
    }

    makeMove(move){
        if (Object.keys(move).length === 0){
            return false
        }

        let yy = move.yy; let xx = move.xx; let y = move.y; let x = move.x
        allMove+="move("+y+","+x+","+yy+","+xx+")\n"
        if (board[yy][xx]!=null || board[yy][xx]!=undefined){
            board[yy][xx].isDead = true
        }
        board[yy][xx]=board[y][x]
        board[yy][xx].y=yy
        board[yy][xx].x=xx
        board[yy][xx].notMoved = false
        board[y][x]=null

        if ((yy==7 || yy ==0) && board[yy][xx].piece == 1){
            board[yy][xx].piece = 5 
            board[yy][xx].image = board[yy][xx].importImage()
        }
        if(board[yy][xx].piece==6 && Math.abs(x-xx)>1){
            xx>x ? this.makeMove({x:7,xx:5,y:y,yy:yy}) : this.makeMove({x:0,xx:3,y:y,yy:yy})
        }
        return true


    }
}

