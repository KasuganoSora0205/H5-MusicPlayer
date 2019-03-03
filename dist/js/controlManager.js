(function ($, root) {
    function ControlManager(length) {
        this.index = 0;
        this.length = length;
    }
    ControlManager.prototype = {
        next() {
            return this.getIndex(1);
        },
        prev() {
            return this.getIndex(-1);
        },
        getIndex(val){
            let index = this.index;
            let len = this.length;
            let curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.ControlManager = ControlManager;
})(window.Zepto, window.player || (window.player = {}))