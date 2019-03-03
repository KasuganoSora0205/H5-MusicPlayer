const root = window.player;
const $ = window.Zepto;
const $scope = $(document.body);
let songList;
let controlManager;
const audioManager = new root.AudioManager();
const processor = root.processor;
const playList = root.playList;

$scope.on('play-change', (e, index,flag) => {
    const curDate = songList[index];
    root.render(curDate);
    audioManager.setAudioSource(curDate.audio);
    if (audioManager.status === "play" || flag) {
        audioManager.play();
        processor.start()
    }
    processor.start();
})
$scope.on('click', '.prev-btn', () => {
    let index = controlManager.prev();
    $scope.trigger('play-change', [index]);
})
$scope.on('click', '.next-btn', () => {
    let index = controlManager.next();
    $scope.trigger('play-change', [index]);
})
$scope.on('click', '.play-btn', () => {
    if (audioManager.status === 'play') {
        audioManager.pause();
        processor.stop()
    } else {
        audioManager.play();
        processor.start();
    }
})

$scope.on('click', '.list-btn', () => {
    playList.show(controlManager);
})

function bindTouch() {
    const $slidePoint = $scope.find('.slide-point');
    const offset = $scope.find('.pro-wrapper').offset();
    const left = offset.left;
    const width = offset.width;
    $slidePoint.on('touchstart', function (e) {
        processor.stop();
    }).on('touchmove', function (e) {
        let x = e.changedTouches[0].clientX;
        let percentage = (x - left) / width;
        if (percentage > 1) {
            percentage = 1;
        } else if (percentage < 0) {
            percentage = 0;
        }
        processor.upDate(percentage);
    }).on('touchend', function (e) {
        let x = e.changedTouches[0].clientX;
        let percentage = (x - left) / width;
        if (percentage > 1 || percentage < 0) {
            percentage = 0;
        }
        console.log(percentage);
        processor.start(percentage * audioManager.duration)
    })
}
bindTouch();
//获取数据 渲染界面
function getData(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success(data) {
            songList = data;
            controlManager = new root.ControlManager(data.length);
            $scope.trigger('play-change', [0]);
            playList.render(data);
        },
        error() {
            console.log('error')
        }
    })
}
getData('/mock/data.json');
