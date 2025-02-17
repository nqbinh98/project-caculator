// Get btns
const btnsNumber= document.querySelectorAll('.btn-number');
const btnsOperate = document.querySelectorAll('.btn-operate');
const btnChange = document.querySelector('.btn-change');
const btnPercent = document.querySelector('.btn-percent');
const btnDelete = document.querySelector('.deleteBtn');
const equalBtn = document.querySelector('.equal');
const showValue = document.querySelector('.showValue');
const clearBtn = document.querySelector('.clearBtn');
// Set initial value
let calc;
let numbA = ''; 
let numbB = ''; 

function updateDisplay() {
    showValue.textContent = (numbA || 0) + (calc ? calc : '') + numbB;
}

function addNumber (value) {
    if (value === "." && (!calc ? numbA.includes(".") : numbB.includes("."))) {
        return;
    }
    if (value === "." && !numbA) {
        return;
    }
    if (!calc) {
        numbA = numbA ? numbA + value : value;
    } else {
        numbB = numbB ? numbB + value : value;
    }
    updateDisplay();
}

function setOperator (value) {
    if (!numbA) return;
    if(numbB) {
        computeResult()
    }

    calc = value;
    updateDisplay();
}

function computeResult() {
    if (!numbA || !calc || !numbB) return;

    let result = 0;
    switch (calc) {
        case "-":
            result = sub(numbA, numbB);
            break;
        case "+":
            result = add(numbA, numbB);
            break;
        case "*":
            result = mul(numbA, numbB);
            break;
        case "/":
            if (numbB === 0) {
                return "Error";
            }
            result = divide(numbA, numbB);
            break;
`z`
        default: return;       
    }

    numbA = result.toString();
    numbB = ''; 
    calc = '';
    updateDisplay();
    

}


btnDelete.onclick = function () {

    if (numbB) {
        numbB = numbB.slice(0, -1);
    } else if (calc) {
        calc = "";
    } else {
        numbA = numbA.slice(0, -1);
    }
    updateDisplay()

}

btnChange.onclick = function () {
    
    if (!calc) {
        numbA = numbA ? String(-Number(numbA)) : numbA;
    } else if (numbB) {
        numbB = String(-Number(numbB));
    }

    updateDisplay()
}

btnPercent.onclick = function () {
    
    if (!calc) {
        numbA = String(Number(numbA/100));
    } else if (numbB) {
        numbB = String(Number(numbB/100));
    }

    updateDisplay()
}

btnsNumber.forEach(btn => btn.onclick = function (e) {
    let value = e.target.textContent;
    addNumber(value);
})

btnsOperate.forEach(btn => btn.onclick = function (e) {
    let value = e.target.textContent;
    setOperator(value)
})

clearBtn.addEventListener('click', function () {
    numbA = ''; 
    numbB = ''; 
    calc = '';
    updateDisplay();
})

equalBtn.onclick = computeResult;

// Create function for calculate
function add (a, b) {
    return Number(a) + Number(b);
}
function sub (a, b) {
    return Number(a) - Number(b);
}
function mul (a, b) {
    return Number(a) * Number(b);
}
function divide (a, b) {
    if(Number(b) === 0) {
        alert("Error: Can not divide to 0")
        return "Error"
    }
    return Number(a) / Number(b);
}

