const cellelements = document.querySelectorAll('[data-cell]');
const x_class = 'x';
const circle_class = 'circle';
const board = document.getElementById('board');
const winningmessageelement = document.getElementById('winningmessage');
const winningmessagetextelement = document.querySelector('[data-winning-txt-message]');
const restartbtn = document.getElementById('restartbutton');
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
] ;

let circleturn

startgame();

restartbtn.addEventListener('click' , startgame);

function startgame (){

    circleturn = false ; 

    cellelements.forEach(cell => {

        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click' , handleclick);

        cell.addEventListener('click' , handleclick , {once:true});
    });

    setboardhoverclass();
    winningmessageelement.classList.remove('show');

    

}

function handleclick(e){
    const cell = e.target ;
    const currentclass = circleturn ? circle_class : x_class ;
    placemark(cell , currentclass);
    if(checkwin(currentclass)){
        endgame(false);
    } else if (isdraw()){

        endgame(true);

    } else {
    swapturns();
    setboardhoverclass();
    } 
}

function endgame (draw){
    if(draw){

        winningmessagetextelement.innerText = 'Draw!'

    } else {
        winningmessagetextelement.innerText = `${circleturn ? "O's" : "X's"} Wins!`

    }

    winningmessageelement.classList.add('show');

}

function isdraw(){
    return [...cellelements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class);
    })
}

function placemark(cell , currentclass){
    cell.classList.add(currentclass);
}

function swapturns(){
    circleturn = !circleturn ;
}

function setboardhoverclass() {

    board.classList.remove(x_class);
    board.classList.remove(circle_class);

    if(circleturn){
        board.classList.add(circle_class);
    } else {
        board.classList.add(x_class);
    }

}

function checkwin(currentclass){
   return winning_combinations.some(combination => {

    return combination.every(index => {
        return cellelements[index].classList.contains(currentclass);
    })

    })
}