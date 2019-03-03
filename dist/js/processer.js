(function ($, root) {
    $scope = $(document.body);
    let curDuration;
    let frameID;
    function transTime(time) {
        time = Math.round(time);
        let minute = Math.floor(time / 60);
        let second = time - minute * 60;
        if (minute < 10) {
            minute = '0' + minute;
        }
        if (second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    function render(duration) {
        curDuration = duration;
        const allTime = transTime(duration);
        $scope.find('.all-time').text(allTime);
    }
    function setProcessor(percentage) {
        percentage = (percentage - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            "transform": `translateX(${percentage})`
        })
    }
    function upDate(percentage, curTime = percentage * audioManager.duration) {
        curTime = transTime(curTime);
        $scope.find('.cur-time').text(curTime);
        setProcessor(percentage)
    }
    function start(curTime = 0) {
        if (curTime !== 0) {
            audioManager.audio.currentTime = curTime;
        }
        cancelAnimationFrame(frameID);
        const audio = audioManager.audio;
        function frame() {
            let curTime = audio.currentTime;
            let percentage = curTime / curDuration;
            $scope.find('.img-wrapper img').css({
                'transform' : `rotate(${percentage * 5000}deg)`
            })
            if (percentage < 1) {
                upDate(percentage, curTime)
                frameID = requestAnimationFrame(frame);
            } else {
                cancelAnimationFrame(frameID);
            }
        }
        frame();
    }
    function stop() {
        cancelAnimationFrame(frameID);
    }
    root.processer = {
        render,
        start,
        stop,
        upDate
    }
})(window.Zepto, window.player || (window.player = {}))