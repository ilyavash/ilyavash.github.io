
const http = require("http");
const app = require("express")();
app.get("/", (req,res)=> res.sendFile( __dirname+"/chess.html"))
console.log(process.cwd()+'/chess.html')
app.listen(9091, ()=>console.log("Listening on http port 9091"))
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))

const wsServer = new websocketServer({
    "httpServer": httpServer
})
var clients = {}; let games = {}

wsServer.on("request", request=>{

    const connection = request.accept(null, request.origin)
    //connection.on("open",() => console.log("opened"))
    connection.on("open",() => connection.send(JSON.stringify("you are connected")))
    connection.on("close",() => console.log("closed"))
    connection.on("message", message => {
        const result = JSON.parse(message.utf8Data)
        
        if (result.method === 'create'){
            games[result.gameID] = {player1:result.clientID, player1Socket:connection, player2:null, player2Socket:null}
            console.log("game created")
            connection.send(JSON.stringify("goodluck lmao"))
        }
        else if(result.method === 'join'){
            if(games[result.gameID]==null){
                console.log("Game not found")
            }
            else if(games[result.gameID].player2!=null){
                console.log("Game full")
            }
            else{
                games[result.gameID].player2=result.clientID
                games[result.gameID].player2Socket=connection
                 console.log("Game joined")
                 connection.send(JSON.stringify("game joined"))
            }
        }
        else if(result.method === 'movePiece'){
            console.log("piece moved")
            if (games[result.gameID].player1===result.clientID){
                games[result.gameID].player2Socket.send(JSON.stringify(result))
            }
            else{
                games[result.gameID].player1Socket.send(JSON.stringify(result))
            }
        }
    })
})

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
