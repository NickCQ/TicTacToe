
let startgame=document.querySelector('.game').querySelector('span');
let player2=document.querySelector('select'); 



const board=(function(){
    let gameboard=[];
    let cuadrados=Array.from(document.querySelectorAll('.check'))
    cuadrados.forEach(cuadrado=>{
        gameboard.push(cuadrado.querySelector('span'));
        cuadrado.addEventListener('click',()=>{
            //var bestSpot = minimax(origBoard, aiPlayer);
            //console.log(bestSpot.index)
            gamestart(players,cuadrado);
            /* working perfectly fine
            let origBoard = arrayGenerator();
            let bestSpot = minimax(origBoard, aiPlayer);
            console.log(bestSpot.index)*/
            
        })
    })
    return{gameboard};
})();

let turnochecker=[...board.gameboard];


const Player=(name)=>{
    return {name}
};

hider=()=>{
    let player2name=document.querySelector('.player2name');
    let ailevel=document.querySelector('.AIlevel')
    if(player2.selectedIndex==0){
        player2name.style.display=''
        ailevel.style.display='none'
    } else{
        player2name.style.display='none'
        ailevel.style.display='flex'
    }
};

playerprinter=(p2input,p2radio,p1input,p2text)=>{
    let pl1=document.querySelectorAll('.player')[0].querySelector('span');
    let pl2=document.querySelectorAll('.player')[1].querySelector('span');
    let p1=Player(p1input.value);
    pl1.innerHTML=p1.name
    if(p2input.value=='Player 2'){
        let p2=Player(p2text.value)
        pl2.innerHTML=p2.name
        return players=[p1,p2];

    } else{
        if(p2radio[0].checked){
            let p2=Player(`${p2input.value} (easy)`);
            pl2.innerHTML=p2.name
            return players=[p1,p2];

        } else{
            let p2=Player(`${p2input.value} (hard)`);
            pl2.innerHTML=p2.name
            return players=[p1,p2];
        }
    }

    
}

(function finalbuttons(){
    let pod=document.querySelector('.hidden2');
    let final=document.querySelectorAll('.finalbutton')
    final[0].addEventListener('click',()=>{
        board.gameboard.forEach(cosa=>{
            cosa.innerHTML=''
        })
        turnochecker=[...board.gameboard];
        pod.setAttribute("class", "hidden2");

    })
    final[1].addEventListener('click',()=>{
        board.gameboard.forEach(cosa=>{
            cosa.innerHTML=''
        })
        turnochecker=[...board.gameboard];
        pod.setAttribute("class", "hidden2");
        let playermodal=document.querySelector('.hidden');
        playermodal.setAttribute("class", "playermodal");
    })
})();


function turner(cuadrado){
    if(cuadrado.querySelector('span').innerHTML==''){
        if(turnochecker.length%2!=0){
            cuadrado.querySelector('span').innerHTML='X';
        } else{
            cuadrado.querySelector('span').innerHTML='O';
        }
        turnochecker.splice(turnochecker.indexOf(cuadrado.querySelector('span')),1);
        let value=checkwinner();
        if(players[1].name=="A.I (easy)"&&turnochecker.length!=0&&!value){
            let randomnumber=Math.floor(Math.random()*turnochecker.length)
            turnochecker[randomnumber].innerHTML='O';
            turnochecker.splice(randomnumber,1);
            checkwinner();
        }
        if(players[1].name=="A.I (hard)"&&turnochecker.length!=0&&!value){
            let origBoard = arrayGenerator();
            let bestSpot = minimax(origBoard, aiPlayer);
            board.gameboard[bestSpot.index].innerHTML='O';
            turnochecker.splice(1,1);
            checkwinner();
        }
        
    }
}



function checkwinner(){
    winner1=players[0].name
    winner2=players[1].name
    let podium=document.querySelector('.winnerword');
    let pod=document.querySelector('.hidden2');
    for(i=0;i<9;i=i+3){
        if(board.gameboard[i].innerHTML==board.gameboard[i+1].innerHTML&&board.gameboard[i].innerHTML==board.gameboard[i+2].innerHTML&&(board.gameboard[i].innerHTML=='X'||board.gameboard[i].innerHTML=='O')){
            pod.setAttribute("class", "playermodal2");
            if(board.gameboard[i].innerHTML=='O'){
                podium.innerHTML=`${winner2} wins`
            } else{
                podium.innerHTML=`${winner1} wins`
            }
            return true
        }
    }
    for(i=0;i<3;i++){
        if(board.gameboard[i].innerHTML==board.gameboard[i+3].innerHTML&&board.gameboard[i].innerHTML==board.gameboard[i+6].innerHTML&&(board.gameboard[i].innerHTML=='X'||board.gameboard[i].innerHTML=='O')){
            pod.setAttribute("class", "playermodal2");
            if(board.gameboard[i].innerHTML=='O'){
                podium.innerHTML=`${winner2} wins`
            } else{
                podium.innerHTML=`${winner1} wins`
            }
            return true
        }
        
    }
    if(board.gameboard[0].innerHTML==board.gameboard[4].innerHTML&&board.gameboard[0].innerHTML==board.gameboard[8].innerHTML&&(board.gameboard[0].innerHTML=='X'||board.gameboard[0].innerHTML=='O')){
        pod.setAttribute("class", "playermodal2");
        if(board.gameboard[0].innerHTML=='O'){
            podium.innerHTML=`${winner2} wins`
        } else{
            podium.innerHTML=`${winner1} wins`
        }
        return true
    } else if(board.gameboard[2].innerHTML==board.gameboard[4].innerHTML&&board.gameboard[2].innerHTML==board.gameboard[6].innerHTML&&(board.gameboard[2].innerHTML=='X'||board.gameboard[2].innerHTML=='O')){
        pod.setAttribute("class", "playermodal2");
        if(board.gameboard[2].innerHTML=='O'){
            podium.innerHTML=`${winner2} wins`
        } else{
            podium.innerHTML=`${winner1} wins`
        }
        return true
    }
    if(turnochecker.length==0){
        pod.setAttribute("class", "playermodal2");
        podium.innerHTML=`It is a tie`
        return true
    }
    return false
}

function gamestart(players,cuadrado){
    turner(cuadrado);
}

checker=()=>{
    let p1input=document.querySelector('.player1').querySelector('input');
    let p2input=document.querySelector('.player2').querySelector('select');
    let p2text=document.querySelector('.player2').querySelector('[type="text"]');
    let p2radio=document.querySelector('.player2').querySelectorAll('[type="radio"]');

    if(p1input.value==''){
        return alert('You have to complete all the fields.')
    }
    if(p2input.value=='Player 2' && p2text.value==''){
        return alert('You have to complete all the fields.')
    } else if(p2input.value=='A.I'&& !(p2radio[0].checked || p2radio[1].checked)){
        return alert('You have to complete all the fields.')
    }
    let playermodal=document.querySelector('.playermodal');
    playermodal.setAttribute("class", "hidden");
    playerprinter(p2input,p2radio,p1input,p2text);
}

player2.addEventListener('change',hider)

startgame.addEventListener('click',()=>{
    checker();
})

//------------------------------------------------
function arrayGenerator(){
    another=[]
    for(i=0;i<board.gameboard.length;i++){
        board.gameboard[i].innerHTML==''?another.push(i):another.push(board.gameboard[i].innerHTML) 
        }
    return another
}

var huPlayer = "X";

var aiPlayer = "O";



function minimax(newBoard, player){
  
  var availSpots = emptyIndexies(newBoard);

  if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

// returns the available spots on the board
function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}