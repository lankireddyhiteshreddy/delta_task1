let cannonsound = new Audio('cannon_sound.mp3');
let inst = document.querySelector('#inst');
let hitsom = new Audio('hitsom.wav');
let tick = new Audio('tick.mp3');
tick.loop = true;
tick.volume = 0.2;
let g = 0;
let gameover = new Audio('gameover.wav');
let home = document.querySelector('#back');
let body = document.querySelector('body');
let gameBoard = document.querySelector('.gameBoard');
let buttons = document.querySelector('.buttons');
let tir = document.querySelector('#tir');
let tib = document.querySelector('#tib');
let cr = document.querySelector('#cr');
let cb = document.querySelector('#cb');
let tr = document.querySelector('#tr');
let tb = document.querySelector('#tb');
let sr1 = document.querySelector('#sr1');
let sr2 = document.querySelector('#sr2');
let sb1 = document.querySelector('#sb1');
let sb2 = document.querySelector('#sb2');
let rr = document.querySelector('#rr');
let rb = document.querySelector('#rb');
let reset = document.querySelector('#reset');
let pause = document.querySelector('#pause');
let resume = document.querySelector('#resume');
let timb = document.querySelector('#timb');
let timr = document.querySelector('#timr');
let timeb = 360;
let timer = 360;
let bullet;
rr.style.backgroundImage = 'url("slanting_line1.png")';
rb.style.backgroundImage = 'url("slanting_line1.png")';
sr1.style.clipPath = "polygon(0% 100%, 0% 0%, 100% 0%)";
sr2.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%)";
sb1.style.clipPath = "polygon(0% 100%, 0% 0%, 100% 100%)";
sb2.style.clipPath = "polygon(0% 100%, 100% 0%, 100% 100%)";
let interval, int = 1;
rr.value = 'r35';
rb.value = 'r64';
sb1.value = 'r81';
sb2.value = 'r88';
sr1.value = 'r11';
sr2.value = 'r18';
tr.value = 'r34';
tb.value = 'r65';
cr.value = 'r15';
cb.value = 'r84';
tir.value = 'r14';
tib.value = 'r85';
let i, j, x, y, pt = 'b', t = 'b', ti, tj, bs = 0, z, intervalId, move, leftb, topb;
let previousTarget;
for (i = 1; i <= 8; i += 1) {
    for (j = 1; j <= 8; j += 1) {
        let div = document.createElement('div');
        gameBoard.appendChild(div);
        div.id = `r${i}${j}`;
        div.style.backgroundColor = 'white';
        div.style.width = '5vw';
        div.style.height = '5vw';
        div.style.border = '1px solid black';
    }
}
function frmttime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
function updateTimer() {
    if (t == 'b') {
        timeb--;
        timb.textContent = frmttime(timeb);
    } else {
        timer--;
        timr.textContent = frmttime(timer);
    }
    if (timeb == 0 || timer == 0) {
        clearInterval(interval);
        int = 0;
        if (bullet != undefined) {
            bulletstop();
            clearInterval(intervalId);
        }
        t = 'end';
        let x4 = document.createElement('div');
        gameBoard.appendChild(x4);
        x4.style.display = 'flex-box';
        x4.style.alignContent = 'center';
        x4.innerText = 'GAME OVER';
        gameover.play();
        tick.pause();
        x4.style.position = 'relative';
        x4.style.fontSize = '2vw';
        x4.style.left = '10vw';
        x4.style.top = '-25.1vw';
        x4.style.width = '20vw';
        x4.style.height = '10vw';
        x4.style.textAlign = 'center';
        if (timeb == 0) {
            x4.style.backgroundColor = 'blue';
        }
        else {
            x4.style.backgroundColor = 'red';
        }
    }
}
timb.textContent = frmttime(timeb);
timr.textContent = frmttime(timer);
int = 0;
function nocyan() {
    for (i = 1; i <= 8; i += 1) {
        for (j = 1; j <= 8; j += 1) {
            var x2 = document.querySelector(`#r${i}${j}`);
            x2.style.backgroundColor = 'white';
        }
    }
}
function createlrb() {
    var left = document.createElement('button');
    var right = document.createElement('button');
    left.id = 'left';
    right.id = 'right';
    left.innerText = 'CLOCK';
    right.innerText = 'ANTICLOCK';
    left.style.position = 'relative';
    left.style.left = '15vw';
    left.style.top = '-43vw';
    left.style.width = '5vw';
    left.style.height = '2.5vw';
    left.style.backgroundColor = 'yellow';
    right.style.position = 'relative';
    right.style.left = '15vw';
    right.style.top = '-43vw';
    right.style.width = '6vw';
    right.style.height = '2.5vw';
    right.style.backgroundColor = 'yellow';
    gameBoard.appendChild(left);
    gameBoard.appendChild(right);
}
function removelrb() {
    let leftb = document.querySelector('#left');
    let rightb = document.querySelector('#right');
    leftb.remove();
    rightb.remove();
}
function b() {
    body.style.backgroundColor = 'rgb(127, 153, 255)';
}
function r() {
    body.style.backgroundColor = 'rgb(233, 125, 110)';
}
function bulletstop() {
    clearInterval(intervalId);
    bullet.remove();
}
function ml() {
    move = 'left';
    leftb -= 1;
    if (leftb > 0)
        bullet.style.left = `${(leftb - 3) * 5 + 11.7}vw`;
    z = 1;
}
function mr() {
    move = 'right';
    leftb += 1;
    if (leftb < 9)
        bullet.style.left = `${(leftb - 3) * 5 + 11.7}vw`;
    z = 1;
}
function mu() {
    move = 'up';
    topb -= 1;
    if (topb > 0)
        bullet.style.top = `${(topb - 8) * 5 - 3}vw`;
    z = 1;
}
function md() {
    move = 'down';
    topb += 1;
    if (topb < 9)
        bullet.style.top = `${(topb - 8) * 5 - 3}vw`;
    z = 1;
}
function bulletmov() {
    z = 0;
    bullet = document.createElement('div');
    bullet.style.backgroundColor = 'black';
    bullet.style.width = '1.5vw';
    bullet.style.height = '1.5vw';
    bullet.style.borderRadius = '5vw';
    bullet.style.position = 'relative';
    if (t == 'b') {
        leftb = parseInt(cb.value[2]);
        topb = 8;
        move = 'up';
        bullet.style.left = `${(parseInt(cb.value[2]) - 3) * 5 + 11.7}vw`;
        bullet.style.top = '-3vw';
    }
    else if (t == 'r') {
        leftb = parseInt(cr.value[2]);
        topb = 1;
        move = 'down';
        bullet.style.left = `${(parseInt(cr.value[2]) - 6) * 5 + 26.7}vw`;
        bullet.style.top = '-33vw';
    }
    gameBoard.appendChild(bullet);
    cannonsound.play();
    intervalId = setInterval(() => {
        if (topb >= 1 && topb <= 8 && leftb >= 1 && leftb <= 8) {
            if ((topb == parseInt(rb.value[1]) && leftb == parseInt(rb.value[2])) || (topb == parseInt(rr.value[1]) && leftb == parseInt(rr.value[2]))) {
                let x3;
                if (topb == parseInt(rb.value[1]) && leftb == parseInt(rb.value[2])) {
                    x3 = document.querySelector('#rb');
                }
                else {
                    x3 = document.querySelector('#rr');
                }
                if ((x3.style.backgroundImage == 'url("slanting_line1.png")')) {
                    if (move == 'up') {
                        ml();
                    }
                    else if (move == 'down') {
                        mr();
                    }
                    else if (move == 'left') {
                        mu();
                    }
                    else {
                        md();
                    }
                }
                else {
                    if (move == 'up') {
                        mr();
                    }
                    else if (move == 'down') {
                        ml();
                    }
                    else if (move == 'left') {
                        md();
                    }
                    else {
                        mu();
                    }
                }
                hitsom.play();
            }
            else if ((topb == parseInt(sb1.value[1]) && leftb == parseInt(sb1.value[2])) || (topb == parseInt(sb2.value[1]) && leftb == parseInt(sb2.value[2])) || (topb == parseInt(sr2.value[1]) && leftb == parseInt(sr2.value[2])) || (topb == parseInt(sr1.value[1]) && leftb == parseInt(sr1.value[2]))) {
                let x3;
                if ((topb == parseInt(sb1.value[1]) && leftb == parseInt(sb1.value[2]))) {
                    x3 = document.querySelector('#sb1');
                }
                else if ((topb == parseInt(sb2.value[1]) && leftb == parseInt(sb2.value[2]))) {
                    x3 = document.querySelector('#sb2');
                }
                else if ((topb == parseInt(sr1.value[1]) && leftb == parseInt(sr1.value[2]))) {
                    x3 = document.querySelector('#sr1');
                }
                else {
                    x3 = document.querySelector('#sr2');
                }
                if (move == 'left') {
                    if (x3.style.clipPath == 'polygon(0% 100%, 0% 0%, 100% 100%)') {
                        mu();
                    }
                    else if (x3.style.clipPath == 'polygon(0% 100%, 0% 0%, 100% 0%)') {
                        md();
                    }
                    else {
                        bulletstop();
                        if (t == 'b') {
                            r();
                            clearInterval(interval);
                            t = 'r';
                            interval = setInterval(() => {
                                updateTimer();
                            }, 1000);
                            int = 1;
                        }
                        else if (t == 'r') {
                            b();
                            clearInterval(interval);
                            t = 'b';
                            interval = setInterval(() => {
                                updateTimer();
                            }, 1000);
                            int = 1;
                        }
                    }
                }
                else if (move == 'up') {
                    if (x3.style.clipPath == 'polygon(0% 0%, 100% 0%, 100% 100%)') {
                        ml();
                    }
                    else if (x3.style.clipPath == 'polygon(0% 100%, 0% 0%, 100% 0%)') {
                        mr();
                    }
                    else {
                        bulletstop();
                        if (t == 'b') {
                            r();
                            clearInterval(interval);
                            t = 'r';
                            interval = setInterval(() => {
                                updateTimer();
                            }, 1000);
                            int = 1;
                        }
                        else if (t == 'r') {
                            b();
                            clearInterval(interval);
                            t = 'b';
                            interval = setInterval(() => {
                                updateTimer();
                            }, 1000);
                            int = 1;
                        }
                    }
                }
                else if (move == 'down') {
                    if (x3.style.clipPath == 'polygon(0% 100%, 0% 0%, 100% 100%)') {
                        mr();
                    }
                    else if (x3.style.clipPath == 'polygon(0% 100%, 100% 0%, 100% 100%)') {
                        ml();
                    }
                    else {
                        bulletstop();
                        if (t == 'b') {
                            r();
                            clearInterval(interval);
                            t = 'r';
                            interval = setInterval(() => {
                                updateTimer();
                            }, 1000);
                            int = 1;
                        }
                        else if (t == 'r') {
                            b();
                            clearInterval(interval);
                            t = 'b';
                            interval = setInterval(() => {
                                updateTimer();
                            }, 1000);
                            int = 1;
                        }
                    }
                }
                else {
                    if (x3.style.clipPath == 'polygon(0% 100%, 100% 0%, 100% 100%)') {
                        mu();
                    }
                    else if (x3.style.clipPath == 'polygon(0% 0%, 100% 0%, 100% 100%)') {
                        md();
                    }
                    else {
                        bulletstop();
                        if (t == 'b') {
                            r();
                            clearInterval(interval);
                            t = 'r';
                            interval = setInterval(() => {
                                updateTimer();
                            }, 1000);
                            int = 1;
                        }
                        else if (t == 'r') {
                            b();
                            clearInterval(interval);
                            t = 'b';
                            interval = setInterval(() => {
                                updateTimer();
                            }, 1000);
                            int = 1;
                        }
                    }
                }
                hitsom.play();
            }
            else if ((topb == parseInt(tb.value[1]) && leftb == parseInt(tb.value[2])) || (topb == parseInt(tr.value[1]) && leftb == parseInt(tr.value[2])) || (topb == 1 && leftb == parseInt(cr.value[2])) || (topb == 8 && leftb == parseInt(cb.value[2]))) {
                if (z != 0) {
                    bulletstop();
                    if (t == 'b') {
                        r();
                        clearInterval(interval);
                        t = 'r';
                        interval = setInterval(() => {
                            updateTimer();
                        }, 1000);
                        int = 1;
                    }
                    else if (t == 'r') {
                        b();
                        clearInterval(interval);
                        t = 'b';
                        interval = setInterval(() => {
                            updateTimer();
                        }, 1000);
                        int = 1;
                    }
                    hitsom.play();
                }
                else {
                    if (move == 'up') {
                        mu();
                    }
                    else if (move == 'down') {
                        md();
                    }
                    else if (move == 'left') {
                        ml();
                    }
                    else {
                        mr();
                    }
                }
            }
            else if ((topb == parseInt(tib.value[1]) && leftb == parseInt(tib.value[2])) || (topb == parseInt(tir.value[1]) && leftb == parseInt(tir.value[2]))) {
                bulletstop();
                t = 'end';
                clearInterval(interval);
                int = 0;
                clearInterval(intervalId);
                let x4 = document.createElement('div');
                gameBoard.appendChild(x4);
                x4.style.display = 'flex-box';
                x4.style.alignContent = 'center';
                x4.innerText = 'GAME OVER';
                gameover.play();
                tick.pause();
                x4.style.position = 'relative';
                x4.style.fontSize = '2vw';
                x4.style.left = '10vw';
                x4.style.top = '-25.1vw';
                x4.style.width = '20vw';
                x4.style.height = '10vw';
                x4.style.textAlign = 'center';
                if ((topb == parseInt(tib.value[1]) && leftb == parseInt(tib.value[2]))) {
                    x4.style.backgroundColor = 'blue';
                }
                else {
                    x4.style.backgroundColor = 'red';
                }
            }
            else {
                if (move == 'up') {
                    mu();
                }
                else if (move == 'down') {
                    md();
                }
                else if (move == 'left') {
                    ml();
                }
                else {
                    mr();
                }
            }
        }
        else {
            bulletstop();
            if (t == 'b') {
                r();
                clearInterval(interval);
                t = 'r';
                interval = setInterval(() => {
                    updateTimer();
                }, 1000);
                int = 1;
            }
            else if (t == 'r') {
                b();
                clearInterval(interval);
                t = 'b';
                interval = setInterval(() => {
                    updateTimer();
                }, 1000);
                int = 1;
            }
        }
    }, 250);
}
gameBoard.addEventListener("click", (e) => {
    if (g == 1) {
        if (t == 'b') {
            if (e.target.id == 'cb' || e.target.id == 'tib' || e.target.id == 'tb' || e.target.id == 'sb1' || e.target.id == 'sb2' || e.target.id == 'rb') {
                if (e.target != previousTarget) {
                    nocyan();
                    if (bs == 1) {
                        removelrb();
                        bs = 0;
                    }
                }
                ti = parseInt(e.target.value[1]);
                tj = parseInt(e.target.value[2]);
                for (i = ti - 1; i <= ti + 1; i += 1) {
                    for (j = tj - 1; j <= tj + 1; j += 1) {
                        if (i > 0 && i < 9 && j > 0 && j < 9) {
                            var x3 = document.querySelector(`#r${i}${j}`);
                            if (((parseInt(x3.id[1]) != parseInt(tib.value[1])) || (parseInt(x3.id[2]) != parseInt(tib.value[2]))) && ((parseInt(x3.id[1]) != parseInt(tir.value[1])) || (parseInt(x3.id[2]) != parseInt(tir.value[2]))) && ((parseInt(x3.id[1]) != parseInt(rr.value[1])) || (parseInt(x3.id[2]) != parseInt(rr.value[2]))) && ((parseInt(x3.id[1]) != parseInt(rb.value[1])) || (parseInt(x3.id[2]) != parseInt(rb.value[2]))) && ((parseInt(x3.id[1]) != parseInt(tr.value[1])) || (parseInt(x3.id[2]) != parseInt(tr.value[2]))) && ((parseInt(x3.id[1]) != parseInt(tb.value[1])) || (parseInt(x3.id[2]) != parseInt(tb.value[2]))) && ((parseInt(x3.id[1]) != parseInt(sr1.value[1])) || (parseInt(x3.id[2]) != parseInt(sr1.value[2]))) && ((parseInt(x3.id[1]) != parseInt(sb2.value[1])) || (parseInt(x3.id[2]) != parseInt(sb2.value[2]))) && ((parseInt(x3.id[1]) != parseInt(sb1.value[1])) || (parseInt(x3.id[2]) != parseInt(sb1.value[2]))) && ((parseInt(x3.id[1]) != parseInt(sr2.value[1])) || (parseInt(x3.id[2]) != parseInt(sr2.value[2])))) {
                                if (e.target.id[0] == 'c') {
                                    if (i == parseInt(e.target.value[1])) {
                                        if (x3.style.backgroundColor != 'cyan') {
                                            x3.style.backgroundColor = 'cyan';
                                        }
                                        else {
                                            x3.style.backgroundColor = 'white';
                                        }
                                        previousTarget = e.target;
                                    }
                                }
                                else if (e.target.id[0] == 's') {
                                    if (x3.style.backgroundColor != 'cyan') {
                                        x3.style.backgroundColor = 'cyan';
                                        if (bs == 0) {
                                            createlrb();
                                            bs = 1;
                                        }
                                    }
                                    else {
                                        x3.style.backgroundColor = 'white';
                                        if (bs == 1) {
                                            removelrb();
                                            bs = 0;
                                        }
                                    }
                                    previousTarget = e.target;
                                }
                                else if (e.target.id[0] == 'r') {
                                    if (x3.style.backgroundColor != 'cyan') {
                                        x3.style.backgroundColor = 'cyan';
                                        if (bs == 0) {
                                            createlrb();
                                            bs = 1;
                                        }
                                    }
                                    else {
                                        x3.style.backgroundColor = 'white';
                                        if (bs == 1) {
                                            removelrb();
                                            bs = 0;
                                        }
                                    }
                                    previousTarget = e.target;
                                }
                                else {
                                    if (x3.style.backgroundColor != 'cyan') {
                                        x3.style.backgroundColor = 'cyan';
                                    }
                                    else {
                                        x3.style.backgroundColor = 'white';
                                    }
                                    previousTarget = e.target;
                                }
                            }
                        }
                    }
                }
            }
            else if (e.target.style.backgroundColor == 'cyan') {
                nocyan();
                previousTarget.value = `r${parseInt(e.target.id[1])}${parseInt(e.target.id[2])}`;
                previousTarget.style.left = `${(previousTarget.value[2] - 1) * 5}vw`;
                previousTarget.style.top = `${(previousTarget.value[1] - 1) * 5}vw`;
                if (bs == 1) {
                    removelrb();
                    bs = 0;
                }
                bulletmov();
            }
            else if (e.target.id == 'left') {
                nocyan();
                if (previousTarget.id[0] == 's') {
                    if (previousTarget.style.clipPath == 'polygon(0% 100%, 0% 0%, 100% 0%)') {
                        previousTarget.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%)';
                    }
                    else if (previousTarget.style.clipPath == 'polygon(0% 0%, 100% 0%, 100% 100%)') {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 100% 0%, 100% 100%)';
                    }
                    else if (previousTarget.style.clipPath == 'polygon(0% 100%, 100% 0%, 100% 100%)') {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 0% 0%, 100% 100%)';
                    }
                    else {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 0% 0%, 100% 0%)';
                    }
                }
                else {
                    if (previousTarget.style.backgroundImage.includes("slanting_line1.png")) {
                        previousTarget.style.backgroundImage = "url('slanting_line2.png')";
                        previousTarget.style.border = '1px solid black';
                    }
                    else {
                        previousTarget.style.backgroundImage = "url('slanting_line1.png')";
                    }
                }
                removelrb();
                bs = 0;
                bulletmov();
            }
            else if (e.target.id == 'right') {
                nocyan();
                if (previousTarget.id[0] == 's') {
                    if (previousTarget.style.clipPath == 'polygon(0% 100%, 0% 0%, 100% 0%)') {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 0% 0%, 100% 100%)';
                    }
                    else if (previousTarget.style.clipPath == 'polygon(0% 0%, 100% 0%, 100% 100%)') {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 0% 0%, 100% 0%)';
                    }
                    else if (previousTarget.style.clipPath == 'polygon(0% 100%, 100% 0%, 100% 100%)') {
                        previousTarget.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%)';
                    }
                    else {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 100% 0%, 100% 100%)';
                    }
                }
                else {
                    if (previousTarget.style.backgroundImage.includes("slanting_line1.png")) {
                        previousTarget.style.backgroundImage = "url('slanting_line2.png')";
                        previousTarget.style.border = '1px solid black';
                    }
                    else {
                        previousTarget.style.backgroundImage = "url('slanting_line1.png')";
                    }
                }
                removelrb();
                bs = 0;
                bulletmov();
            }
            else {
                nocyan();
                if (bs == 1) {
                    removelrb();
                    bs = 0;
                }
            }
        }
        else if (t == 'r') {
            if (e.target.id == 'cr' || e.target.id == 'tir' || e.target.id == 'tr' || e.target.id == 'sr1' || e.target.id == 'sr2' || e.target.id == 'rr') {
                if (e.target != previousTarget) {
                    nocyan();
                    if (bs == 1) {
                        removelrb();
                        bs = 0;
                    }
                }
                ti = parseInt(e.target.value[1]);
                tj = parseInt(e.target.value[2]);
                for (i = ti - 1; i <= ti + 1; i += 1) {
                    for (j = tj - 1; j <= tj + 1; j += 1) {
                        if (i > 0 && i < 9 && j > 0 && j < 9) {
                            var x3 = document.querySelector(`#r${i}${j}`);
                            if (((parseInt(x3.id[1]) != parseInt(tib.value[1])) || (parseInt(x3.id[2]) != parseInt(tib.value[2]))) && ((parseInt(x3.id[1]) != parseInt(tir.value[1])) || (parseInt(x3.id[2]) != parseInt(tir.value[2]))) && ((parseInt(x3.id[1]) != parseInt(rr.value[1])) || (parseInt(x3.id[2]) != parseInt(rr.value[2]))) && ((parseInt(x3.id[1]) != parseInt(rb.value[1])) || (parseInt(x3.id[2]) != parseInt(rb.value[2]))) && ((parseInt(x3.id[1]) != parseInt(tr.value[1])) || (parseInt(x3.id[2]) != parseInt(tr.value[2]))) && ((parseInt(x3.id[1]) != parseInt(tb.value[1])) || (parseInt(x3.id[2]) != parseInt(tb.value[2]))) && ((parseInt(x3.id[1]) != parseInt(sr1.value[1])) || (parseInt(x3.id[2]) != parseInt(sr1.value[2]))) && ((parseInt(x3.id[1]) != parseInt(sb2.value[1])) || (parseInt(x3.id[2]) != parseInt(sb2.value[2]))) && ((parseInt(x3.id[1]) != parseInt(sb1.value[1])) || (parseInt(x3.id[2]) != parseInt(sb1.value[2]))) && ((parseInt(x3.id[1]) != parseInt(sr2.value[1])) || (parseInt(x3.id[2]) != parseInt(sr2.value[2])))) {
                                if (e.target.id[0] == 'c') {
                                    if (i == parseInt(e.target.value[1])) {
                                        if (x3.style.backgroundColor != 'cyan') {
                                            x3.style.backgroundColor = 'cyan';
                                        }
                                        else {
                                            x3.style.backgroundColor = 'white';
                                        }
                                        previousTarget = e.target;
                                    }
                                }
                                else if (e.target.id[0] == 's') {
                                    if (x3.style.backgroundColor != 'cyan') {
                                        x3.style.backgroundColor = 'cyan';
                                        if (bs == 0) {
                                            createlrb();
                                            bs = 1;
                                        }
                                    }
                                    else {
                                        x3.style.backgroundColor = 'white';
                                        if (bs == 1) {
                                            removelrb();
                                            bs = 0;
                                        }
                                    }
                                    previousTarget = e.target;
                                }
                                else if (e.target.id[0] == 'r') {
                                    if (x3.style.backgroundColor != 'cyan') {
                                        x3.style.backgroundColor = 'cyan';
                                        if (bs == 0) {
                                            createlrb();
                                            bs = 1;
                                        }
                                    }
                                    else {
                                        x3.style.backgroundColor = 'white';
                                        if (bs == 1) {
                                            removelrb();
                                            bs = 0;
                                        }
                                    }
                                    previousTarget = e.target;
                                }
                                else {
                                    if (x3.style.backgroundColor != 'cyan') {
                                        x3.style.backgroundColor = 'cyan';
                                    }
                                    else {
                                        x3.style.backgroundColor = 'white';
                                    }
                                    previousTarget = e.target;
                                }
                            }
                        }
                    }
                }
            }
            else if (e.target.style.backgroundColor == 'cyan') {
                nocyan();
                previousTarget.value = `r${parseInt(e.target.id[1])}${parseInt(e.target.id[2])}`;
                previousTarget.style.left = `${(previousTarget.value[2] - 1) * 5}vw`;
                previousTarget.style.top = `${(previousTarget.value[1] - 1) * 5}vw`;
                if (bs == 1) {
                    removelrb();
                    bs = 0;
                }
                bulletmov();
            }
            else if (e.target.id == 'left') {
                nocyan();
                if (previousTarget.id[0] == 's') {
                    if (previousTarget.style.clipPath == 'polygon(0% 100%, 0% 0%, 100% 0%)') {
                        previousTarget.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%)';
                    }
                    else if (previousTarget.style.clipPath == 'polygon(0% 0%, 100% 0%, 100% 100%)') {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 100% 0%, 100% 100%)';
                    }
                    else if (previousTarget.style.clipPath == 'polygon(0% 100%, 100% 0%, 100% 100%)') {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 0% 0%, 100% 100%)';
                    }
                    else {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 0% 0%, 100% 0%)';
                    }
                }
                else {
                    if (previousTarget.style.backgroundImage.includes("slanting_line1.png")) {
                        previousTarget.style.backgroundImage = "url('slanting_line2.png')";
                        previousTarget.style.border = '1px solid black';
                    }
                    else {
                        previousTarget.style.backgroundImage = "url('slanting_line1.png')";
                    }
                }
                removelrb();
                bs = 0;
                bulletmov();
            }
            else if (e.target.id == 'right') {
                nocyan();
                if (previousTarget.id[0] == 's') {
                    if (previousTarget.style.clipPath == 'polygon(0% 100%, 0% 0%, 100% 0%)') {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 0% 0%, 100% 100%)';
                    }
                    else if (previousTarget.style.clipPath == 'polygon(0% 0%, 100% 0%, 100% 100%)') {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 0% 0%, 100% 0%)';
                    }
                    else if (previousTarget.style.clipPath == 'polygon(0% 100%, 100% 0%, 100% 100%)') {
                        previousTarget.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%)';
                    }
                    else {
                        previousTarget.style.clipPath = 'polygon(0% 100%, 100% 0%, 100% 100%)';
                    }
                }
                else {
                    if (previousTarget.style.backgroundImage.includes("slanting_line1.png")) {
                        previousTarget.style.backgroundImage = "url('slanting_line2.png')";
                        previousTarget.style.border = '1px solid black';
                    }
                    else {
                        previousTarget.style.backgroundImage = "url('slanting_line1.png')";
                    }
                }
                removelrb();
                bs = 0;
                bulletmov();
            }
            else {
                nocyan();
                if (bs == 1) {
                    removelrb();
                    bs = 0;
                }
            }
        }
    }
})
buttons.addEventListener('click', (e) => {
    if (e.target.id == 'pause') {
        tick.pause();
        pt = t;
        t = 's';
        clearInterval(interval);
        int = 0;
    }
    else if (e.target.id == 'resume' && int != 1) {
        tick.play();
        t = pt;
        interval = setInterval(() => {
            updateTimer();
        }, 1000)
        int = 1;
        if (g == 0) {
            inst.remove();
            g = 1;
        }
    }
    else if (e.target.id == 'reset') {
        location.reload();
    }
    else if (e.target.id == 'back') {
        window.location.href = 'index.html';
    }
})
