//Selectors
const tobuyInput = document.querySelector(".tobuy-input");
const tobuyButton = document.querySelector(".tobuy-button");
const tobuyList = document.querySelector(".tobuy-list");
const filterOption = document.querySelector(".filter-tobuys");


//Event listeners
document.addEventListener('DOMContentLoaded', getLocalTobuys);
tobuyButton.addEventListener('click', addTobuy);
tobuyList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTobuy);

//Functions

function addTobuy(event) {
    // Prevent form from submitting
    event.preventDefault();

    const tobuyDiv = document.createElement("div");
    tobuyDiv.classList.add("tobuy");

    const newTobuy = document.createElement("li");
    newTobuy.innerText = tobuyInput.value;
    newTobuy.classList.add("tobuy-item");

    tobuyDiv.appendChild(newTobuy);

    saveLocalTobuys(tobuyInput.value)

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    tobuyDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    tobuyDiv.appendChild(trashButton);

    tobuyList.appendChild(tobuyDiv);
    tobuyInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    //delete tobuy
    if (item.classList[0] === 'trash-btn') {
        item.parentElement.classList.add("fall");
        removeLocalTobuy(item.parentElement);
        item.parentElement.addEventListener('transitionend', function() {
            item.parentElement.remove();
        });
    }

    //checkmark
    if (item.classList[0] === "complete-btn") {
        item.parentElement.classList.toggle('completed');
    }
}

function filterTobuy(event) {
    const tobuys = tobuyList.childNodes;

    console.log(tobuys);
    tobuys.forEach((tobuy) => {
        switch (event.target.value) {
            case "all":
                tobuy.style.display = 'flex';
                break;
            case "completed":
                if (tobuy.classList.contains('completed')) {
                    tobuy.style.display = 'flex';
                } else {
                    tobuy.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!tobuy.classList.contains('completed')) {
                    tobuy.style.display = 'flex';
                } else {
                    tobuy.style.display = 'none';
                }
                break;

        }
    });
}

function removeLocalTobuy(tobuy) {
    let tobuys;

    if (localStorage.getItem('tobuys') === null) {
        tobuys = [];
    } else {
        tobuys = JSON.parse(localStorage.getItem('tobuys'));
    }

    tobuys.splice(tobuys.indexOf(tobuy.children[0].innerText), 1);
    localStorage.setItem('tobuys', JSON.stringify(tobuys));
}

function saveLocalTobuys(tobuy) {
    let tobuys;

    if (localStorage.getItem('tobuys') === null) {
        tobuys = [];
    } else {
        tobuys = JSON.parse(localStorage.getItem('tobuys'));
    }
    tobuys.push(tobuy);
    localStorage.setItem('tobuys', JSON.stringify(tobuys));
}

function getLocalTobuys() {
    let tobuys;

    if (localStorage.getItem('tobuys') === null) {
        tobuys = [];
    } else {
        tobuys = JSON.parse(localStorage.getItem('tobuys'));
    }
    tobuys.forEach(function(tobuy) {
        const tobuyDiv = document.createElement("div");
        tobuyDiv.classList.add("tobuy");

        const newTobuy = document.createElement("li");
        newTobuy.innerText = tobuy;
        newTobuy.classList.add("tobuy-item");

        tobuyDiv.appendChild(newTobuy);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        tobuyDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        tobuyDiv.appendChild(trashButton);

        tobuyList.appendChild(tobuyDiv);
    });
}