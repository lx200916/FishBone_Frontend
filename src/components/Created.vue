<template>
  <a-result
      status="success"
      style="max-width: 1000px;align-self: center;margin-left: auto;margin-right: auto;margin-top: 40px"
      title="记录已保存"

  >
    <template #subTitle>
      记录ID为<strong>{{ id }}</strong>
    </template>
    <template #extra>
      <a-button key="console" type="primary" @click="$router.push('/')">
        Another Shot
      </a-button>

    </template>
    <div class="desc">
      <p style="font-size: 16px;">
        想要访问 <strong>记录{{ id }}</strong>:
      </p>
      <p>
        <a-icon :style="{ color: 'red' }" type="edit"/>
        在页面头部的输入框内输入<strong>{{ id }}</strong>

      </p>
      <p>
        <a-icon :style="{ color: 'red' }" type="link"/>
        访问 <a :href="links" target="_blank"><strong>https://bone.saltedfish.fun/{{ id }}</strong></a>
        <a-button id="copy" :data-clipboard-text="links" ghost>
          <a-icon theme="twoTone" type="copy"/>
        </a-button>

      </p>
      <p>
        <a-tooltip @visibleChange="createqr">
          <a-icon :style="{ color: 'red' }" type="scan"/>
          <template slot="title">
      <div id="qrcode" ref="qrcode"/>
</template>
<a> 扫描二维码</a></a-tooltip>
</p>
</div>
</a-result>
</template>

<script>
import Qrcode from 'qrcodejs2'
import Clipboard from 'clipboard'

export default {
  name: "Created", data() {
    return {
      links: '123', id: ''
    }
  }, mounted() {

    this.id = this.$route.params['id']
    if (this.id == undefined) this.$router.push("/")
    this.links = "https://bone.saltedfish.fun/" + this.id
    const btn = new Clipboard('#copy')
    btn.on('success', () => {
      this.$message.success("复制成功")
    })
    btn.on('error', () => {
      this.$message.error("复制失败")
    })

  }, methods: {
    createqr(b) {
      if (b)
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          let qrcode = new Qrcode(this.$refs.qrcode, {
            height: 128, width: 128, text: this.links
          })

        })
      else this.$nextTick(() => {
        this.$refs.qrcode.innerHTML = ''
      })
    }
  }
}
</script>

<style scoped>
.desc {
  max-width: 500px;
}

#copy {
  border-color: transparent;
}

#copy:hover, #copy:focus {
  border-color: #40a9ff;
}
</style>