<template>
  <div id="app">
    <a-layout style="background: unset">
      <a-layout-header id="header"
                       style="display: flex;z-index: 10;flex-direction: row;position: fixed;width: 100%;background: rgba(255,255,255,0.7);box-shadow: 0 4px 10px #f0f1f2;align-items: center;backdrop-filter: blur(10px)">
        <!--        <img src="https://saltedfish.fun/favicon.ico" style="object-fit: scale-down;margin-top: 2px;width: 64px;">-->
        <div style="padding: 10px" @click="$router.push('/')">
          <span id="headIcon">
            <svg class="anticon" p-id="2154" t="1610444744843" version="1.1" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg"><path
                d="M512.853333 785.066667a17.066667 17.066667 0 0 1-17.066666-17.066667V529.066667H443.733333v238.933333a17.066667 17.066667 0 1 1-34.133333 0V529.066667h-51.2v153.6a17.066667 17.066667 0 1 1-34.133333 0v-153.6h-51.2v153.6a17.066667 17.066667 0 0 1-17.066667 17.066666c-51.694933 0-96.529067-18.619733-133.239467-55.3472C86.596267 608.221867 68.266667 563.677867 68.266667 512c0-51.6096 18.295467-96.4096 54.391466-133.137067C159.5904 342.562133 204.3904 324.266667 256 324.266667a17.066667 17.066667 0 0 1 17.066667 17.066666v153.6h51.2v-153.6a17.066667 17.066667 0 0 1 34.133333 0v153.6h51.2V256a17.066667 17.066667 0 0 1 34.133333 0v238.933333h52.053334V256a17.066667 17.066667 0 0 1 34.133333 0v238.933333H580.266667v-153.6a17.066667 17.066667 0 1 1 34.133333 0v153.6h51.2v-153.6a17.066667 17.066667 0 1 1 34.133333 0v153.6h51.2v-68.266666a17.066667 17.066667 0 1 1 34.133334 0v68.266666h61.201066l80.3328-80.3328a17.0496 17.0496 0 1 1 24.132267 24.132267L877.4656 512l73.2672 73.2672a17.0496 17.0496 0 1 1-24.132267 24.132267L846.267733 529.066667H785.066667v68.266666a17.066667 17.066667 0 1 1-34.133334 0v-68.266666h-51.2v153.6a17.066667 17.066667 0 1 1-34.133333 0v-153.6h-51.2v153.6a17.066667 17.066667 0 1 1-34.133333 0v-153.6h-50.346667v238.933333a17.066667 17.066667 0 0 1-17.066667 17.066667zM238.933333 359.202133c-35.464533 3.4304-65.7408 17.851733-92.142933 43.793067C116.992 433.322667 102.4 469.0432 102.4 512c0 42.9056 14.557867 78.301867 44.4928 108.253867 26.368 26.385067 56.610133 41.028267 92.040533 44.526933V359.202133z"
                p-id="2155"></path></svg>
          </span>
          <span id="headText"
                style="font-weight: bold;font-size:x-large;margin-left: 20px;margin-right: 20px">FishBone</span>

        </div>
        <div id="Goto" style="display: flex;flex-direction: row;align-self: center;">
          <a-icon style="font-weight: bold" type="number"/>

          <a-divider style="top: 0;height: unset" type="vertical"/>
          <a-input ref="userNameInput" v-model="pasteId" placeholder="输入PasteID跳转"
                   style="border:0;box-shadow:none;background: transparent;" @pressEnter="goto"/>
        </div><div style="margin-left: auto;margin-right: 10px;display: flex;align-content: center;">
           <span style="width: 2rem;height: 2rem;">
          <div  style="margin-top:-5px ;" @click="$router.push('/scan/')">
            <svg t="1621155470596" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1987" width="1.5rem" height="1.5rem"><path d="M852.77 889.05H171.23A36.27 36.27 0 0 1 135 852.78V171.22A36.27 36.27 0 0 1 171.23 135H547a36.28 36.28 0 1 1 0 72.55H207.5v609h609V477a36.28 36.28 0 0 1 72.55 0v375.78a36.27 36.27 0 0 1-36.28 36.27z" fill="#2F3240" p-id="1988"></path><path d="M465.4 594.88A36.28 36.28 0 0 1 439.75 533l366.17-366.22a36.27 36.27 0 0 1 51.3 51.3L491.05 584.25a36.12 36.12 0 0 1-25.65 10.63z" fill="#4CC9C5" p-id="1989"></path><path d="M385.94 402.54v235.52h235.52l-135.7-99.82-99.82-135.7z" fill="#4CC9C5" p-id="1990"></path><path d="M621.46 674.34H385.94a36.28 36.28 0 0 1-36.28-36.28V402.54a36.28 36.28 0 0 1 65.5-21.49l96.55 131.25L643 608.84a36.28 36.28 0 0 1-21.5 65.5z m-199.24-72.56h88.7l-46.66-34.31a36.5 36.5 0 0 1-7.72-7.73l-34.32-46.65z" fill="#4CC9C5" p-id="1991"></path></svg>
          </div>

        </span>
      </div>
        <div style="margin-right: 10px">
         <span style="width: 2rem;height: 2rem">
          <div id="github" style="" @click="open"></div></span>
        </div>



      </a-layout-header>
      <a-layout-content class="Content">
        <router-view :key="key"></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}, data() {
    return {
      pasteId: ''
    }
  }, computed: {
    key() {
      return this.$route.name === "paste" ? this.$route.params.id : this.$route.name
    }
  }, methods: {
    open() {
      window.open('https://saltedfish.fun/index.php/archives/18/', '_blank')
    },
    goto() {
      console.log(this.pasteId, this.$route.params.id)
      if ((this.pasteId != "" && this.$route.params.id != this.pasteId) || (this.$route.name === "created"))
        this.$router.push('/' + this.pasteId)
      // this.$router.go(0)
      this.pasteId = ""
    }
  }, mounted() {

    setTimeout(() => {
      document.getElementById("hello").style.display = 'none'
      document.getElementById("app").style.display = 'block'

    }, 500)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

#Goto .anticon {
  color: #ced4d9;
  position: relative;
  top: .5px;
  align-self: center;
}

#Goto {
  margin-left: 30px;
}

#Goto input:focus {
  font-weight: bold;
}

#github:hover {
  transition: transform 2s;
  transition-timing-function: ease;
  transform: rotate(360deg);
//height: 2rem; //width: 2rem;

}

#headIcon {
  display: none;
}

#github {
  height: 1.5rem;
  width: 1.5rem;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMTIgMTIgNDAgNDAiPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5IDAgOC40IDUuNSAxNS41IDEzIDE4IDEgLjIgMS4zLS40IDEuMy0uOXYtMy4yYy01LjMgMS4xLTYuNC0yLjYtNi40LTIuNi0uOS0yLjEtMi4xLTIuNy0yLjEtMi43LTEuNy0xLjIuMS0xLjEuMS0xLjEgMS45LjEgMi45IDIgMi45IDIgMS43IDIuOSA0LjUgMi4xIDUuNSAxLjYuMi0xLjIuNy0yLjEgMS4yLTIuNi00LjItLjUtOC43LTIuMS04LjctOS40IDAtMi4xLjctMy43IDItNS4xLS4yLS41LS44LTIuNC4yLTUgMCAwIDEuNi0uNSA1LjIgMiAxLjUtLjQgMy4xLS43IDQuOC0uNyAxLjYgMCAzLjMuMiA0LjcuNyAzLjYtMi40IDUuMi0yIDUuMi0yIDEgMi42LjQgNC42LjIgNSAxLjIgMS4zIDIgMyAyIDUuMSAwIDcuMy00LjUgOC45LTguNyA5LjQuNy42IDEuMyAxLjcgMS4zIDMuNXY1LjJjMCAuNS40IDEuMSAxLjMuOSA3LjUtMi42IDEzLTkuNyAxMy0xOC4xIDAtMTAuNS04LjUtMTktMTktMTl6Ii8+PC9zdmc+);
  background-size: 100% 100%;
  background-repeat: no-repeat
}

#Goto input {
  min-width: 400px;
}

.Content {
  margin-top: 90px;
}

@media only screen and (max-width: 500px) {
  #headIcon {
    display: flex;
    flex-direction: row;
    align-self: center;

    margin-right: -10px;
  }

  #headIcon svg {
    width: 40px;
    height: 40px;
  }

  #header {
    padding: 0;

  }

  #headText {
    display: none;
  }

  #Goto {
    margin-left: 5px;
  }

  #Goto input {
    min-width: 100px;
  }

  .Content {
    margin-top: 40px;
  }
}

@media only screen and (min-width: 768px) {
  #Goto input {
    min-width: 100px;
  }

  .Content {
    margin-top: 40px;
  }

}
</style>
