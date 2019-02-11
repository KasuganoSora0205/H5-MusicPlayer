var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
var songlist;
var controlmanager;
var audiomanager = new root.AudioManager();
var processor = root.processor;
var playList = root.playList;
function getDate(url) {
    $.ajax({
        type: 'get',
        url: url,
        success: successedFn,
        error: function () {
            console.log('error')
        }
    })
}

$scope.on('play:change', function (e, index,flag) {
    var curdata = songlist[index];
    root.render(curdata);
    audiomanager.switchAudio(curdata.audio);
    if (audiomanager.status === "play" || flag) {
        audiomanager.play();
        processor.start()
    }
    processor.render(curdata.duration);

})

$scope.on('click', '.prev', function () {
    var index = controlmanager.prev();
    $scope.trigger("play:change", [index]);
})
$scope.on('click', '.next', function () {
    var index = controlmanager.next();
    $scope.trigger("play:change", [index]);
})

$scope.on('click', '.play', function () {
    if (audiomanager.status === 'play') {
        audiomanager.pause();
        processor.stop();
    } else {
        audiomanager.play();
        processor.start();
    }
})
$scope.on('click','.list',function(){
    playList.show(controlmanager);
})
//进度条拖拽
function bindTouch() {
    var $slidePoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on('touchstart', function (e) {
        processor.stop();
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1 || percentage < 0){
            percentage = 0;
        }
        processor.updata(percentage);
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1 || percentage < 0){
            percentage = 0;
        }
        processor.start(percentage);
        var curDuration =  songlist[controlmanager.index].duration;
        var duration = curDuration * percentage;
        audiomanager.jumptoPlay(duration);
    })
}
function successedFn(data) {
    bindTouch();
    songlist = data;
    controlmanager = new root.controlManager(data.length);
    $scope.trigger('play:change', 0);
    playList.render(data);
}
getDate("/mock/data.json")