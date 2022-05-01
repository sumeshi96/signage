//初期化
function dataReload() {
    clock();
    forecast();
}
dataReload();

//リロードボタン
var reloadBtn = document.querySelectorAll("#data-update,i.fa-rotate")
reloadBtn.forEach(function (btn) {
    btn.addEventListener('click', function () {
        dataReload();
    });
});

//swiper
var Slider = new Swiper('.swiper', {
    pagination: {
        el: ".swiper-pagination"
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

//日付・時計
function clock() {
    moment.locale("ja");
    var fullDate = moment().format('YYYY年 MM月 DD日 (ddd)');
    var today = moment().format('MM月DD日(ddd)');
    var tomorrow = moment().add(1, 'd').format('MM月DD日(ddd)');
    var time = moment().format('HH:mm:ss');

    //日付と時間を表示
    document.getElementById("today").innerHTML = today;
    document.getElementById("tomorrow").innerHTML = tomorrow;
    document.getElementById("time_id").innerHTML = time;
    //document.getElementById("time_id2").innerHTML = time;
    document.getElementById("date_id").innerHTML = fullDate;
    //document.getElementById("date_id2").innerHTML = fullDate;

    return time;
}
setInterval(clock, 1000);

//天気
function forecast() {

    var update;
    const message = window.myapi.send({ "send_data": update });
    let app_setting_text = window.myapi.getSetting();
    let weatherObject = JSON.parse(app_setting_text);

    var todayTelop = weatherObject['today']['weather'];
    var todayHighTemp = weatherObject['today']['high_temp'];
    var todayLowTemp = weatherObject['today']['low_temp'];
    var tomorrowTelop = weatherObject['tomorrow']['weather'];
    var tomorrowHighTemp = weatherObject['tomorrow']['high_temp'];
    var tomorrowLowTemp = weatherObject['tomorrow']['low_temp'];

    //当日の天気を表示
    document.getElementById("today-weather").innerHTML = todayTelop;
    document.getElementById("today-high-temp").innerHTML = addSpace(todayHighTemp);
    document.getElementById("today-low-temp").innerHTML = addSpace(todayLowTemp);
    document.getElementById("today-00-06").innerHTML = weatherObject['today']['every_six_00-06'];
    document.getElementById("today-06-12").innerHTML = weatherObject['today']['every_six_06-12'];
    document.getElementById("today-12-18").innerHTML = weatherObject['today']['every_six_12-18'];
    document.getElementById("today-18-24").innerHTML = weatherObject['today']['every_six_18-24'];

    //翌日の天気を表示
    document.getElementById("tomorrow-weather").innerHTML = tomorrowTelop;
    document.getElementById("tomorrow-high-temp").innerHTML = addSpace(tomorrowHighTemp);
    document.getElementById("tomorrow-low-temp").innerHTML = addSpace(tomorrowLowTemp);
    document.getElementById("tomorrow-00-06").innerHTML = weatherObject['tomorrow']['every_six_00-06'];
    document.getElementById("tomorrow-06-12").innerHTML = weatherObject['tomorrow']['every_six_06-12'];
    document.getElementById("tomorrow-12-18").innerHTML = weatherObject['tomorrow']['every_six_12-18'];
    document.getElementById("tomorrow-18-24").innerHTML = weatherObject['tomorrow']['every_six_18-24'];

    //天気ロゴを表示
    weatherTelop(todayTelop);
    weatherTelop(tomorrowTelop);

    function addSpace(Temp) {
        if (Temp.length == 2) {
            return Temp = "&nbsp;&nbsp;" + Temp;
        } else {
            return Temp
        }
    }

    function weatherTelop(telop) {
        if (telop === todayTelop) {
            logo = document.getElementById('today-weather-logo');
        } else if (telop === tomorrowTelop) {
            logo = document.getElementById('tomorrow-weather-logo');
        }

        //晴="\u6674",曇="\u66c7",雨="\u96e8",雪="\u96ea"
        if (telop.match(/^\u6674/)) {
            //文頭が晴のとき
            if (telop.match(/\u6674.*\u66c7/)) {
                //晴→曇
                logo.src = "img/sun-cloud.svg";
            } else if (telop.match(/\u6674.*\u96e8/)) {
                //晴→雨
                //logo.src = "img/sun-rain.svg";
            } else if (telop.match(/\u6674.*\u96ea/)) {
                //晴→雪
                //logo.src = "img/sun-snow.svg";
            } else {
                //晴
                //logo.src = "img/sun.svg";
            }
        } else if (telop.match(/^\u66c7/)) {
            //文頭が曇のとき
            if (telop.match(/\u66c7.*\u6674/)) {
                //曇→晴
                //logo.src = "img/cloud-sun.svg";
            } else if (telop.match(/\u66c7.*\u96e8/)) {
                //曇→雨
                //logo.src = "img/cloud-rain.svg";
            } else if (telop.match(/\u66c7.*\u96ea/)) {
                //曇→雪
                //logo.src = "img/cloud-snow.svg";
            } else {
                //曇
                //logo.src = "img/cloud.svg";
            }
        } else if (telop.match(/^\u96e8/)) {
            //文頭が雨のとき
            if (telop.match(/\u96e8.*\u6674/)) {
                //雨→晴
                //logo.src = "img/rain-sun.svg";
            } else if (telop.match(/\u96e8.*\u66c7/)) {
                //雨→曇
                //logo.src = "img/rain-cloud.svg";
            } else if (telop.match(/\u96e8.*\u96ea/)) {
                //雨→雪
                //logo.src = "img/rain-snow.svg";
            } else {
                //雨
                //logo.src = "img/rain.svg";
            }
        } else if (telop.match(/^\u96ea/)) {
            //文頭が雪のとき
            if (telop.match(/\u96ea.*\u6674/)) {
                //雪→晴
                //logo.src = "img/snow-sun.svg";
            } else if (telop.match(/\u96ea.*\u66c7/)) {
                //雪→曇
                //logo.src = "img/snow-cloud.svg";
            } else if (telop.match(/\u96ea.*\u96e8/)) {
                //雪→雨
                //logo.src = "img/snow-rain.svg";
            } else {
                //雪
                //logo.src = "img/snow.svg";
            }
        }
    }
}



//バス時刻表
/*
function timetable() {
    let timetable_text = window.myapi.getBus();
    let timetableObject = JSON.parse(timetable_text);
}
*/