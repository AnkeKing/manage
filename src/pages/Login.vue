<template>
  <div class="box">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Username</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="inputEmail3"
            v-model="username"
            placeholder="Username"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            v-model="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button class="btn btn-default submit" @click.prevent="toLogin">Sign in</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from "../api/http";
export default {
  name: "Box",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    toLogin() {
      console.log(this.username, this.password);
      login(
        //   {
        //   username: this.username,
        //   password: this.password
        // }
        {
          username: "admin",
          password: "123456"
        }
      ).then(res => {
        console.log("啦啦啦", res);
        if (res) {
          this.$router.replace({
            name: "home"
          });
        }
      });
    }
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../static/css/login.min");
</style>
