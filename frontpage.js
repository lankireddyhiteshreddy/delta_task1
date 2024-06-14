alert('PLS PLAY IN FULL SCREEN FOR BETTER EXPERIENCE');
let shoot = document.querySelector('#shoot');
let fpbgm = document.querySelector('audio');
let start = document.createElement('button');
let body = document.querySelector('body');
let mess = document.createElement('div');
let rule = document.createElement('div');
let rules = `<b>Rules of the Game:</b><br>

1. <b>Objective:</b><br>
   - The aim of the game is to destroy the opponent’s Titan by striking the bullet through a series of various Ricochets.<br>
   
2. <b>Game Setup:</b><br>
   - The game board consists of an 8x8 grid.<br>
   - Each player controls their own set of pieces: Titan, Tank, Ricochets, Semi Ricochets, and Cannon.<br>
   - The Cannon is positioned in the base rank and is allowed to move only horizontally.<br>
   
3. <b>Piece Movement:</b><br>
   - Each piece can either move one tile or rotate once during its turn.<br>
   - Pieces can move to adjacent or diagonally adjacent cells.<br>
   
4. <b>Turn-Based Gameplay:</b><br>
   - The game is played in a turn-based manner, with each player taking turns to move their pieces.<br>
   - Players must strategize their moves to outmaneuver their opponent and destroy the opponent's Titan.<br>
   
5. <b>Time System:</b><br>
   - Each player has a specific amount of time allocated for their turns.<br>
   - The timer decrements during the respective player’s turn.<br>
   - If a player's timer runs out, the other player wins the game.<br>
   
6. <b>Game Modes:</b><br>
   - <b>Normal Mode:</b> Players follow the standard rules of the game as described above.<br>
   
7. <b>Mobile Responsiveness:</b><br>
   - The game is designed to be mobile responsive, allowing players to enjoy the game on various devices.<br>
   
8. <b>Additional Features:</b><br>
   - <b>Pause, Resume, and Reset:</b> Players have the option to pause, resume, and reset the game at any point during gameplay.<br>
   
9. <b>Fair Play:</b><br>
   - Players are expected to adhere to the rules and play with fairness and sportsmanship.<br>
   - Any form of cheating or exploiting loopholes in the game mechanics is strictly prohibited.<br>
   
10. <b>Enjoyment:</b><br>
    - Most importantly, have fun and enjoy the strategic challenge of the game!`;
let t = 0;
mess.classList.add('message');
rule.classList.add('rules');
shoot.addEventListener('click', () => {
    shoot.remove();
    fpbgm.loop = true;
    fpbgm.play();
    body.appendChild(start);
    start.classList.add('start');
    start.textContent = 'START';
    function typeText(element, text, delay) {
        let index = 0;
        let intervalId = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                element.style.fontSize = '4.5vw';
                element.style.display = 'flex';
                element.style.justifyContent = 'center';
                element.style.alignItems = 'center';
                index++;
            } else {
                clearInterval(intervalId);
                setTimeout(() => {
                    element.textContent = '';
                }, 100)
            }
        }, delay);
    }
    function typeText1(element, text, delay) {
        let index = 0;
        let intervalId = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                element.style.fontSize = '2vw';
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, delay);
    }
    body.appendChild(mess);
    body.appendChild(rule);
    setTimeout(() => {
        mess.classList.add('entered');
        typeText(mess, "HELLO!!", 250);
    }, 100);
    setTimeout(() => {
        mess.classList.add('entered');
        typeText(mess, "READ THE RULES", 150);
    }, 3000)
    setTimeout(() => {
        mess.classList.add('entered');
        typeText(mess, "BEFORE YOU START", 150);
    }, 6000)
    setTimeout(() => {
        mess.classList.remove('entered');
    }, 9000)
    setTimeout(() => {
        rule.classList.add('enter');
        rule.innerHTML = rules;
        rule.style.fontSize = '2vw';
    }, 11000)
    start.addEventListener('click', () => {
        window.location.href = 'task1f.html';
    })
})
