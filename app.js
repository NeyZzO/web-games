$(() => {
    const squares = document.querySelectorAll(".square");
    const GAME = [
        // 1 = player 1, 4 = player 2
        [0, 0, 0],
        [0, 0, 0], 
        [0, 0, 0],
    ];
    var turns = 0;
    let player = 0; // 0 => Player 1, 1 => PLayer 2
    squares.forEach((square) => {
        square.textContent = "";
        square.addEventListener("click", handleClick);
    });

    const updateDisplay = () => {
        console.log(`Player ${player + 1}'s turn`);
        const message = "Player [PLAYER] turn ( [CHAR] )";
        const char = player ? "O" : "X";
        $("#playerinfos").text(
            message.replace("[PLAYER]", player + 1).replace("[CHAR]", char)
        );
    };
    const updateGame = () => {
        // On rempli déjà le tableau GAME
        console.log("TABLEAU GAME : ");
        console.table(GAME);
        const sq = document.getElementsByClassName("square");
        // let [row, col] = [0, 0];
        let row = 0;
        let col = 0;

        for(const s of sq){
            const val =
                $(s).data("player") == 0 ? 1 : $(s).data("player") == 1 ? 4 : 0;
            console.log(`Le carré (${row + ", " + col}) a pour valeur ${val} et joueur ${$(s).data('player')} test ${Math.floor(4**parseInt($(s).data("player")))}`);
            GAME[row][col] = val;
            console.log(row, col)
            console.log(GAME[row][col])
            col++;
            if (col == 3) {
                row++;
                col = 0;
            }
        };

        turns ++;
        console.log('Tableau GAME rempli :')
        console.table(GAME);
        checkWin();
    };

    function handleClick(e) {
        if ($(e.target).hasClass("cross") || $(e.target).hasClass("circle"))
            return;
        const char = player ? "O" : "X";
        const label = player ? "circle" : "cross";
        console.log(`Le joueur ${char} joue`);
        e.target.textContent = char;
        $(e.target).addClass(label);
        $(e.target).data("player", player);
        console.log(`$(e.target).data("player") = ${$(e.target).data("player")}`)
        player = Math.abs(player - 1);
        console.log('Next player will be ' + player.toString());
        updateDisplay();
        updateGame();
    }
    function checkWin() {
        winner = 0;
        // Player 'O'
        if (
            GAME[0][0] + GAME[1][0] + GAME[2][0] == 12 ||
            GAME[0][1] + GAME[1][1] + GAME[2][1] == 12 ||
            GAME[0][2] + GAME[1][2] + GAME[2][2] == 12 ||
            GAME[0][0] + GAME[0][1] + GAME[0][2] == 12 ||
            GAME[1][0] + GAME[1][1] + GAME[1][2] == 12 ||
            GAME[2][0] + GAME[2][1] + GAME[2][2] == 12 ||
            GAME[0][0] + GAME[1][1] + GAME[2][2] == 12 ||
            GAME[0][2] + GAME[1][1] + GAME[2][0] == 12
        ) {
            // On stoppe le jeu et on met l'écran de fin.
            console.log("Le joueur 2 gagne");
            winner = 2;
        } // Player 'X'
        else if (
            GAME[0][0] + GAME[1][0] + GAME[2][0] == 3 ||
            GAME[0][1] + GAME[1][1] + GAME[2][1] == 3 ||
            GAME[0][2] + GAME[1][2] + GAME[2][2] == 3 ||
            GAME[0][0] + GAME[0][1] + GAME[0][2] == 3 ||
            GAME[1][0] + GAME[1][1] + GAME[1][2] == 3 ||
            GAME[2][0] + GAME[2][1] + GAME[2][2] == 3 ||
            GAME[0][0] + GAME[1][1] + GAME[2][2] == 3 ||
            GAME[0][2] + GAME[1][1] + GAME[2][0] == 3
        ) {
            // On stoppe le jeu et on met l'écran de fin.
            console.log("Le joueur 1 gagne");
            winner = 1;
        }
        if (turns == 9 && winner == 0) {
            console.log('Match nul');
            winner = 3;
        }
        console.log('Turns', turns)

        // Ecran de fin
        // Animation
        if (winner != 0){
            const title = winner==3?"TIE":"VICTORY";
            const msg = winner==3?"C'est un match nul, dommage":`Victoire du joueur ${winner} ( ${winner==1?"X":"O"} )`;
            $('.result').text(title);
            $('.winner').text(msg);
            $('#endscreen').animate({
                top: 0,
            }, 200)
        }
    } 

    $('#replay').on('click', e => {
        GAME[0] = [0, 0, 0];
        GAME[1] = [0, 0, 0];
        GAME[2] = [0, 0, 0];
        console.log(GAME)
        const sq = document.querySelectorAll('.square');
        sq.forEach(s => {
            $(s).removeClass('cross');
            $(s).removeClass('circle');
            console.log(s.getAttribute("data-player"))
            $(s).data('player', -1);
            s.textContent = "";
            // console.log($(s).data('player'))
        })
        $('#endscreen').animate({
            top: "-100%"
        }, 200);
        winner = 0;
        turns = 0;
        player = 0;
    })
});
