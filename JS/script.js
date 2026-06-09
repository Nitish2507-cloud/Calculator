/* =====================================================
   SMART CALCULATOR PRO X
   COMPLETE SCRIPT - PART 1
===================================================== */

/* =====================================================
   LOADER
===================================================== */

window.addEventListener(

    "load",

    ()=>{

        const loader =

        document.getElementById(
            "loader"
        );

        setTimeout(()=>{

            loader.style.opacity =
            "0";

            setTimeout(()=>{

                loader.style.display =
                "none";

            },500);

        },1200);

    }

);

/* =====================================================
   ELEMENTS
===================================================== */

const display =
document.getElementById(
    "display"
);

const liveResult =
document.getElementById(
    "liveResult"
);

const historyList =
document.getElementById(
    "historyList"
);

const buttons =
document.querySelectorAll(
    ".buttons button"
);

const copyBtn =
document.getElementById(
    "copyBtn"
);

const clearHistoryBtn =
document.getElementById(
    "clearHistory"
);

const exportBtn =
document.getElementById(
    "exportHistory"
);

const themeToggle =
document.getElementById(
    "themeToggle"
);

const scientificBtn =
document.getElementById(
    "scientificBtn"
);

const scientificPanel =
document.getElementById(
    "scientificPanel"
);

/* =====================================================
   STATE
===================================================== */

let expression = "";

let history =

JSON.parse(

localStorage.getItem(
    "calcHistory"
)

) || [];

/* =====================================================
   HISTORY RENDER
===================================================== */

function renderHistory(){

    historyList.innerHTML = "";

    history
    .slice()
    .reverse()
    .forEach(item=>{

        const div =

        document.createElement(
            "div"
        );

        div.className =
        "history-item";

        div.textContent =
        item;

        historyList.appendChild(
            div
        );

    });

}

renderHistory();

/* =====================================================
   LIVE RESULT
===================================================== */

function updateLiveResult(){

    try{

        if(
            expression === ""
        ){

            liveResult.textContent =
            "0";

            return;
        }

        const result =

        eval(expression);

        liveResult.textContent =
        result;

    }

    catch{

        liveResult.textContent =
        "...";
    }

}

/* =====================================================
   DISPLAY
===================================================== */

function updateDisplay(){

    display.value =
    expression;

    updateLiveResult();

}

/* =====================================================
   CALCULATE
===================================================== */

function calculate(){

    try{

        const result =

        eval(expression);

        const entry =

        `${expression} = ${result}`;

        history.push(
            entry
        );

        if(
            history.length > 25
        ){

            history.shift();

        }

        localStorage.setItem(

            "calcHistory",

            JSON.stringify(
                history
            )

        );

        renderHistory();

        expression =
        String(result);

        updateDisplay();

    }

    catch{

        liveResult.textContent =
        "Error";
    }

}

/* =====================================================
   INPUT HANDLER
===================================================== */

function handleInput(value){

    if(
        value === "C"
    ){

        expression = "";

        updateDisplay();

        return;
    }

    if(
        value === "DEL"
    ){

        expression =

        expression.slice(
            0,
            -1
        );

        updateDisplay();

        return;
    }

    if(
        value === "%"
    ){

        try{

            expression =

            String(

            eval(expression)

            /100

            );

            updateDisplay();

        }

        catch{}

        return;
    }

    if(
        value === "="
    ){

        calculate();

        return;
    }

    expression += value;

    updateDisplay();

}

/* =====================================================
   BUTTON EVENTS
===================================================== */

buttons.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            const value =

            button.dataset.value;

            handleInput(
                value
            );

        }

    );

});
/* =====================================================
   COPY RESULT
===================================================== */

copyBtn.addEventListener(

    "click",

    async ()=>{

        try{

            await navigator
            .clipboard
            .writeText(

                liveResult.textContent

            );

            copyBtn.innerHTML =

            `<i class="fa-solid fa-check"></i>
             Copied`;

            setTimeout(()=>{

                copyBtn.innerHTML =

                `<i class="fa-solid fa-copy"></i>
                 Copy Result`;

            },1500);

        }

        catch{

            alert(
            "Copy Failed"
            );

        }

    }

);

/* =====================================================
   CLEAR HISTORY
===================================================== */

clearHistoryBtn.addEventListener(

    "click",

    ()=>{

        history = [];

        localStorage.removeItem(
            "calcHistory"
        );

        renderHistory();

    }

);

/* =====================================================
   EXPORT HISTORY
===================================================== */

exportBtn.addEventListener(

    "click",

    ()=>{

        if(
            history.length === 0
        ){

            alert(
            "No history available"
            );

            return;
        }

        const content =

        history.join("\n");

        const blob =

        new Blob(

            [content],

            {
                type:"text/plain"
            }

        );

        const link =

        document.createElement(
            "a"
        );

        link.href =

        URL.createObjectURL(
            blob
        );

        link.download =

        "calculator-history.txt";

        link.click();

    }

);

/* =====================================================
   KEYBOARD SUPPORT
===================================================== */

document.addEventListener(

    "keydown",

    (e)=>{

        const key =
        e.key;

        const allowed =

        "0123456789+-*/.%";

        if(

            allowed.includes(key)

        ){

            expression += key;

            updateDisplay();

        }

        if(

            key === "Enter"

        ){

            e.preventDefault();

            calculate();

        }

        if(

            key === "Backspace"

        ){

            expression =

            expression.slice(
                0,
                -1
            );

            updateDisplay();

        }

        if(

            key === "Delete"

        ){

            expression = "";

            updateDisplay();

        }

    }

);

/* =====================================================
   THEME SYSTEM
===================================================== */

function loadTheme(){

    const theme =

    localStorage.getItem(
        "theme"
    );

    if(

        theme === "cyber"

    ){

        document.body
        .classList.add(
            "cyber"
        );

    }

}

loadTheme();

themeToggle.addEventListener(

    "click",

    ()=>{

        document.body
        .classList.toggle(
            "cyber"
        );

        if(

            document.body
            .classList.contains(
                "cyber"
            )

        ){

            localStorage.setItem(

                "theme",

                "cyber"

            );

        }

        else{

            localStorage.setItem(

                "theme",

                "classic"

            );

        }

    }

);

/* =====================================================
   SCIENTIFIC PANEL
===================================================== */

scientificPanel.style.display =
"none";

scientificBtn.addEventListener(

    "click",

    ()=>{

        if(

            scientificPanel.style.display
            === "grid"

        ){

            scientificPanel.style.display =
            "none";

        }

        else{

            scientificPanel.style.display =
            "grid";

        }

    }

);

/* =====================================================
   SCIENTIFIC FUNCTIONS
===================================================== */

const scientificButtons =

document.querySelectorAll(
"#scientificPanel button"
);

scientificButtons.forEach(

btn=>{

    btn.addEventListener(

        "click",

        ()=>{

            if(
                expression === ""
            ) return;

            const func =

            btn.dataset.func;

            try{

                const value =

                Number(
                    expression
                );

                let result;

                switch(func){

                    case "sqrt":

                        result =
                        Math.sqrt(value);

                        break;

                    case "square":

                        result =
                        value * value;

                        break;

                  case "sin":

    result =
    Math.sin(
        value * Math.PI / 180
    );

    result =
    Number(
        result.toFixed(10)
    );

    break;

case "cos":

    result =
    Math.cos(
        value * Math.PI / 180
    );

    result =
    Number(
        result.toFixed(10)
    );

    break;

case "tan":

    result =
    Math.tan(
        value * Math.PI / 180
    );

    result =
    Number(
        result.toFixed(10)
    );

    break;
                }

                const entry =

                `${func}(${value}) = ${result}`;

                history.push(
                    entry
                );

                if(
                    history.length > 25
                ){

                    history.shift();

                }

                localStorage.setItem(

                    "calcHistory",

                    JSON.stringify(
                        history
                    )

                );

                renderHistory();

                expression =
                String(result);

                updateDisplay();

            }

            catch{

                liveResult.textContent =
                "Error";
            }

        }

    );

});

/* =====================================================
   INITIALIZE
===================================================== */

updateDisplay();

console.log(

    "%c Smart Calculator Pro X Ready 🚀",

    "color:#00ff88;font-size:16px;font-weight:bold;"

);