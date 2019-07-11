<template>
  <div class="box">
    <div class="back-box">
      <div class="top-content">
        <h1>头部</h1>
      </div>
      <div class="bottom-box">
        <div class="left-select-box">
          <Collapse accordion v-model="value3">
            <Panel name="1">
              史蒂夫·乔布斯
              <div slot="content">
                史蒂夫·乔布斯（Steve Jobs）
                <Collapse accordion v-model="value4">
                  <Panel name="1-1">
                    iPhone
                    <p slot="content">iPhone，是美国苹</p>
                  </Panel>
                  <Panel name="1-2">
                    iPad
                    <p slot="content">iPad是由苹果公司于</p>
                  </Panel>
                </Collapse>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div class="right-content-box">
          内容区
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {
      value3: "1",
      value4: "1-1"
    };
  },
  components: {}
};
</script>

<style  rel='stylesheet/scss' lang='scss' scoped>
@import url("../../static/css/home.min");
</style>
