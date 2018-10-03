<template>
  <div id="app">
    <div class="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

body{
  background: rgb(246,246,246)
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

.clear-both::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
  clear: both;
}

.not-allowed{
  cursor:not-allowed;
}

#logo {
  color: #eee;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  font-weight: 500;
  color: #eee;
}

@media screen and (max-width: 588px) {

  #logo {
    float: none;
    text-align: center;
    display: block;
  }

}
</style>
