import Table from "./Table.js";
import Timer from "./Timer.js";

$(() => {
    var player = 0;
    const board = new Table();
    var moves = 0;
    var timer = new Timer(handleTimer);
    const cols = document.getElementsByClassName("col");
    for (const col of cols) {
        col.addEventListener("click", handleClick);
    }
    function handleClick(e) {
        let row;
        if (e.target.classList.contains("circle"))
            row = e.target.parentNode.parentNode;
        else row = e.target.parentNode;
        let colI = Array.from($(".game").children()).indexOf(row);
        console.log("Clicked on col " + colI);
        // Trouver l'index de la première ligne libre.
        let rowI;
        for (let i = 5; i != -1; i--) {
            if (board.table[i][colI] == 0) {
                rowI = i;
                break;
            }
        }
        if(rowI == undefined) return;
        row.children[rowI].children[0].classList.add(player?"yellow":"red");
        board.updateTable(rowI, colI, player?2:1);
        const win = board.checkWin(rowI, colI, player + 1);
        const tie = board.checkTie();
        if (win) return handleWin();
        if (tie) return handleWin(tie);
        player = Math.abs(player - 1);
        console.log("Ligne trouvée : " + rowI);
        console.table(board.table);
    };

    function handleWin(tie = false) {
        const title = tie?"TIE":"VICTORY";
        let winner = player + 1;
        let color = winner==1?"red":"yellow"
        const msg = tie?"C'est un match nul, dommage":`Victoire du joueur ${winner} ( ${color} )`;
        $('.result').text(title);
        $('.winner').text(msg);
        $('#endscreen').animate({
            top: 0,
        }, 200);
        const totalTime = timer.stopTimer();
        console.log("Totaltime: ", totalTime);
    }

    $('#replay').on('click', e => {
        board.reset();
        player = Math.round(Math.random());
        console.log("Next Player : " + player);
        const circles = document.getElementsByClassName('circle');
        for(const circle of circles) {
            circle.classList.remove('yellow');
            circle.classList.remove('red');
        }
        $('#endscreen').animate({
            top: "-100%",
        }, 200)
        timer.resetTimer();
        timer.startTimer();
        $('#minutes').text((0).toString().padStart(2, "0"));
        $('#seconds').text((0).toString().padStart(2, "0"));
    })

    function handleTimer(time){
        const mins = Math.floor(time/60);
        const secs = time%60;
        $('#minutes').text(mins.toString().padStart(2, "0"));
        $('#seconds').text(secs.toString().padStart(2, "0"));
    }
});
