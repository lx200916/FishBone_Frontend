<template><div style="margin-top:50px">
<a-card class="qr_box">
  <div class="qrcode">
    <div id="qrcode"  ref="qrcode"/>
    <h4 class="sub_title">
      请使用访问过Paste的浏览器扫码
    </h4>
    <p class="sub_desc" v-if="links.length>2">
      或直接访问https://{{host}}/transfer/{{links}}
    </p>

    <svg t="1621142075472" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6552" width="60" height="60"><path d="M852.77 889.05H171.23A36.27 36.27 0 0 1 135 852.78V171.22A36.27 36.27 0 0 1 171.23 135H547a36.28 36.28 0 1 1 0 72.55H207.5v609h609V477a36.28 36.28 0 0 1 72.55 0v375.78a36.27 36.27 0 0 1-36.28 36.27z" fill="#2F3240" p-id="6553"></path><path d="M465.4 594.88A36.28 36.28 0 0 1 439.75 533l366.17-366.22a36.27 36.27 0 0 1 51.3 51.3L491.05 584.25a36.12 36.12 0 0 1-25.65 10.63z" fill="#4CC9C5" p-id="6554"></path><path d="M385.94 402.54v235.52h235.52l-135.7-99.82-99.82-135.7z" fill="#4CC9C5" p-id="6555"></path><path d="M621.46 674.34H385.94a36.28 36.28 0 0 1-36.28-36.28V402.54a36.28 36.28 0 0 1 65.5-21.49l96.55 131.25L643 608.84a36.28 36.28 0 0 1-21.5 65.5z m-199.24-72.56h88.7l-46.66-34.31a36.5 36.5 0 0 1-7.72-7.73l-34.32-46.65z" fill="#4CC9C5" p-id="6556"></path></svg>
  </div>


    </a-card>
</div></template>

<script>
import Qrcode from 'qrcodejs2'

export default {
  name: "Scan", data() {
    return {
      links: '', id: '',
      websocketObj: null,
      wsHeartflag: false,host:window.location.host
    }
  }, mounted() {
    this.initLink()

  },methods:{
    initLink(){
      try{
      this.$http({ url: '/transfer', baseURL: '/_api',method:"GET" }).then(res=>{
        if(res&&res.data)
        {
          console.log(res.data)
       let resp=  res.data
          if(resp['code']==0){
            this.links=resp['data'];
            this.createqr(true)
            this.initWebsocket()
          }else {
            this.$message.error('抱歉，暂时无法连接到服务器，请稍后再试');
          }
        }      })
      }catch (e) {
        console.log(e)
        this.$message.error('抱歉，暂时无法连接到服务器，请稍后再试');

      }
    },
    initWebsocket(){
      if (WebSocket) {
        this.webSocketObj = new WebSocket(
            "wss://"+window.location.host+"/ws/"+this.links
        );
        this.webSocketObj.onmessage = this.onMessage
        this.webSocketObj.onopen = this.onOpen
        this.webSocketObj.onerror = this.onError
        this.webSocketObj.onclose = this.onClose
      }else {
        this.$message.error("WebSocket 不支持")
      }
    },onOpen() {
      if (this.webSocketObj.readyState === 1) {
        //- readyState 等于1 的时候建立链接成功
        this.wsHeartflag = true;
        this.webSocketObj.send("ping");
        this.reconnectTime = 0;
      }
    },timingHeart() {
      // 心跳检测  每4.5分钟发送一次
      if (this.wsHeartflag) {
        this.webSocketObj.send('ping');
      }
      this.wsHeart = setTimeout(() => {
        this.timingHeart();
      }, 20 * 1000); // 100s心跳
    },onError() {
      // 链接失败，进行重连
      clearTimeout(this.wsHeart);
      this.wsHeartflag = false;
      if (this.reconnectTime <= 60) {
        setTimeout(() => {
          // this.onOpen();
          this.initWebsocket();
          this.reconnectTime+=1;
        }, 5000);
      } else {
        this.$message.error('抱歉，暂时无法连接到服务器，请稍后再试');
        this.onClose();
      }
    },
    onClose() {
      this.wsHeartflag = false;
      // this.$message.error('抱歉，暂时无法连接到服务器，请稍后再试');

      this.webSocketObj && this.webSocketObj.close && this.webSocketObj.close();
    },onMessage(evt) {
      var received_msg = evt && evt.data!="pong"&&JSON.parse(evt.data);
      if (received_msg.code ==0) {
        console.log(received_msg)
        // 支付成功
        // this.$toast('恭喜您，支付成功，已升级成VIP');
        this.onClose();
        this.$router.push("/"+received_msg['data'])

      } else {
        // 支付失败
        console.log(received_msg)
      }
    },
        createqr(b) {
      if (b)
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          let qrcode = new Qrcode(this.$refs.qrcode, {
            height: 250, width: 250, text: "https://"+window.location.host+"/transfer/"+this.links
          })

        })
      else this.$nextTick(() => {
        this.$refs.qrcode.innerHTML = ''
      })
    }
  } }
    </script>

<style>
.qr_box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -190px;
    margin-top: -270px;
    border-radius: 0px;
  border: 0px;
    //-moz-border-radius: 4px;
    //-webkit-border-radius: 4px;
    //background-color: #FAFAFA;
    width: 400px;
    height: 540px;
    //box-shadow: 0 1px 5px rgb(182, 181, 181);

}
.qr_box .qrcode {
    position: relative;
    text-align: center
}



.qr_box .qrcode img {
    display: block;
    width: 200px;
    height: 200px;
    margin: 42px auto 12px
}
.qr_box .qrcode .sub_title {
  text-align: center;
  font-size: 24px;
  color: #353535;
  margin-top: 30px;
  margin-bottom: 23px
}

.qr_box .qrcode .sub_desc {
  text-align: center;
  color: #a3a3a3;
  font-size: 15px;
  padding: 0 40px;
  line-height: 1.8;
  margin-bottom: 30px;
}

.qr_box .qrcode .sub_desc a {
  text-decoration: none;
  color: #576b95
}
</style>