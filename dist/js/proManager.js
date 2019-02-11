(function($, root){
    var $scope = $(document.body);
    var startTime;
    var curDuration;
    var frameID;
    var lastPercentage = 0;
    function renderTime (duration){
        lastPercentage = 0;
        curDuration = duration;
        var allTime = transTime(duration);
        $scope.find('.all-time').text(allTime);
    }
    function setProcessor(percenetage){
        var percent = (percenetage - 1) * 100 + '%';
        console.log(percent)
        $scope.find('.pro-top').css({
            "transform" : "translateX(" + percent + ")"
        })
    }
    function updata(percenetage){
        var curTime = transTime(percenetage * curDuration);
        $scope.find('.cur-time').text(curTime);
        setProcessor(percenetage);
    }
    function start (percenetage){
        if(percenetage === undefined){
            lastPercentage = lastPercentage;
        }else{
            lastPercentage = percenetage;
        }
        cancelAnimationFrame(frameID)
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percenetage = lastPercentage + (curTime - startTime) / (curDuration * 1000);
            if(percenetage < 1){
                frameID = requestAnimationFrame(frame);
                updata(percenetage);
            }else{
                cancelAnimationFrame(frameID);
            }
        }
        frame();
    }
    function stop(){
        var curTime = new Date().getTime();
        lastPercentage = lastPercentage + (curTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameID);
    }
    function transTime(time){
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    root.processor = {
        render : renderTime,
        start : start,
        stop : stop,
        updata : updata
    }
})(window.Zepto, window.player || (windwo.player = {}))