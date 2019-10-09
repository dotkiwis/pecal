$(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});



const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let getDaysInMonth = function (month, year) {
    //console.log(month, year)
    return new Date(year, month, 0).getDate();
};


function range(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear += 1;
    } else {
        currentMonth += 1;
    }
    myFunction();
}

function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else {
        currentMonth -= 1;
    }
    myFunction();
}

const todayDate = new Date();
const actualCurrentMonth = todayDate.getMonth();
const actualCurrentYear = todayDate.getFullYear();
const actualCurrentDay = todayDate.getDate();

let currentMonth = todayDate.getMonth();
let currentYear = todayDate.getFullYear();

function myFunction() {
    if (actualCurrentMonth == currentMonth && actualCurrentYear == currentYear) {
        document.getElementById("page-left").onclick = null;
    } else {
        document.getElementById("page-left").onclick = prevMonth;
    }

    document.getElementById("monthYear").innerHTML = monthNames[currentMonth] + " " + currentYear;

    let table = document.getElementById("month1");
    table.innerHTML = "";
    let b = 0;

    let monthDays = getDaysInMonth(parseInt(currentMonth) + 1, 2019);
    //console.log("monthDays : " + monthDays);

    let a = range(1, monthDays);
    //console.log(a)


    //console.log(actualCurrentDay)
    for (i = 0; i < a.length / 7; i++) {
        let row = table.insertRow(i);
        for (j = 0; j < 7; j++) {
            // //console.log("i", i, "j", j, "i+j", i + j, "b", b)
            if (a[i + j + b] != undefined) {
                let cell1 = row.insertCell(j);
                let x = document.createElement("span");
                x.className = (parseInt(a[i + j + b]) >= actualCurrentDay || parseInt(currentMonth) > parseInt(
                        actualCurrentMonth) || parseInt(currentYear) > parseInt(actualCurrentYear)) ?
                    "numberCircle" : "unCircle";
                x.innerHTML = a[i + j + b];
                cell1.append(x);
                cell1.onclick = function () {
                    getval(this)
                };
            }
        }
        b += 6;

    }
}

function myFunction2() {
    if (actualCurrentMonth == currentMonth && actualCurrentYear == currentYear) {
        document.getElementById("page-left").onclick = null;
    } else {
        document.getElementById("page-left").onclick = prevMonth;
    }

    document.getElementById("monthYear").innerHTML = monthNames[currentMonth] + " " + currentYear;

    let table = document.getElementById("month2");
    table.innerHTML = "";
    let b = 0;

    let monthDays = getDaysInMonth(parseInt(currentMonth) + 2, 2019);
    //console.log("monthDays : " + monthDays);

    let a = range(1, monthDays);
    //console.log(a)


    //console.log(actualCurrentDay)
    for (i = 0; i < a.length / 7; i++) {
        let row = table.insertRow(i);
        for (j = 0; j < 7; j++) {
            // //console.log("i", i, "j", j, "i+j", i + j, "b", b)
            if (a[i + j + b] != undefined) {
                let cell1 = row.insertCell(j);
                let x = document.createElement("span");
                x.className = (parseInt(a[i + j + b]) >= actualCurrentDay || parseInt(currentMonth) > parseInt(
                        actualCurrentMonth) || parseInt(currentYear) > parseInt(actualCurrentYear)) ?
                    "numberCircle" : "unCircle";
                x.innerHTML = a[i + j + b];
                cell1.append(x);
                cell1.onclick = function () {
                    getval(this)
                };
            }
        }
        b += 6;

    }
}


let values = [];
let selectedDate;
let selectedFullDate;
let gslot;
let gcurrent;
let bookings = [];

function getval(cel) {
    $("#appoint-list").hide();
    selectedDate = cel.getElementsByTagName('span')[0].innerHTML;
    //console.log(currentMonth, actualCurrentMonth)

    if (parseInt(selectedDate) >= actualCurrentDay || parseInt(currentMonth) > parseInt(actualCurrentMonth) ||
        parseInt(currentYear) > parseInt(actualCurrentYear)) {
        $("#spin").show();
        selectedFullDate = "2019-" + (parseInt(currentMonth) + 1) + "-" + selectedDate;
        getDaySlots({
            date: selectedFullDate
        });
        values.push(cel.innerHTML);
        let x = document.getElementById("dno");
        x.innerHTML = "Available Appointments on " + selectedFullDate.split("-").reverse().join("/");
    }
}


// A $( document ).ready() block.
$(document).ready(function () {
    let d = new Date();
    let n = d.getMonth();

    myFunction();
    myFunction2();
});