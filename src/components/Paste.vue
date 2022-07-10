<template>
  <div class="WidthRes" style="margin-top: 40px;">
    <a-spin :spinning="loading">
      <a-icon slot="indicator" spin style="font-size: 24px" type="loading"/>

      <a-card v-show="!loading">
    <span slot="extra">
      <a-popover>
    <template slot="content">
      <span style="font-weight: bold"><a-icon theme="filled" type="fire"/> 焚烧此记录</span>
      <a-input v-model="burnToken" placeholder="删除Token" style="margin-top:10px" @pressEnter="burn">
        <a-tooltip slot="suffix" title="焚烧会删除服务器上的加密记录,操作不可回退.">
        <a-icon theme="twoTone" two-tone-color="#eb2f96" type="exclamation-circle"/>
</a-tooltip>
      </a-input>

    </template>
        <a-icon v-if="!paste.password&&!isBurn&&!Burned" style="font-size: 1.2rem;margin-right: 5px" theme="twoTone"
                two-tone-color="#eb2f96" type="fire"/></a-popover>
      <a-icon v-show="!paste.password" id="copy" :data-clipboard-text="paste.content" style="font-size: 1.2rem"
              theme="twoTone" type="copy"/> </span>
        <template slot="title">
          <span>{{ id }} | {{ paste.lang }}</span>
        </template>
        <FireI v-if="!paste.password&&isBurn&&!Burned" v-on:endTimer="burn"></FireI>

        <div v-if="!paste.password" ref="hljs">
          <pre><code v-bind:class="'line-numbers codeArea ' + (paste.lang=='Auto'?'':'language-'+paste.lang.toLowerCase())"
                     v-text="paste.content"></code></pre>

        </div>

        <div v-else class="hljs " style="position:relative;">   <pre> <code class="language-cpp">
  //你应该明白这段代码只是占位符吧?
    float Q_rsqrt( float number )
 {
    long i;
    float x2, y;
    const float threehalfs = 1.5F;

    x2 = number * 0.5F;
    y  = number;
    i  = * ( long * ) &amp;y;
    i  = 0x5f3759df - ( i >> 1 ); // what the fuck?
    y  = * ( float * ) &amp;i;
    y  = y * ( threehalfs - ( x2 * y * y ) ); // 1st iteration
    // y   = y * ( threehalfs - ( x2 * y * y ) ); // 2nd iteration, this can be removed

    #ifndef Q3_VM
    #ifdef __linux__
        assert( !isnan(y) ); // bk010122 - FPE?
    #endif
    #endif
    return y;
 }
   </code></pre>
          <div class="password_hover" style=""/>
          <div class="password_cneter" style="top: 15%;text-align: center;">

            <svg class="anticon" height="64" p-id="6665" t="1610292777987"
                 version="1.1" viewBox="0 0 1024 1024" width="64" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M512 85.333333c-117.333333 0-213.333333 96-213.333333 213.333334v85.333333h85.333333v-85.333333c0-70.4 57.6-128 128-128s128 57.6 128 128v85.333333h85.333333v-85.333333c0-117.333333-96-213.333333-213.333333-213.333334z"
                  fill="#424242" p-id="6666"></path>
              <path
                  d="M768 938.666667H256c-46.933333 0-85.333333-38.4-85.333333-85.333334V469.333333c0-46.933333 38.4-85.333333 85.333333-85.333333h512c46.933333 0 85.333333 38.4 85.333333 85.333333v384c0 46.933333-38.4 85.333333-85.333333 85.333334z"
                  fill="#FB8C00" p-id="6667"></path>
              <path d="M512 661.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#C76E00" p-id="6668"></path>
            </svg>
            <h2 style="margin-bottom: 0.1rem;">输入密码解密记录</h2>
            <span><b>*</b> 服务端存储的是加密后的文本,加密与解密均在浏览器端实现.</span>
            <a-input-password ref="passInput" v-model="pass"
                              :class="'password_cneter '+(status?'':'password_wrong')"
                              style="max-width: 70%;margin-top: 30px" @change="status=true"
                              @pressEnter="checkPass"/>

          </div>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
// import hljs from 'highlight.js'
import lineNumbersBlock from "@/assets/js/highlightjs-line-numbers";
import '@/assets/css/github-gist.css'
import '@/assets/css/highlightjs-line-numbers.css'
import {aesDecode, dateFormat, fromBase64} from "@/request";
import FireI from "@/components/FireI";

export default {
  name: "Paste",
  components: {FireI},
  data() {
    return {
      paste: {
        content: ` //你应该明白这段代码只是占位符吧?
    float Q_rsqrt( float number )
 {
    long i;
    float x2, y;
    const float threehalfs = 1.5F;

    x2 = number * 0.5F;
    y  = number;
    i  = * ( long * ) &y;
    i  = 0x5f3759df - ( i >> 1 ); // what the fuck?
    y  = * ( float * ) &i;
    y  = y * ( threehalfs - ( x2 * y * y ) ); // 1st iteration
    // y   = y * ( threehalfs - ( x2 * y * y ) ); // 2nd iteration, this can be removed

    #ifndef Q3_VM
    #ifdef __linux__
        assert( !isnan(y) ); // bk010122 - FPE?
    #endif
    #endif
    return y;`, lang: "Cpp", password: false,
      }, loading: true, id: '', pass: '', status: true, isBurn: false, burnToken: '', Burned: false
    }
  }, mounted() {
    this.id = this.$route.params.id
    this.$http.get("/" + this.id + "?json=true",).then(res => {

      let resp = fromBase64(res.data)
      if (resp.tokenEncryption != undefined && resp.tokenEncryption.length > 0) {
        this.isBurn = true
        this.burnToken = resp.tokenEncryption

      }
      if (resp.status == 200) {
        this.loading = false
        this.paste.content = resp.content
        this.paste.lang = resp.lang
        this.paste.password = false
        this.renderHljs(this.$refs.hljs)
        try{
          let localstr=window.localStorage.getItem("bone_history")
          let itemList=[]
          if(localstr&&localstr.length>1){            itemList= JSON.parse(localstr)
          }
          for (const item of itemList) {
            if(this.id==item.id){
              return;
            }
          }
          console.log(itemList,this.id)
          let now=new Date()
          itemList.push({id:this.id,encrypt:this.paste.password,time:dateFormat("MM-dd hh:mm",now)})
          window.localStorage.setItem("bone_history",JSON.stringify(itemList))
        }catch (e) {
          console.log(e)
          this.$message.error("历史保存出错")

        }

      } else if (resp.status == 401) {
        this.loading = false
        this.paste.content = resp.content
        this.paste.lang = resp.lang
        this.paste.password = true
        try{
          let localstr=window.localStorage.getItem("bone_history")
          let itemList=[]
          if(localstr&&localstr.length>1){
            itemList= JSON.parse(localstr)
          }
          for (const item of itemList) {
            if(this.id==item.id){
              return;
            }
          }
          let now=new Date()
          itemList.push({id:this.id,encrypt:this.paste.password,time:dateFormat("MM-dd hh:mm",now)})
          window.localStorage.setItem("bone_history",JSON.stringify(itemList))
        }catch (e) {
          console.log(e)
          this.$message.error("历史保存出错")

        }
      } else if (resp.status == 404||resp.status ==400) {
        this.$message.error("Paste 不存在")
        this.$router.push("/")
      } else {
        this.$message.error("未知错误")
        this.$router.push("/")
      }


    }, ({response}) => {
      this.loading = false

      console.log(response)
      if (response.status == 404) {
        this.$message.error("Paste 不存在")
        this.$router.push("/")
      } else {
        this.$message.error("未知错误")
        this.$router.push("/")
      }
    })
    const btn = new Clipboard('#copy')
    btn.on('success', () => {
      this.$message.success("复制成功")
    })
    btn.on('error', () => {
      this.$message.error("复制失败")
    })

  }, methods: {
    checkPass() {
      let result = ""
      try {
        result = aesDecode(this.paste.content, this.pass)
      } catch {
        this.wrongPass()

      }

      if (result.length > 0) {
        this.paste.content = result
        this.burnToken = aesDecode(this.burnToken, this.pass)
        console.log(this.burnToken)
        this.rightPass()
      } else {
        this.wrongPass()
      }
    }, burn() {
      this.$http.delete("/" + this.id + "?token=" + this.burnToken).then(res => {
        console.log(res.data)
        if (res.data.status == 200) {
          this.Burned = true
          this.$message.warn("已焚毁")
        }
      })

    },
    wrongPass() {
      this.status = false
    }, rightPass() {
      this.paste.password = false
      this.renderHljs()
    }
    , renderHljs: function () {
      this.$nextTick(() => {
        let blocks = document.querySelectorAll('pre code');

        blocks.forEach(function (block) {
          window.hljs.highlightBlock(block);
          if (block.getAttribute('class').split(' ').indexOf('line-numbers') > -1) {
            lineNumbersBlock(block, {
              singleLine: true
            });
          }
        });

      })
    },
  }
}
</script>

<style>
.WidthRes {
  max-width: 80%;
  margin-left: 10%
}

.password_hover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.94);
//backdrop-filter: blur(10px)
}

.password_cneter {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 4;
  max-width: 40%;
}

.password_wrong {

  animation: shake 800ms ease-in-out;
}

.password_wrong .ant-input:focus, .password_wrong .ant-input:hover {
  border-color: #f50 !important;
}

.password_wrong .ant-input:focus {
  box-shadow: 0 0 0 2px rgba(255, 85, 0, 0.2)

}

@media only screen and (max-width: 500px) {
  .WidthRes {
    max-width: 95%;
    margin-left: 2.5%
  }

  .password_cneter {
    max-width: 80%;

  }
}

@keyframes shake { /* 水平抖动，核心代码 */
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(+2px, 0, 0);
  }
  30%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(+4px, 0, 0);
  }
  50% {
    transform: translate3d(-4px, 0, 0);
  }
}

.codeArea {
  font-family: "Fira Code", Menlo, Monaco, Consolas, "Andale Mono", "lucida console", "Courier New", monospace;
  font-weight: 400;

}

.codeArea::-webkit-scrollbar {
  background-color: transparent;
  width: 10px;
  height: 10px;
}


.codeArea::-webkit-scrollbar-thumb {
  background-color: lightgray;
}

@supports (-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)) {
  /* 支持 backdrop-filter 时应用的效果，记得把一些属性覆盖掉 */
  .password_hover {
    background-color: rgba(255, 255, 255, 0.3);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
}
</style>