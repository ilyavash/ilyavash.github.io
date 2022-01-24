const pieceWorth = [0,1,3,3,5,9,100]
class ai{
    constructor(color){
        this.color = color==='w'?true:false
        this.maxDepth = 4
    }

    nextMove(){
        var maxValue = -1000
        var bestMove = {}
        var moves = this.possibleMoves(this.color)
        moves.forEach(e=>{
            let score = this.calculateMove(e,1)
            if (maxValue<score){
                maxValue =score
                bestMove = e
            }
        })
        this.makeMove(bestMove)

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

    calculateMove(move,depth){
        function resetBoard(){
            board[y][x]=board[yy][xx]; board[y][x].y=y; board[y][x].x=x; board[yy][xx]=backupPiece; board[y][x].notMoved = true
            if(board[yy][xx]!=null){board[yy][xx].isDead=false}
        }

        let yy = move.yy; let xx = move.xx; let y = move.y; let x = move.x
        let thisTurn = depth%2==0
        const backupPiece = board[yy][xx]
        if (board[yy][xx]!=null){
            board[yy][xx].isDead = true
        }
        board[yy][xx]=board[y][x]
        board[yy][xx].y=yy
        board[yy][xx].x=xx
        board[yy][xx].notMoved = false
        board[y][x]=null
        if(!checkCheck(thisTurn)){
            resetBoard()
            return !thisTurn ? -1000:1000
        }
        if(depth != this.maxDepth){
            //odd == human
            var value =  thisTurn ? -1000 : 1000
            var moves =  thisTurn ? this.possibleMoves(this.color) : this.possibleMoves(!this.color)
            moves.forEach(e=>{
                move = this.calculateMove(e,depth+1)
                if (thisTurn){value = move>value ? move : value}
                else{value = move < value ? move : value}
            })
            resetBoard()
            return value
        }
        const score = this.calculateBoard()
        resetBoard()
        return score
    }

    calculateBoard(){
        let aiScore = 0
        let playerScore = 0 

        pieces.forEach(e=>{
            if (!e.isDead){
                if (e.color===this.color){
                    aiScore += pieceWorth[e.piece]
                }
                else{
                    playerScore += pieceWorth[e.piece]
                }
            }
        })


        return aiScore - playerScore
    }

    makeMove(move){
        console.log(move)
        let yy = move.yy; let xx = move.xx; let y = move.y; let x = move.x
        if (board[yy][xx]!=null){
            board[yy][xx].isDead = true
        }
        board[yy][xx]=board[y][x]
        board[yy][xx].y=yy
        board[yy][xx].x=xx
        board[yy][xx].notMoved = false
        board[y][x]=null
    }
}