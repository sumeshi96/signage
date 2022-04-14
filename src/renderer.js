//swiper

var Slider = new Swiper('.swiper', {
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

    document.getElementById("today-weather").innerHTML = weatherObject['today']['weather'];
    document.getElementById("today-high-temp").innerHTML = weatherObject['today']['high_temp'];
    document.getElementById("today-low-temp").innerHTML = weatherObject['today']['low_temp'];
    document.getElementById("today-00-06").innerHTML = weatherObject['today']['every_six_00-06'];
    document.getElementById("today-06-12").innerHTML = weatherObject['today']['every_six_06-12'];
    document.getElementById("today-12-18").innerHTML = weatherObject['today']['every_six_12-18'];
    document.getElementById("today-18-24").innerHTML = weatherObject['today']['every_six_18-24'];

    document.getElementById("tomorrow-weather").innerHTML = weatherObject['tomorrow']['weather'];
    document.getElementById("tomorrow-high-temp").innerHTML = weatherObject['tomorrow']['high_temp'];
    document.getElementById("tomorrow-low-temp").innerHTML = weatherObject['tomorrow']['low_temp'];
    document.getElementById("tomorrow-00-06").innerHTML = weatherObject['tomorrow']['every_six_00-06'];
    document.getElementById("tomorrow-06-12").innerHTML = weatherObject['tomorrow']['every_six_06-12'];
    document.getElementById("tomorrow-12-18").innerHTML = weatherObject['tomorrow']['every_six_12-18'];
    document.getElementById("tomorrow-18-24").innerHTML = weatherObject['tomorrow']['every_six_18-24'];
}

forecast();

function dataUpdate() {
    clock();
    forecast();
}


//時刻表
function bus() {

}