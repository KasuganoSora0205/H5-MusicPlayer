(function($, root){
    function AudioManager(){
        this.audio = new Audio();
        this.status = "pause";
    }
    AudioManager.prototype = {
        play : function(){
            this.audio.play();
            this.status = "play";
        },
        pause : function(){
            this.audio.pause();
            this.status = "pause";
        },
        switchAudio : function(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumptoPlay : function(duration){
            this.audio.currentTime = duration;
            this.play();
        }
    }
    root.AudioManager = AudioManager;
}(window.Zepto,window.player || (window.player = {})))