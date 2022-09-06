<template>
    <!-- 弹幕列表 -->
    <div class="barrage-container">
      <vue-baberrage :barrageList="$store.state.barrageList">
        <template v-slot:default="slotProps">
          <span @click="barrage_click" class="barrage-items">
            
            <!-- <span class="ml-2">{{ slotProps.item.nickname }} :</span> -->
            <span class="ml-2">{{ slotProps.item.messageContent }}</span>
          </span>
        </template>
      </vue-baberrage>
    </div>
</template>

<script>
export default {
mounted() {
  //socket接受弹幕数据
  this.sockets.subscribe('relogin', (data) => {
    var message = {
      messageContent: data.msg,
      time: Math.floor(Math.random() * (75 - 5)) + 7,
      userVo: null
    };
    this.$store.state.barrageList.push(message);
    this.$store.state.dchatList.unshift(
      JSON.stringify({"_id":"000","msg":message.messageContent,"time":"","userid":""}) 
    );
    // console.log(this.$store.state.barrageList)
  })
},
data() {
  return {

  }
},

methods: {
  barrage_click(){
    // console.log('你点击了弹幕')
  }
},
};
</script>

<style scoped>
.baberrage-stage{
position:initial;
}
.barrage-container {
position: absolute;
top: 50px;
left: 0;
right: 0;
bottom: 0;
height: calc(100% -50px);
width: 100%;
}
.barrage-items {
background: rgb(0, 0, 0, 0.7);
border-radius: 100px;
color: #fff;
padding: 2px 8px 2px 2px;
align-items: center;
display: flex;
}
.ml-3{
margin-left: 12px!important;
}

.ml-2{
margin-left: 8px!important;
}
</style>