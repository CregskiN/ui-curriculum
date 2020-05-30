function getElementById(id) {
    return document.getElementById(id);
}

window.onload = function () {
    var calendarElement = this.getElementById('calendar')
    var clockElement = this.getElementById('clock');
    var calendar = new Calendar(calendarElement);
    calendar.init();


}