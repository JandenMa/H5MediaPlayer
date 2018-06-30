window.onload = function () {
    var oNavas = document.querySelectorAll('nav a'); //IE6-8不兼容
    if (oNavas) {
        for (var i = 0; i < oNavas.length; i++) {
            addEvent(oNavas[i], 'click', function () {
                var children = this.parentNode.children;
                for (var j = 0; j < children.length; j++) {
                    var child = children[j];
                    child.classList.remove('active');
                }
                this.classList.add("active");
                var area = this.dataset.area;
                var oShowArea = document.querySelector('.showArea');
                var children = oShowArea.children;
                for (var j = 0; j < children.length; j++) {
                    var child = children[j];
                    child.style.display = "none";
                }
                document.querySelector('#' + area).style.display = "block";
            })
        }
    }

    var oAudioEl = this.document.querySelector('#audioEl');
    var oVideoEl = this.document.querySelector('#videoEl');
    var oAudioLoopBtn = this.document.querySelector('#AudioLoopBtn');
    var oAudioStopBtn = this.document.querySelector('#AudioStopBtn');
    var oAudioMutedBtn = this.document.querySelector('#AudioMutedBtn');
    var oAudioVolume = this.document.querySelector('#AudioVolume');
    var oAudioProgress = this.document.querySelector('#AudioProgress');
    var oAudioToggleBtn = this.document.querySelector('#AudioToggleBtn');
    var oVideoToggleBtn = this.document.querySelector('#VideoToggleBtn');
    var oVideoMutedBtn = this.document.querySelector('#VideoMutedBtn');
    var oVideoLoopBtn = this.document.querySelector('#VideoLoopBtn');
    var oVideoVolume = this.document.querySelector('#VideoVolume');
    var oVideoStopBtn = this.document.querySelector('#VideoStopBtn');
    var oVideoProgress = this.document.querySelector('#VideoProgress');
    var oVideoProgressVal = this.document.querySelector('#VideoProgressVal');
    var oVideoVolumeVal = this.document.querySelector('#VideoVolumeVal');
    var oAudioProgressVal = this.document.querySelector('#AudioProgressVal');
    var oAudioVolumeVal = this.document.querySelector('#AudioVolumeVal');
    var oSelectVideoFile = this.document.querySelector('#selectVideoFile');
    var oSelectAudioFile = this.document.querySelector('#selectAudioFile');
    mediaToggleLoop(oAudioEl, oAudioLoopBtn);
    mediaTogglePause(oAudioEl, oAudioToggleBtn);
    mediaStopPlay(oAudioEl, oAudioStopBtn, oAudioProgress, oAudioProgressVal);
    mediaToggleMuted(oAudioEl, oAudioMutedBtn);
    mediaChangeVolume(oAudioEl, oAudioVolume, oAudioVolumeVal);
    mediaChangeProgress(oAudioEl, oAudioProgress, oAudioProgressVal);
    mediaToggleLoop(oVideoEl, oVideoLoopBtn);
    mediaTogglePause(oVideoEl, oVideoToggleBtn);
    mediaToggleMuted(oVideoEl, oVideoMutedBtn);
    mediaChangeVolume(oVideoEl, oVideoVolume, oVideoVolumeVal);
    mediaStopPlay(oVideoEl, oVideoStopBtn, oVideoProgress, oVideoProgressVal);
    mediaChangeProgress(oVideoEl, oVideoProgress, oVideoProgressVal);
    mediaFileOpenAndPlay(oVideoEl, oSelectVideoFile, oVideoStopBtn, oVideoToggleBtn, oVideoProgress, oVideoProgressVal);
    mediaFileOpenAndPlay(oAudioEl, oSelectAudioFile, oAudioStopBtn, oAudioToggleBtn, oAudioProgress, oAudioProgressVal);
}