(function ($, root) {
    const processor = root.processor;
    function AudioManager() {
        this.audio = new Audio();
        this.status = 'pause';
        this.duration = '';
    }
    AudioManager.prototype = {
        play() {
            this.audio.play();
            this.status = 'play';
            $('.play').removeClass('show');
            $('.pause').addClass('show');
        },
        pause() {
            this.audio.pause();
            this.status = 'pause';
            $('.play').addClass('show');
            $('.pause').removeClass('show');
        },
        setAudioSource(src) {
            this.audio.src = src;
            this.audio.load();
            this.audio.oncanplay = () => {
                this.duration = this.audio.duration;
                if(this.status === 'play'){
                    this.play();
                }
                processor.render(this.duration);
            }
        },
        jump2Play(duration) {
            this.audio.currentTime = duration;
            this.play();
        }
    }
    root.AudioManager = AudioManager;
})(window.Zepto, window.player || (window.player = {}))