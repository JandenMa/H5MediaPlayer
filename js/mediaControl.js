/**
 * @description 媒体控件停止播放
 * @param {Element} mediaEl 要操作的媒体控件
 * @param {Element} stopBtn 触发停止按钮
 * @param {Element} progressEl 触发进度条调整滑块元素
 * @param {Element} progressShowEl 进度时长显示元素
 */
function mediaStopPlay(mediaEl, stopBtn, progressEl, progressShowEl) {
    if (mediaEl.src || mediaEl.currentSrc) {
        var duration = mediaEl.duration;
        addEvent(stopBtn, 'click', function () {
            mediaEl.pause();
            mediaEl.currentTime = 0;
            progressEl.value = 0;
            progressShowEl.innerHTML = secondToMinuteSecond(mediaEl.currentTime) + '/' + secondToMinuteSecond(duration);
        })
    } else {
        stopBtn.setAttribute('disabled', 'disabled');
    }
}

/**
 * @description 媒体控件调整进度条
 * @param {Element} mediaEl 要操作的媒体控件
 * @param {Element} progressEl 触发进度条调整滑块元素
 * @param {Element} progressShowEl 播放进度时间显示元素
 */
function mediaChangeProgress(mediaEl, progressEl, progressShowEl) {
    if (mediaEl.src || mediaEl.currentSrc) {
        var duration = mediaEl.duration;
        if (!isNaN(duration)) {
            progressShowEl.innerHTML = secondToMinuteSecond(progressEl.value) + '/' + secondToMinuteSecond(duration);
        }
        mediaEl.ontimeupdate = function () {
            progressEl.value = mediaEl.currentTime / duration * 100;
            progressShowEl.innerHTML = secondToMinuteSecond(mediaEl.currentTime) + '/' + secondToMinuteSecond(duration);
        }
        addEvent(progressEl, 'input', function () {
            var progress = this.value / 100 * duration;
            progressShowEl.innerHTML = secondToMinuteSecond(progress) + '/' + secondToMinuteSecond(duration);
            mediaEl.currentTime = progress;
        })
    } else {
        progressShowEl.innerHTML = '--:--/--:--';
        progressEl.setAttribute('disabled', 'disabled');
    }
}

/**
 * @description 媒体控件切换暂停
 * @param {Element} mediaEl 要操作的媒体控件
 * @param {Element} toggleBtn 触发按钮
 */
function mediaTogglePause(mediaEl, toggleBtn) {
    if (mediaEl.src || mediaEl.currentSrc) {
        addEvent(toggleBtn, 'click', function () {
            if (mediaEl.paused) {
                mediaEl.play();
            } else {
                mediaEl.pause();
            }
        })
    } else {
        toggleBtn.setAttribute('disabled', 'disabled');
    }
}

/**
 * @description 媒体控件调整音量
 * @param {Element} mediaEl 要操作的媒体控件
 * @param {Element} volumeEl 触发音量调整滑块元素
 * @param {Element} volumeValShowEl 音量大小显示元素
 */
function mediaChangeVolume(mediaEl, volumeEl, volumeValShowEl) {
    volumeValShowEl.innerHTML = volumeEl.value;
    mediaEl.volume = volumeEl.value / 100;
    addEvent(volumeEl, 'input', function () {
        volumeValShowEl.innerHTML = this.value;
        mediaEl.volume = this.value / 100;
    })
}

/**
 * @description 媒体控件切换静音
 * @param {Element} mediaEl 要操作的媒体控件
 * @param {Element} mutedBtn 触发按钮
 */
function mediaToggleMuted(mediaEl, mutedBtn) {
    addEvent(mutedBtn, 'click', function () {
        mediaEl.muted = !mediaEl.muted;
        this.innerHTML = mediaEl.muted ? "静音：是" : "静音：否";
    })
}

/**
 * @description 媒体控件切换单循环
 * @param {Element} mediaEl 要操作的媒体控件
 * @param {Element} loopBtn 触发按钮
 */
function mediaToggleLoop(mediaEl, loopBtn) {
    addEvent(loopBtn, 'click', function () {
        var isLoop = mediaEl.loop;
        if (isLoop) {
            loopBtn.innerHTML = "单曲循环：关";
            mediaEl.removeAttribute('loop');
        } else {
            loopBtn.innerHTML = "单曲循环：开";
            mediaEl.setAttribute('loop', 'loop');
        }
    })
}

/**
 * @description 媒体资源重置时初始化播放器
 * @param {Element} mediaEl 要操作的媒体控件
 * @param {Element} stopBtn 停止播放按钮
 * @param {Element} toggleBtn 开始/暂停按钮
 * @param {Element} progressEl 进度条控件元素
 * @param {Element} progressShowEl 进度时间显示元素
 */
function mediaInit(mediaEl, stopBtn, toggleBtn, progressEl, progressShowEl) {
    mediaChangeProgress(mediaEl, progressEl, progressShowEl);
    mediaStopPlay(mediaEl, stopBtn, progressEl, progressShowEl);
    mediaTogglePause(mediaEl, toggleBtn);
    mediaEl.onloadedmetadata = function () {
        duration = mediaEl.duration;
        progressEl.value = 0;
        progressShowEl.innerHTML = secondToMinuteSecond(progressEl.value) + '/' + secondToMinuteSecond(duration);
    }
    stopBtn.removeAttribute('disabled');
    toggleBtn.removeAttribute('disabled');
    progressEl.removeAttribute('disabled');
}

/**
 * @description 打开本地媒体文件
 * @param {Element} mediaEl 要操作的媒体控件
 * @param {Element} openFileEl 选择媒体文件按钮
 * @param {Element} stopBtn 停止播放按钮
 * @param {Element} toggleBtn 开始/暂停按钮
 * @param {Element} progressEl 进度条控件元素
 * @param {Element} progressShowEl 进度时间显示元素
 */
function mediaFileOpenAndPlay(mediaEl, openFileEl, stopBtn, toggleBtn, progressEl, progressShowEl) {
    if (openFileEl) {
        var type = openFileEl.dataset.type;
        openFileEl.onchange = function () {
            var file = this.files[0];
            if (file) {
                var url = URL.createObjectURL(file);
                mediaEl.src = url;
                mediaEl.type = type;
                mediaEl.onerror = function () {
                    alert("暂不支持播放该类型文件");
                    progressShowEl.innerHTML = '--:--/--:--';
                    stopBtn.setAttribute('disabled', 'disabled');
                    toggleBtn.setAttribute('disabled', 'disabled');
                    progressEl.setAttribute('disabled', 'disabled');
                    mediaEl.removeAttribute('src');
                    mediaEl.removeAttribute('type');
                    return;
                }
                mediaEl.oncanplay = function () {
                    mediaInit(mediaEl, stopBtn, toggleBtn, progressEl, progressShowEl);
                }
            }
        }
    }
}

/**
 * @description 秒转为分秒
 * @param {Number} second 秒数
 */
function secondToMinuteSecond(second) {
    if (second != 0) {
        var sec = parseInt(second % 60);
        if (sec < 10)
            sec = '0' + sec;
        return parseInt(second / 60) + ':' + sec;
    } else {
        return "0:00";
    }
}