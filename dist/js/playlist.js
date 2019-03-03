(function ($, root) {
    const $scope = $(document.body);
    let controlManager
    $playList = $(`<div class='play-list'>
    <div class='line-head'>播放列表</div>
    <ul class='play-list-wrap'></ul>
    <div class='close-btn'>关闭</div>
    </div>`);
    function render(data) {
        let html = '';
        for (let i = 0, len = data.length; i < len; i++) {
            html += `<li><h3>${data[i].song}-<span>${data[i].singer}</span></h3></li>`
        }
        $playList.find('ul').html(html);
        $scope.append($playList);
        bindEvent();
    }
    function bindEvent() {
        $playList.on('click', '.close-btn', function () {
            $playList.removeClass('show');
        })
        $playList.on('click', 'li', function () {
            var index = $(this).index();
            signSong(index);
            $scope.trigger('play-change', [index, true]);
            setTimeout(function () {
                $playList.removeClass('show');
            }, 1000)
        })
    }
    function show(control) {
        controlManager = control;
        var index = controlManager.index;
        $playList.addClass('show');
        signSong(index);
    }
    function signSong(index) {
        $playList.find('.playing').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }
    root.playList = {
        render: render,
        show: show
    }
})(window.Zepto, window.player || (window.player = {}))