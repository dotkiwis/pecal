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

let slots = {
    "s1": "8AM  - 10AM",
    "s2": "10AM - 12PM",
    "s3": "2PM  - 4PM",
    "s4": "4PM  - 5PM"
}

function popup(current, slot) {
    let cbl = document.getElementById("titl");
    gcurrent = current;
    cbl.innerHTML = " Book Appointment on" + "<br/>" + selectedFullDate.split("-").reverse().join("/") + " (" +
        slots[slot] + ")";
    gslot = slot;
    //console.log(selectedDate, slot);
}

function apply() {

    let ipname = document.getElementById("name").value;
    let ipmob = document.getElementById("mob").value;
    let ipemail = document.getElementById("email").value;
    let ipmessage = document.getElementById("message").value;
    let ipperson = document.getElementById("person").value;
    let ipplace = document.getElementById("place").value;

    //console.log(selectedDate, gslot, ipname, ipmob, ipemail, ipmessage, ipperson, ipplace);


    addAppoint({
        date: selectedFullDate,
        slot: gslot,
        name: ipname,
        mobile: ipmob,
        email: ipemail,
        message: ipmessage,
        person: ipperson,
        place: ipplace
    });

    document.getElementById("name").value = "";
    document.getElementById("mob").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    document.getElementById("person").value = "";
    document.getElementById("place").value = "";

    gcurrent.disabled = true;

    if (gslot === 's1') {
        bookings[0] = true;
    } else if (gslot === 's2') {
        bookings[1] = true;
    } else if (gslot === 's3') {
        bookings[2] = true;
    } else if (gslot === 's4') {
        bookings[3] = true;
    }

}

function addAppoint(oswa) {
    //console.log(oswa)
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let resp = JSON.parse(this.response);

            if (resp.status) {
                $("#" + gslot).addClass("unbtn");
                $("#" + gslot).html("Unavailable");
                $("#" + gslot).attr("disabled", true);
            } else {

            }

        }
    };
    xhttp.open("POST", "http://ilfdemo.dotkiwis.com/calbackend/add_new_cal_appointment.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(oswa));
}

function getDaySlots(data) {
    console.log(data)
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = ""; //this.response;
            bookings = JSON.parse(this.response);
            console.log(bookings);

            for (i = 0; i < bookings.length; i++) {
                if (bookings[i]) {
                    $("#s" + (i + 1)).addClass("unbtn");
                    $("#s" + (i + 1)).html("Unavailable");
                    $("#s" + (i + 1)).attr("disabled", true);
                } else {
                    $("#s" + (i + 1)).removeClass("unbtn");
                    $("#s" + (i + 1)).html("BOOK APPOINTMENT");
                    $("#s" + (i + 1)).attr("disabled", false);

                }
            }
        }

    };
    xhttp.open("POST", "http://ilfdemo.dotkiwis.com/calbackend/get_available_slots.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(data));

    setTimeout(() => {
        $("#spin").hide();

        $("#appoint-list").fadeIn(1000);
    }, 2000)
}


// A $( document ).ready() block.
$(document).ready(function () {
    let d = new Date();
    let n = d.getMonth();

    myFunction();
    myFunction2();
});