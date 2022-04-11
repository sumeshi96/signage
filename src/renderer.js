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

//時刻表
function bus() {

}