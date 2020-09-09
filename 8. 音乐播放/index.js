// class Music
var Music = (function () {
  function Music(
    audioElement,
    preElement,
    nextElement,
    stopOrContinueElement,
    rangeElement,
    nameElement,
    cycleElement
  ) {
    this.musics = [
      {
        name: "林俊杰 - 伟大的渺小",
        src: "http://cregskin.gitee.io/cregskin-static/ljj-1.mp3",
      },
      {
        name: "林俊杰 - 圣所",
        src: "http://cregskin.gitee.io/cregskin-static/ljj-2.mp3",
      },
      {
        name: "林俊杰 - 剪云者",
        src: "http://cregskin.gitee.io/cregskin-static/ljj-3.mp3",
      },
    ];
    this.audioElement = audioElement;
    this.preElement = preElement;
    this.nextElement = nextElement;
    this.stopOrContinueElement = stopOrContinueElement;
    this.rangeElement = rangeElement;
    this.nameElement = nameElement;
    this.cycleElement = cycleElement;

    this.currentIndex = 0; // 当前音乐index
    this.canPrevious = false; // 是否可以上一曲
    this.canNext = true; // 是否可以下一曲
    this.isPlaying = false;
    this.isCycle = false; // 是否开启循环

    this.timer = null;
    this.time = 0;
  }

  Music.prototype.init = function () {
    this.audioElement.src =
      "http://cregskin.gitee.io/cregskin-static/ljj-1.mp3";
    var that = this;
    this.rangeElement.max = Math.round(this.audioElement.duration);
    this.nameElement.innerHTML =
      "正在播放: " +
      this.musics[this.currentIndex].name +
      "(" +
      (this.currentIndex + 1) +
      "/" +
      this.musics.length +
      ")";
    this.rangeElement.addEventListener("change", function () {
      that.setCurrentTime(that.rangeElement.value);
    });
    this.preElement.addEventListener("click", function () {
      that.previous();
    });
    this.nextElement.addEventListener("click", function () {
      that.next();
    });
    this.cycleElement.addEventListener("click", function () {
      that.cycle(!that.isCycle);
    });
    this.stopOrContinueElement.addEventListener("click", function () {
      if (that.isPlaying) {
        that.pause();
      } else {
        that.play(that.currentIndex);
      }
    });
  };

  Music.prototype.next = function () {
    if (this.canNext) {
      this.pause();
      this.rangeElement.value = 0;
      this.currentIndex += 1;
      this.play(this.currentIndex);
      // 边界条件：是否最后一首曲子
      if (this.currentIndex === this.musics.length - 1) {
        this.canNext = false;
        this.canPrevious = true;
        var oNClasses = this.nextElement.getAttribute("class");
        this.nextElement.setAttribute(
          "class",
          oNClasses.replace(/ is-active/g, "")
        );
        this.preElement.setAttribute(
          "class",
          this.preElement.getAttribute("class") + " is-active"
        );
      } else {
        this.canNext = true;
        this.canPrevious = true;
      }
    } else {
      // 判断循环
      if (this.isCycle) {
        this.pause();
        this.rangeElement.value = 0;
        this.currentIndex = 0;
        this.play(this.currentIndex);
      }
    }
  };

  Music.prototype.previous = function () {
    if (this.canPrevious) {
      this.pause();
      this.rangeElement.value = 0;
      this.currentIndex -= 1;
      this.play(this.currentIndex);
      // 边界条件：是否是第一首曲子
      if (this.currentIndex === 0) {
        this.canPrevious = false;
        this.canNext = true;

        var oNClasses = this.preElement.getAttribute("class");
        this.nextElement.setAttribute(
          "class",
          this.nextElement.getAttribute("class") + " is-active"
        );
        this.preElement.setAttribute(
          "class",
          oNClasses.replace(/ is-active/g, "")
        );
      } else {
        this.canPrevious = true;
        this.canNext = true;
      }
    }
  };

  Music.prototype.pause = function () {
    this.audioElement.pause();
    this.isPlaying = false;
    clearInterval(this.timer);
  };

  Music.prototype.play = function (index) {
    var that = this;
    console.log(index);
    this.nameElement.innerHTML =
      "正在播放: " +
      this.musics[index].name +
      "(" +
      (index + 1) +
      "/" +
      this.musics.length +
      ")";
    this.rangeElement.max = Math.round(this.audioElement.duration);
    this.audioElement.src = this.musics[index].src;
    this.audioElement.play();
    this.isPlaying = true;

    this.timer = setInterval(function () {
      var currentTime = that.audioElement.currentTime;
      that.rangeElement.value = Math.round(currentTime);
      if (currentTime === that.audioElement.duration) {
        clearInterval(that.timer);
        that.next();
      }
    }, 1000);
  };

  Music.prototype.setCurrentTime = function (time) {
    this.rangeElement.max = Math.round(this.audioElement.duration);
    this.rangeElement.value = Math.round(time);
    this.audioElement.currentTime = Math.round(time);
  };

  Music.prototype.cycle = function (willOpen) {
    if (willOpen) {
      this.cycleElement.setAttribute(
        "class",
        this.cycleElement.getAttribute("class") + " is-active"
      );
      this.isCycle = willOpen;
    } else {
      var oCClasses = this.cycleElement.getAttribute("class");
      this.cycleElement.setAttribute(
        "class",
        oCClasses.replace(/ is-active/g, "")
      );
      this.isCycle = willOpen;
    }
  };

  return Music;
})();

function getElementById(id) {
  return document.getElementById(id);
}

window.onload = function () {
  var audioElement = getElementById("player");
  var preElement = getElementById("previous");
  var nextElement = getElementById("next");
  var stopOrContinueElement = getElementById("stopOrContinue");
  var rangeElement = getElementById("player-bar");
  var nameElement = getElementById("music-name");
  var cycleElement = getElementById("cycle");

  var music = new Music(
    audioElement,
    preElement,
    nextElement,
    stopOrContinueElement,
    rangeElement,
    nameElement,
    cycleElement
  );
  music.init();
};
