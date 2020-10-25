const NUM_ROWS = 13;
const NUM_COLS = 2;
const COL_OFFSET = 13;
document.addEventListener('DOMContentLoaded', start, false);

function start() {
    letterArea = document.getElementById("letterArea");
    addLetterButtons(letterArea);

    var btnLeft = document.getElementById("btnLeft");
    var btnRight = document.getElementById("btnRight");

    btnLeft.value = "G";
    btnRight.value = "T";

    var mcLeft = new Hammer.Manager(btnLeft);
    mcLeft.add(new Hammer.Tap({event: "singletap"}));
    mcLeft.add(new Hammer.Swipe())
    mcLeft.on("swipe", swipeFunc);
    mcLeft.on("singletap", function() {
        write(btnLeft)
    });

    var mcRight = new Hammer.Manager(btnRight);
    mcRight.add(new Hammer.Tap({event: "singletap"}));
    mcRight.add(new Hammer.Swipe())
    mcRight.on("swipe", swipeFunc);
    mcRight.on("singletap", function() {
        write(btnRight)
    });
    
    function swipeFunc(ev) {
        var deltaY = ev.deltaY;
        var deltaX = ev.deltaX;
        console.log(deltaY)
        console.log(deltaX)

        //Up-down swipe
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            if (deltaY < 0) {
                //Swipe up: scroll down
                scrollDown(letterArea)
                btnLeft.value = letterAfter(btnLeft.value);
                btnRight.value = letterAfter(btnRight.value);
            } else if (deltaY > 0) {
                //Swipe down: scroll up
                scrollUp(letterArea)
                btnLeft.value = letterBefore(btnLeft.value);
                btnRight.value = letterBefore(btnRight.value);
            }
        //Left-right swipe
        } else {
            if (deltaX < 0) {
                //Swipe left: backspace
                write(btnLeft, "back")

            } else if (deltaX > 0) {
                //Swipe right: space
                write(btnLeft, "space")
            }
        }
    }

    function write(elem, val="") {
        currText = document.getElementById("msg").innerHTML;

        if (val == "back") {
            document.getElementById("msg").innerHTML = currText.slice(0, -2) + "_";
        } else if (val == "space") {
            document.getElementById("msg").innerHTML = currText.slice(0, -1) + " _";
        } else {
            currText = currText.slice(0, -1) + elem.value + "_";
            document.getElementById("msg").innerHTML = currText;
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
                btn.type = "button";

                charCode = COL_OFFSET * j + i + 65;
                btn.value = String.fromCharCode(charCode);
                if (j == 1) {
                    btn.style = "float: right";
                }

                if (i == Math.floor((NUM_ROWS - 1) / 2)) {
                    btn.className = "hammerButton";
                    if (j == 0) {
                        btn.id = "btnLeft";
                    } else {
                        btn.id = "btnRight";
                    }
                } else {
                    btn.className = "button"
                    btn.id = `button${i}_${j}`;
                    btn.disabled = true;
                }
                elem.appendChild(btn);
            }
            var br = document.createElement("br");
            elem.appendChild(br);
        }
    }
};