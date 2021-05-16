<template>
  <div id="Content_P" style="
    position: relative;
    top: -24px;
    width: calc(100% + 48px);
    left: -24px;
">
    <a-tooltip>
      <template slot="title">
        这是一个<strong>阅后即焚</strong>的记录.<br>进度条走到尽头时会销毁<strong>服务器<br>上的</strong>加密记录,本地不受影响.
        <br>单击可暂停进度条并取消本次焚毁任务.
      </template>
      <div id="content_progress" @click="stopA"></div>

    </a-tooltip>

  </div>
</template>

<script>

export default {
  name: "FireI",
  methods: {
    stopA() {
      document.querySelector('#content_progress').style.animationPlayState = "paused"
      this.delTimer()
      setTimeout(() => {
        document.querySelector('#Content_P').style.display = "none"

      }, 5000)
      console.log('countdown end~')
    }, delTimer() {
      this.timer && clearTimeout(this.timer)
    }
  }, beforeDestroy() {
    this.delTimer()
  }, mounted() {

    this.timer = setTimeout(() => {
      this.$emit("endTimer")
    }, 40000)
  }, data() {
    return {
      timer: null
    }
  }
}
</script>

<style scoped>
#content_progress {
  /* Positioning */
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: indianred;
  animation: aw 40s forwards;
  animation-timing-function: linear;

}

#content_progress:hover {
  height: 4px;

}

@keyframes aw {
  from {
    width: 100%
  }
  to {
    width: 0
  }
}
</style>