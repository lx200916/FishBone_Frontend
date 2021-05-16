<template>
  <div style="margin-top: 40px">
    <div v-if="!statusofPage"
         style="position:relative;display: flex;flex-direction: column;justify-content: center;align-items:center;">
      <a-popover placement="topLeft">
        <template slot="content">
          <p style="font-weight: bold;">高亮语言</p>
          <a-checkable-tag :checked="paste.lang=='Auto'" class="langCheck"
                           @change="checked => handleChange('Auto', checked)">
            <a-icon type="file-search"/>
            自动检测
          </a-checkable-tag>

          <div style="max-width: 300px;display: flex;flex-wrap: wrap">
            <a-divider dashed orientation="left"> 手动钦定</a-divider>

            <template v-for="tag in langList">
              <a-checkable-tag
                  :key="tag" :checked="paste.lang==tag"
                  class="langCheck"
                  @change="checked => handleChange(tag, checked)"
              >
                {{ tag }}
              </a-checkable-tag>
            </template>
            <a-input
                v-if="inputVisible"
                ref="input"
                :style="{ width: '78px' }"
                :value="inputValue"
                class="langCheck"
                size="small"
                type="text"
                @blur="handleInputConfirm"
                @change="handleInputChange"
                @keyup.enter="handleInputConfirm"
            />
            <a-tag v-else class="langCheck"
                   style="background: #fff; borderStyle: dashed;" @click="showInput">
              <a-icon type="plus"/>
              增加语言
            </a-tag>
          </div>
        </template>
        <!--    <span slot="title">Title</span>-->
        <a-tag class="langTap" color="blue" style="position:absolute;z-index: 3">
          <a-icon type="code"/>
          {{ paste.lang == "Auto" ? '自动检测' : paste.lang }}
        </a-tag>
      </a-popover>
      <a-textarea v-model="paste.content" :rows="25" class="codeArea widRes"
                  placeholder="在此处输入内容..." style="border-radius: 4px 4px 0 0;"/>
      <a-collapse v-model="activek" class="widRes" style="border-radius: 0 0 4px 4px;">
        <a-collapse-panel key="1">
          <template #header>
            <div style="display: flex;width: 100%;flex-direction: row;align-items: center"><span
                style="font-weight: bold;">详细设置</span>
              <a-button v-if="activek==''" style="margin-left: auto;font-weight: bold;" type="primary"
                        :loading="loading" @click.stop="submitPaste">
                提交
              </a-button>
            </div>
          </template>
          <a-row class="optionRow" justify="space-between" type="flex">
            <a-col :lg="7" :md="24" :sm="24" :xs="24" span="7">
              <a-input-password v-model="paste.password" class="PassInput" placeholder="通过密码访问Paste"
                                style="max-width: 300px">
                <a-icon slot="addonBefore" type="safety"></a-icon>
              </a-input-password>
            </a-col>
            <a-col :lg="10" :md="24" :sm="24" :xs="24">
              <a-radio-group v-model="type" button-style="solid" default-value="b" style="font-weight: bold;">
                <a-radio-button value="0">
                  阅后即焚
                </a-radio-button>

                <a-radio-button value="1">
                  1 Day
                </a-radio-button>


                <a-radio-button value="2">
                  7 Days
                </a-radio-button>
                <a-popconfirm
                    cancel-text="好像没必要"
                    ok-text="那我+1s"
                    @confirm="type = '3'"
                >
                  <template slot="title">
                    <p>
                      <del>正所谓<strong>天若有情天亦老,我为👓 续一秒.</strong></del>
                      <br>永久储存需要每7天内访问一次,每次为存储条目续命7天,<br>若未访问会被做过期处理.
                    </p>
                    <span><b>*小贴士</b> 据调查,大多数人只访问条目1-2次,然后就遗忘了.<br>况且,即使您按时访问,本服务也并不提供可用性保证.<br>如果有过高期望,我说还是另请高明吧</span>
                  </template>
                  <a-radio-button value="3">
                    <div class="" style="align-items: center">
                      <svg class="anticon" height="20" p-id="3501" t="1610199878987"
                           version="1.1" viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M128 426.666667c-10.24 0-19.2 3.84-25.173333 10.666666-5.973333 6.4-8.533333 15.786667-7.253334 26.026667l21.333334 127.573333C120.32 618.666667 145.066667 640 170.666667 640h128c27.306667 0 58.026667-23.893333 64-50.346667l45.226666-136.106666c1.706667-5.546667 0.426667-13.653333-2.56-18.773334-4.693333-5.12-11.946667-8.106667-21.333333-8.106666H128m170.666667 298.666666H170.666667C101.546667 725.333333 40.96 671.573333 32.426667 603.306667l-21.333334-127.573334C6.4 439.466667 16.64 405.333333 38.826667 380.586667 61.013333 355.84 93.44 341.333333 128 341.333333h256c35.413333 0 67.413333 14.933333 87.893333 40.96 4.693333 6.4 8.96 13.226667 12.373334 20.906667 18.346667-3.84 37.12-3.84 55.04 0 3.413333-7.68 7.68-14.506667 12.8-20.906667C572.16 356.266667 604.16 341.333333 640 341.333333h256c34.56 0 66.986667 14.506667 89.173333 39.253334 21.76 24.746667 32 58.88 27.733334 93.44l-21.76 130.986666C983.04 671.573333 922.026667 725.333333 853.333333 725.333333h-128c-66.56 0-131.413333-50.773333-147.626666-115.2l-38.4-115.626666c-16.213333-11.946667-38.826667-11.946667-55.04 0l-39.253334 118.613333C429.653333 674.986667 365.226667 725.333333 298.666667 725.333333m341.333333-298.666666c-9.386667 0-16.64 2.986667-21.333333 8.106666-3.413333 5.12-4.266667 13.226667-2.133334 21.76l43.093334 130.133334c7.68 29.44 38.4 53.333333 65.706666 53.333333h128c25.173333 0 50.346667-21.333333 53.333334-47.36l21.76-130.986667c1.28-8.533333-1.28-17.92-7.253334-24.32A32.810667 32.810667 0 0 0 896 426.666667h-256z"
                            fill="currentColor" p-id="3502"></path>
                      </svg>
                      Forever
                    </div>
                  </a-radio-button>
                </a-popconfirm>
              </a-radio-group>

            </a-col>

          </a-row>
          <a-row class="optionRow" justify="space-between" style="margin-top: 10px" type="flex">
            <a-col :lg="10" :md="24" :sm="24" :xs="24" span="7">
              <a-select v-model="deleteType" class="PassInput" default-value="1" style="max-width: 300px;width: 100%"
                        @select="handleSChange">
                <div slot="dropdownRender" slot-scope="menu">
                  <div style="margin: 8px;font-weight: bold;">
                    <a-icon type="fire"/>
                    删除策略
                  </div>
                  <a-divider style="margin: 4px 0;"/>
                  <v-nodes :vnodes="menu"/>
                </div>

                <a-select-option key="1" value="1">
                  不主动删除
                </a-select-option>
                <a-select-option key="2" value="2">
                  生成随机删除Token
                </a-select-option>
                <a-select-option key="3" value="3">
                  使用指定删除Token
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :lg="10" :md="24" :sm="24" :xs="24">
              <div v-show="deleteType!='1'">
                <a-input ref="DeleteInput" v-model="token" :readOnly="deleteType=='2'" class="PassInput"
                         placeholder="输入删除Token" style="width: 100%" @click="TryToCopy">
                  <a-icon slot="prefix" type="fire"/>
                  <a-tooltip v-show="deleteType=='2'" slot="suffix" title="重新生成Token">
                    <div @click="handleSChange('2')">
                      <a-icon type="sync"/>
                    </div>
                  </a-tooltip>
                </a-input>
              </div>
            </a-col>
          </a-row>
          <p style="margin-top: 20px;display: flex;justify-content: center;font-weight: bold;">

            <a-button style="text-align: center;font-weight: bold;" type="primary"
                      :loading="loading" @click="submitPaste">
              提交
            </a-button>

          </p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import {aesEncode, dateFormat, fromBase64, getToken, randomString, toBase64} from "@/request";


export default {
  name: "Index", components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  }, data() {
    return {
      activek: "",
      type: '2',
      statusofPage: false,
      paste: {content: "", lang: "Auto", password: ""},
      langList: ['Cpp', 'Go', 'Java', 'C#', 'JSON', 'SQL', 'TypeScript', 'PHP', 'Rust', 'Ruby', 'Bash', 'Swift'],
      inputVisible: false,
      inputValue: '',
      postURL: "/once",
      deleteType: "1",
      token: '',
      loading: false

    }
  }, methods: {
    TryToCopy(e) {
      if (this.deleteType == '2') {
        this.copyToBoard(this.token, e)
      }
    },
    copyToBoard(text, event) {
      const cb = new Clipboard('.t', {
        text: () => text
      })
      cb.on('success', () => {
        this.$message.success("复制成功")

      })
      cb.on('error', () => {
        this.$message.error("复制失败")

      })
      cb.onClick(event)
      cb.destroy()
    },
    handleSChange(val) {
      if (val == '2') {
        this.token = randomString(6)
      } else {
        this.token = ''

      }
    },
    changeType() {
      this.postURL = "/once"


    },
    handleChange(tag, checked) {
      if (checked) {
        this.paste.lang = tag
      }
    }, showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {

      const inputValue = this.inputValue;
      let tags = this.langList;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        langList: tags,
        inputVisible: false,
        inputValue: '',
      });
    }, async submitPaste() {
      let pastePass = this.paste.password
      let pasteContent = this.paste.content
      let isEncryption = false
      if (pastePass.length > 0) {
        console.log("Pass:" + pastePass)
        pasteContent = aesEncode(pasteContent, pastePass)
        isEncryption = true
      }

      if (this.type == "2") {
        this.postURL = "/"
      }
      if (this.type == '0') {
        this.token = randomString(6)
        this.postURL = "/once"
      }
      let obj = {content: pasteContent, lang: this.paste.lang, password: isEncryption, timeline: this.type}
      try {
        this.loading = true
        let res = await this.$http.get("/?method=beat")
        let objx = fromBase64(res.data)
        // console.log(obj)
        obj.xtoken = getToken(objx.tokenEncryption)
      } catch (e) {
        this.loading = false
        this.$message.error(e)
        this.$message.error("浏览器可能不支持Base64或后端服务出错")
        return
      }


      if (this.deleteType != '1' || this.type == '0') {
        obj['token'] = this.token
        obj['tokenEncryption'] = aesEncode(this.token, pastePass)
      }
      let payload = toBase64(obj)
      this.$http.post(this.postURL, payload).then(res => {
        this.loading = false

        console.log(res.data)
        let resp = fromBase64(res.data)
        console.log(resp)
        if (resp['status'] == 201) {
          try{
            let localstr=window.localStorage.getItem("bone_history")
            let itemList=[]
            if(localstr&&localstr.length>1){
              itemList= JSON.parse(localstr)
            }
            let now=new Date()
            itemList.push({id:resp['id'],encrypt:isEncryption,time:dateFormat("MM-dd hh:mm",now)})
            window.localStorage.setItem("bone_history",JSON.stringify(itemList))
          }catch (e) {
            console.log(e)
            this.$message.error("历史保存出错")

          }

          this.$router.push({name: 'created', params: {id: resp['id']}})
        }
      }, err => {
        this.loading = false

        console.log(err)
      })

    }
  }
}
</script>

<style>
.langTap {
  top: 8px;
  right: 11%;
}

.codeArea::-webkit-scrollbar {
  background-color: transparent;
  width: 10px;
  height: 10px;
}


.codeArea::-webkit-scrollbar-thumb {
  background-color: lightgray;
}

.anticon {
  vertical-align: middle;
  position: relative;
  top: -.1em;

}

.widRes {
  width: 80% !important;
}

.ant-collapse-content-active {
  background: #f7f7f7 !important;
}

.langCheck {
  margin-top: 1px;
  margin-bottom: 1px;
}

.ant-divider-inner-text {
  padding: 0 10px;
  font-size: 0.8rem;
  font-weight: normal;
}

.codeArea {
  font-family: "Fira Code", Menlo, Monaco, Consolas, "Andale Mono", "lucida console", "Courier New", monospace;
  font-weight: 400;

}

.optionRow {
  margin-left: 10%;
  margin-right: 10%;
}

@media only screen and (max-width: 500px) {
  .PassInput {
    min-width: 300px;
    margin-bottom: 10px;
  }

  .widRes {
    width: 95% !important;

  }

  .optionRow {
    margin-left: 0;
    margin-right: 0;
  }

  .langTap {
    top: 8px;
    right: 6%;
  }

}

@media only screen and (min-width: 768px) {
  .PassInput {
    min-width: 300px;
    margin-bottom: 10px;
  }


}


</style>