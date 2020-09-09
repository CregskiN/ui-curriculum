var Calendar = (function () {
    function Calendar(calendarElement) {
        this.calendarElement = calendarElement;

    }

    Calendar.prototype.init = function () {
        var that = this;
        for (var i = 0; i < 1000; i++) {
            (function (j) {
                setTimeout(function () {
                    that.calendarElement.innerHTML = that.generateCurrentTime();
                }, 1000 * i);
            })(i)
        }
    }

    Calendar.prototype.generateCurrentTime = function () {
        var date = new Date(Date.now());
        var day = date.toLocaleDateString(); // 2020/4/18
        var time = date.toLocaleTimeString(); // 下午9:02:12
        var timeStr = day + ' ' + time;
        return timeStr;
    }

    return Calendar;
})()

