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
  height: 100%;
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

</style>
