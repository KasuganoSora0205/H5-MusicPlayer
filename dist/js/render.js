(function($, root){
    var $scope = $(document.body);
    function renderInfo(data){
        var html = "<h1 class='song-name'>" + data.song + "</h1>"+
                "<h3 class='singer-name'>" + data.singer + "</h3>"+
                "<h3 class='singer-name'>" + data.album + "</h3>";
        $scope.find('.song-info').html(html);
    }
    function renderImage(src){
        var img = new Image();
        img.onload = function(){
            $scope.find('.song-img img').attr('src',src);
            root.blurImg(img,$scope);
        }
        img.src = src;
    }
    function renderLike(isLike){
        if(isLike){
            $('.like svg path').attr('fill','#fff');
        }else{
            $('.like svg path').attr('fill','none');
        }
    }
    root.render = function(data){
        renderInfo(data)
        renderImage(data.image);
        renderLike(data.isLike)
    }
}(window.Zepto,window.player || (window.player = {})))