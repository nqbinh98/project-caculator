// Get btns
const btnsNumber= document.querySelectorAll('.btn-number');
const btnsOperate = document.querySelectorAll('.btn-operate');
const equalBtn = document.querySelector('.equal');
const showValue = document.querySelector('.showValue');
const clearBtn = document.querySelector('.clearBtn');

// Set initial value
let numbers = [];
let calc;
let saveValue = '';
let numbA = ''; 
let numbB = ''; 

// tach ham luu cac so va ham luu cac phep tinh,
// tach nghe su kien o cac so va cac phep tinh

btnsNumber.forEach(btn => btn.onclick = function (e) {
    let value = e.target.textContent;
    // e.target.style.scale = 0.9
    operate(value);
    if (numbA && calc && numbB) {
        getResult(numbA, numbB, calc)
    }
})

btnsOperate.forEach(btn => btn.onclick = function (e) {
    let value = e.target.textContent;
    if (saveValue) {
        showValue.textContent = numbA;        
    } 
    operate(value);   
    // if (numbA && calc && numbB) {
    //     getResult(numbB, numbB, calc)
    // }
})

clearBtn.addEventListener('click', function () {
    numbA = ''; 
    numbB = ''; 
    calc = '';
    saveValue = '';
    showValue.textContent = '';
})

equalBtn.onclick = function () {
    showValue.textContent = saveValue;
}

function operate (value) {

    if (!isNaN(Number(value))) {
        if(!calc) { 
            if (numbA) {
                numbA += value;
                showValue.textContent += value;
            } else {
                numbA += value;
                showValue.textContent += numbA;
            }
        } else {
            if (numbB) {
                numbB += value;
                console.log(`Number A: ${numbA}`)
                console.log(`Number B: ${numbB}`)
                
                showValue.textContent += value;
            } else {
                numbB += value;
                console.log(`Number A: ${numbA}`)
                console.log(`Number B: ${numbB}`)
                showValue.textContent += numbB;
            }
        }
    } else {
        if(numbA) {

            calc = value;
        } else {
            calc = '';

        }
        console.log(`Calc: ${calc}`);

        showValue.textContent += calc;
    }
}

// Create function for calculate
function add (a, b) {
    let tmpResult = 0;
    tmpResult = Number(a) + Number(b);
    return tmpResult;
}
function sub (a, b) {
    let tmpResult = 0;
    tmpResult = Number(a) - Number(b);
    return tmpResult;
}
function mul (a, b) {
    let tmpResult = 0;
    tmpResult = Number(a) * Number(b);
    return tmpResult;
}
function divide (a, b) {
    let tmpResult = 0;
    tmpResult = Number(a) / Number(b);
    return tmpResult;
}

function getResult (a,b,c) {
    console.log(`A: ${a}`)
    console.log(`B: ${b}`)
    console.log(`C: ${c}`);

    let result = 0;

    if (c === '-') {
        result = sub(a, b)
    }
    if (c === '+') {
        result = add(a, b)
    }
    if (c === 'x') {
        result = mul(a, b)
    }
    if (c === '/') {
        result = divide(a, b)
    }
    console.log(result)
    saveValue = result;
    
    if (saveValue) {
        numbA = saveValue; 
        numbB = ''; 
        calc = ''
        
    }
}

