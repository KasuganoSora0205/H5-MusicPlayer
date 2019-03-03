(function ($, root) {
    function renderInfo(data) {
        const $scope = $(document.body);
        const html = `<h1 class="song-name">${data.song}</h1>
                    <h3 class="singer-name">${data.singer}</h3>`;
        $scope.find('.song-info').html(html);
    }
    function renderImage(src) {
        const img = new Image();
        img.onload = function () {
            $scope.find('.song-img img').attr("src", src);
            root.blurImg(img, $scope);
        }
        img.src = src;
    }
    function renderLikeBtn(isLike){
        if(isLike){
            $('.like-btn .liked').addClass('show');
            $('.like-btn .noLike').removeClass('show');
        }else{
            $('.like-btn .liked').removeClass('show');
            $('.like-btn .noLike').addClass('show');
        }
    }
    root.render = function (data) {
        renderInfo(data);
        renderImage(data.image);
        renderLikeBtn(data.isLike);
    }
})(window.Zepto, window.player || (window.player = {}))