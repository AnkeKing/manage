<template>
  <div id="app">
    <king-loading></king-loading>
    <king-warning></king-warning>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width: 100;
  height: 100vh;
  overflow: hidden;
}
body,
html {
  width: 100%;
  height: 100%;
}


* {
  margin: 0px;
  padding: 0px;
}

div,
ul,
li,
span,
a,
img,
button,
input {
  box-sizing: border-box;
  outline: none;
}

button {
  cursor: pointer;
  border: none;
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
}

::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #cccccc;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cccccc;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #cccccc;
}
.ivu-input-wrapper {
  width: 80%;
  float: right;
}
.my-div {
  line-height: 35px;
  margin-bottom: 5px;
}
.top-div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  background: rgba(164, 84, 110, 0.7);
  color: #ffffff;
  font-size: 14px;
}
.ivu-switch-checked {
  border-color: rgba(246, 187, 66, 0.9);
  background-color: rgba(246, 187, 66, 0.9);
}
.ivu-btn-primary {
  background-color: rgba(164, 84, 110, 0.7);
  border-color: rgba(164, 84, 110, 0.7);
}
.ivu-btn-primary:hover {
  border-color: rgba(246, 187, 66, 0.9);
  background-color: rgba(246, 187, 66, 0.9);
}
.ivu-modal-body .ivu-btn > span {
  color: #666666;
}
.ivu-table td,
.ivu-table th {
  text-align: center;
}
.my-div .ivu-select {
  width: 50%;
}
.add-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px;
}
.ivu-page {
  display: flex;
  justify-content: center;
  margin-top: 27px;
}
</style>
