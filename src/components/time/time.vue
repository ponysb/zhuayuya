<template>
    <div>
        <div class="time-style">{{time}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            time:''
        }
    },
    created(){
        this.formatDate()
        self.setInterval(() => {
			self.setTimeout(() => {
				this.formatDate()
			}, 0)
		}, 1000)
    },
    methods: {
        formatDate() {
            let date = new Date();
            // let YY = date.getFullYear() + '-';
            // let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            // let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
            let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            this.time = hh + mm + ss;
        }
    }
}
</script>
<style scoped>
    .time-style{
        font-size: 56px;
        font-weight: 600;
        color: #fff;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, .3);
        margin-top: 6px;
        text-align: center;
    }
</style>