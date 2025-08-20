let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let msg = document.querySelector(".msg");
let msgCon = document.querySelector(".msg-container");
let newBtn = document.querySelector(".newgame");

const clickSound = new Audio("sounds/clickSound.mp3");
const WinSound = new Audio("sounds/WIN.mp3");
const DrawSound = new Audio("sounds/Draw.mp3");


let turn0=true;
let BoxCount = 0;

let patterens=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

let resetGame =()=>
{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
        box.classList.remove("win","winAnimate");
    }
    BoxCount=0;
    turn0=true;
};
let newGame = ()=>
{
    
    resetGame();
    msgCon.classList.add("hide");
    BoxCount=0;
    turn0=true;
};
let disableBtns=()=>
{
    for(let box of boxes)
    {
        box.disabled=true;
    }
};
let showWinner=(pos1)=>
{
    msgCon.classList.remove("hide");
    msg.innerText=`Congragulations Winner ${pos1}`;
    disableBtns();

};

let highlightWin = (pattern) => {
  if (!Array.isArray(pattern)) return;
  pattern.forEach(i => {
    if (boxes[i]) boxes[i].classList.add("win","winAnimate");
  });
};

let checkWinner=()=>
{
    for(let bx of patterens)
    {
        let pos1= boxes[bx[0]].innerText;
        let pos2= boxes[bx[1]].innerText;
        let pos3 = boxes[bx[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!="")
        {
            if(pos1===pos2 && pos2===pos3)
            {
                highlightWin(bx);
                showWinner(pos1);
                WinSound.play();
                
               
                return true;
                
            }
            
        }
    };
    return false;
};
let matchDraw=()=>
{
    msg.innerText="Match DRAW";
    msgCon.classList.remove("hide");
}
boxes.forEach((box)=>
{
    box.addEventListener("click",()=>
    {
        if(turn0)
        {
            box.innerText="0";
            turn0=false;
            
        }
        else{
            box.innerText ="X";
            turn0=true;
            
        }
        new Audio("sounds/clickSound.mp3").play();
        
        box.disabled=true;
        BoxCount++;
        let ans = checkWinner();
        if(BoxCount===9 && ans==false)
        {
            matchDraw();
            DrawSound.play();
        }
    });
    
});
reset.addEventListener("click",newGame);
newBtn.addEventListener("click",newGame);



