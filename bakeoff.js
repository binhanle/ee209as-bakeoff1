const NUM_ROWS = 13;
const NUM_COLS = 2;
const COL_OFFSET = 13;
document.addEventListener('DOMContentLoaded', start, false);

function start() {
    letterArea = document.getElementById("letterArea");
    addLetterButtons(letterArea);
    document.getElementById("buttonBksp").addEventListener("click", function() {
        write(this);
    });
    document.getElementById("buttonSpace").addEventListener("click", function() {
        write(this);
    });
    document.getElementById("buttonUp").addEventListener("click", function() {
        scrollUp(letterArea);
    });
    document.getElementById("buttonDown").addEventListener("click", function() {
        scrollDown(letterArea);
    });
    
    var btnLeft = document.getElementById("btnLeft");
    var btnRight = document.getElementById("btnRight");

    btnLeft.textContent = "G";
    btnRight.textContent = "T";

    var mcLeft = new Hammer.Manager(btnLeft);
    mcLeft.add(new Hammer.Tap({event: "singletap"}));
    mcLeft.add(new Hammer.Swipe())
    mcLeft.on("swipe", swipeFunc);
    mcLeft.on("singletap", function(ev) {
        document.getElementById("msg").innerHTML += btnLeft.textContent
    });

    var mcRight = new Hammer.Manager(btnRight);
    mcRight.add(new Hammer.Tap({event: "singletap"}));
    mcRight.add(new Hammer.Swipe())
    mcRight.on("swipe", swipeFunc);
    mcRight.on("singletap", function(ev) {
        document.getElementById("msg").innerHTML += btnRight.textContent
    });
    
    function swipeFunc(ev) {
        var deltaY = ev.deltaY
        if (deltaY > 0) {
            //Swipe down
            btnLeft.textContent = letterAfter(btnLeft.textContent);
            btnRight.textContent = letterAfter(btnRight.textContent);
        } else if (deltaY < 0) {
            //Swipe up
            btnLeft.textContent = letterBefore(btnLeft.textContent);
            btnRight.textContent = letterBefore(btnRight.textContent);
        }
    }

    function write(elem) {
        if (elem.value == "Bksp") {
            currText = document.getElementById("msg").innerHTML;
            document.getElementById("msg").innerHTML = currText.slice(0, -1);
        } else if (elem.value == "␣") {
            document.getElementById("msg").innerHTML += " ";
        } else {
            document.getElementById("msg").innerHTML += elem.value;
        }
    }

    function letterBefore(letter) {
        if (letter == 'A') {
            return 'Z';
        }
        return String.fromCharCode(letter.charCodeAt() - 1);
    }

    function letterAfter(letter) {
        if (letter == 'Z') {
            return 'A';
        }
        return String.fromCharCode(letter.charCodeAt() + 1);
    }

    function scrollUp(elem) {
        var buttons = elem.getElementsByClassName("button");
        for (const button of buttons) {
            button.value = letterBefore(button.value);
        }
    }

    function scrollDown(elem) {
        var buttons = elem.getElementsByClassName("button");
        for (const button of buttons) {
            button.value = letterAfter(button.value);
        }
    }

    function addLetterButtons(elem) {
        for (var i = 0; i < NUM_ROWS; i++) {
            for (var j = 0; j < NUM_COLS; j++) {
                var btn = document.createElement("input");
                btn.className = "button";
                btn.type = "button";
                btn.id = `button${i}_${j}`;
                charCode = COL_OFFSET * j + i + 65;
                btn.value = String.fromCharCode(charCode);
                btn.addEventListener("click", function() {
                    write(this);
                });
                if (i != Math.floor((NUM_ROWS - 1) / 2)) {
                    btn.disabled = true;
                }
                elem.appendChild(btn);
            }
            var br = document.createElement("br");
            elem.appendChild(br);
        }
    }
};