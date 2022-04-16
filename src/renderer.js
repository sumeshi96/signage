//初期化
function dataReload() {
    clock();
    forecast();
}
dataReload();

var btn = document.querySelector("#data-update");
console.log(btn);
btn.addEventListener('click', dataReload);

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

//日付取得
function clock() {
    moment.locale("ja");
    var fullDate = moment().format('YYYY年 MM月 DD日 (ddd)');
    var today = moment().format('MM月 DD日 (ddd)');
    var tomorrow = moment().add(1, 'd').format('MM月 DD日 (ddd)');
    var time = moment().format('HH:mm:ss');
    document.getElementById("date_id").innerHTML = fullDate;
    document.getElementById("today").innerHTML = today;
    document.getElementById("tomorrow").innerHTML = tomorrow;
    document.getElementById("time_id").innerHTML = time;
    return time;
}
setInterval(clock, 1000);



function forecast() {

    var update = 1;
    const message = window.myapi.send({ "send_data": update });
    let app_setting_text = window.myapi.getSetting();
    let weatherObject = JSON.parse(app_setting_text);

    var todayTelop = weatherObject['today']['weather'];
    document.getElementById("today-weather").innerHTML = todayTelop;
    document.getElementById("today-high-temp").innerHTML = weatherObject['today']['high_temp'];
    document.getElementById("today-low-temp").innerHTML = weatherObject['today']['low_temp'];
    document.getElementById("today-00-06").innerHTML = weatherObject['today']['every_six_00-06'];
    document.getElementById("today-06-12").innerHTML = weatherObject['today']['every_six_06-12'];
    document.getElementById("today-12-18").innerHTML = weatherObject['today']['every_six_12-18'];
    document.getElementById("today-18-24").innerHTML = weatherObject['today']['every_six_18-24'];

    var tomorrowTelop = weatherObject['tomorrow']['weather'];
    document.getElementById("tomorrow-weather").innerHTML = tomorrowTelop;
    document.getElementById("tomorrow-high-temp").innerHTML = weatherObject['tomorrow']['high_temp'];
    document.getElementById("tomorrow-low-temp").innerHTML = weatherObject['tomorrow']['low_temp'];
    document.getElementById("tomorrow-00-06").innerHTML = weatherObject['tomorrow']['every_six_00-06'];
    document.getElementById("tomorrow-06-12").innerHTML = weatherObject['tomorrow']['every_six_06-12'];
    document.getElementById("tomorrow-12-18").innerHTML = weatherObject['tomorrow']['every_six_12-18'];
    document.getElementById("tomorrow-18-24").innerHTML = weatherObject['tomorrow']['every_six_18-24'];


    weatherTelop(todayTelop);
    weatherTelop(tomorrowTelop);

    /*
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
                logo.src = "img/.svg";
            } else if (telop.match(/\u6674.*\u96e8/)) {
                //晴→雨
                logo.src = "img/.svg";
            } else if (telop.match(/\u6674.*\u96ea/)) {
                //晴→雪
                logo.src = "img/.svg";
            } else {
                //晴
                logo.src = "img/.svg";
            }
        } else if (telop.match(/^\u66c7/)) {
            //文頭が曇のとき
            if (telop.match(/\u66c7.*\u6674/)) {
                //曇→晴
                logo.src = "img/.svg";
            } else if (telop.match(/\u66c7.*\u96e8/)) {
                //曇→雨
                logo.src = "img/.svg";
            } else if (telop.match(/\u66c7.*\u96ea/)) {
                //曇→雪
                logo.src = "img/.svg";
            } else {
                //曇
                logo.src = "img/.svg";
            }
        } else if (telop.match(/^\u96e8/)) {
            //文頭が雨のとき
            if (telop.match(/\u96e8.*\u6674/)) {
                //雨→晴
                logo.src = "img/.svg";
            } else if (telop.match(/\u96e8.*\u66c7/)) {
                //雨→曇
                logo.src = "img/.svg";
            } else if (telop.match(/\u96e8.*\u96ea/)) {
                //雨→雪
                logo.src = "img/.svg";
            } else {
                //雨
                logo.src = "img/.svg";
            }
        } else if (telop.match(/^\u96ea/)) {
            //文頭が雪のとき
            if (telop.match(/\u96ea.*\u6674/)) {
                //雪→晴
                logo.src = "img/.svg";
            } else if (telop.match(/\u96ea.*\u66c7/)) {
                //雪→曇
                logo.src = "img/.svg";
            } else if (telop.match(/\u96ea.*\u96e8/)) {
                //雪→雨
                logo.src = "img/.svg";
            } else {
                //雪
                logo.src = "img/.svg";
            }
        }
    }
    */
}