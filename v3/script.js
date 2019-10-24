$(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    }).datepicker('update', new Date());
});
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const weekNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
]
let getDaysInMonth = function (month, year) {
    console.log(month, year)
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
let monthOneDays = [];
let monthTwoDays = [];
let monthThreeDays = [];

function myFunction() {
    if (actualCurrentMonth == currentMonth && actualCurrentYear == currentYear) {
        document.getElementById("page-left").onclick = null;
    } else {
        document.getElementById("page-left").onclick = prevMonth;
    }
    let monthOneTable = document.getElementById("month1");
    let monthTwoTable = document.getElementById("month2");
    let monthThreeTable = document.getElementById("month3");
    monthOneTable.innerHTML = "";
    monthTwoTable.innerHTML = "";
    monthThreeTable.innerHTML = "";
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;

    //select the current day in the first week
    let weekDay = new Date(currentYear, currentMonth, 1).getDay();
    let weekDay1 = new Date(currentYear, currentMonth + 1, 1).getDay();
    let weekDay2 = new Date(currentYear, currentMonth + 2, 1).getDay();
    for (let weekDaySelect = 0; weekDaySelect < weekDay; weekDaySelect++) monthOneDays.unshift({
        date: ""
    })
    for (let weekDaySelect = 0; weekDaySelect < weekDay1; weekDaySelect++) monthTwoDays.unshift({
        date: ""
    })
    for (let weekDaySelect = 0; weekDaySelect < weekDay2; weekDaySelect++) monthThreeDays.unshift({
        date: ""
    })


    for (i = 0; i < monthOneDays.length / 7; i++) {
        let row = monthOneTable.insertRow(i);
        for (j = 0; j < 7; j++) {
            if (monthOneDays[i + j + b1] != undefined) {
                let cell1 = row.insertCell(j);
                cell1.className = monthOneDays[i + j + b1].class;
                let x = document.createElement("span");

                x.className = monthOneDays[i + j + b1].class;
                x.innerHTML = monthOneDays[i + j + b1].date;
                cell1.append(x);
            }
        }
        b1 += 6;
    }
    for (i = 0; i < monthTwoDays.length / 7; i++) {
        let row = monthTwoTable.insertRow(i);
        for (j = 0; j < 7; j++) {
            if (monthTwoDays[i + j + b2] != undefined) {
                let cell1 = row.insertCell(j);
                cell1.className = monthTwoDays[i + j + b2].class;
                let x = document.createElement("span");
                x.className = monthTwoDays[i + j + b2].class;
                x.innerHTML = monthTwoDays[i + j + b2].date;
                cell1.append(x);
            }
        }
        b2 += 6;
    }
    for (i = 0; i < monthThreeDays.length / 7; i++) {
        let row = monthThreeTable.insertRow(i);
        for (j = 0; j < 7; j++) {
            // //console.log("i", i, "j", j, "i+j", i + j, "b1", b1)
            if (monthThreeDays[i + j + b3] != undefined) {
                let cell1 = row.insertCell(j);
                cell1.className = monthThreeDays[i + j + b3].class;
                let x = document.createElement("span");
                x.className = monthThreeDays[i + j + b3].class;
                x.innerHTML = monthThreeDays[i + j + b3].date;
                cell1.append(x);
            }
        }
        b3 += 6;
    }

    let rowm1 = monthOneTable.insertRow(0);
    let rowm2 = monthTwoTable.insertRow(0);
    let rowm3 = monthThreeTable.insertRow(0);
    for (i = 0; i < 7; i++) {
        let cell1 = rowm1.insertCell(i);
        cell1.className = "week-head";
        let x1 = document.createElement("span");
        x1.innerHTML = weekNames[i];
        cell1.append(x1);

        let cell2 = rowm2.insertCell(i);
        cell2.className = "week-head";
        let x2 = document.createElement("span");
        x2.innerHTML = weekNames[i];
        cell2.append(x2);

        let cell3 = rowm3.insertCell(i);
        cell3.className = "week-head";
        let x3 = document.createElement("span");
        x3.innerHTML = weekNames[i];
        cell3.append(x3);
    }
}

function clearCal() {
    $("#month1").innerHTML = "";
    $("#month2").innerHTML = "";
    $("#month3").innerHTML = "";
}




function generate() {
    clearCal();
    let selectedDate = $("#datepicker").val();
    let selectedDateMonth = parseInt(selectedDate.split("/")[0]);
    let pdays_ip = $("#pdays").val();
    let pdays = $("#pdays").val();
    let plength = $("#plength").val();
    let postp = 2;
    let prep = 2;
    let = 5;
    console.log(plength);
    let normalday = plength - pdays - postp - prep;
    console.log(normalday);
    console.log(selectedDate, pdays, plength, );

    let monthOne = getDaysInMonth(parseInt(selectedDateMonth), 2019);
    let monthTwo = getDaysInMonth(parseInt(selectedDateMonth) + 1, 2019);
    let monthThree = getDaysInMonth(parseInt(selectedDateMonth) + 2, 2019);
    console.log("monthOne : " + monthOne, monthTwo, monthThree);

    monthOneDays = range(1, monthOne);
    monthTwoDays = range(1, monthTwo);
    monthThreeDays = range(1, monthThree);


    console.log(selectedDateMonth)
    console.log(selectedDateMonth - 1, monthNames[selectedDateMonth - 1])
    console.log(selectedDateMonth, monthNames[selectedDateMonth])
    console.log(selectedDateMonth + 1, monthNames[selectedDateMonth + 1])


    document.getElementById("monthOneName").innerHTML = monthNames[selectedDateMonth - 1] + " " + currentYear;
    document.getElementById("monthTwoName").innerHTML = monthNames[selectedDateMonth] + " " + currentYear;
    document.getElementById("monthThreeName").innerHTML = monthNames[selectedDateMonth + 1] + " " + currentYear;
    let monthOneDaysObj = [];
    let allDays = monthOneDays.concat(monthTwoDays).concat(monthThreeDays);
    console.log(allDays);

    allDays.forEach(d => {
        if (pdays === 0 && postp === 0 && normalday === 0 && prep === 0) {
            pdays = pdays_ip;
            prep = 2;
            postp = 2;
            normalday = plength - pdays - postp - prep;
        }
        if (pdays === 0 && postp === 0 && normalday === 0 && prep > 0) {
            monthOneDaysObj.push({
                date: d,
                class: "red"
            })
            prep--;
        }
        if (pdays === 0 && postp === 0 && normalday > 0) {
            monthOneDaysObj.push({
                date: d,
                class: "normal"
            })
            normalday--;
        }
        if (pdays === 0 && postp > 0) {
            monthOneDaysObj.push({
                date: d,
                class: "violet"
            })
            postp--;
        }
        if (pdays > 0) {
            monthOneDaysObj.push({
                date: d,
                class: "pink "
            })
            pdays--;
        }
    })

    monthOneDays = monthOneDaysObj.slice(0, monthOne);
    monthTwoDays = monthOneDaysObj.slice(monthOne, monthOne + monthTwo);
    monthThreeDays = monthOneDaysObj.slice(monthOne + monthTwo, monthOne + monthTwo + monthThree);
    myFunction();
}
let m = 0;

function minc() {
    m++;
    document.getElementById('plength').value = m;
}

function mdec() {
    m--;
    document.getElementById('plength').value = m;
}
let d = 0;

function dinc() {
    d++;
    document.getElementById('pdays').value = d;
}

function ddec() {
    d--;
    document.getElementById('pdays').value = d;
}
let values = [];
let selectedDate;
let selectedFullDate;
let gslot;
let gcurrent;
let bookings = [];
// A $( document ).ready() block.
$(document).ready(function () {
    let d = new Date();
    let n = d.getMonth();
});