<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from './components/index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style scoped>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
</style>
<style>
::-webkit-scrollbar{
	display: none;
	/* height: 8px;
	width: 0px;
	border-radius: 8px;
	background-color: #dadada; */
}
.el-select .el-input .el-select__caret {
	line-height: 34px;
}
img[src=""],img:not([src]){
    opacity:0;
}
span:hover{
	cursor: pointer;
}
.el-input--suffix .el-input__inner {
	height: 34px;
	border-radius: 6px;
	border: none;
	background-color: rgb(255, 255, 255);
	color: #606266;
}
</style>
