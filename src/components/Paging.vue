<template>
  <div class="paging clear-both">
    <div class="page-box">
        <a href="#">上一页</a>
        <a href="#" class="cur">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">7</a>
        <a href="#">8</a>
        <a href="#">9</a>
        <a href="#">10</a>
        <a href="#">11</a>
        <a href="#">12</a>
        <a href="#">13</a>
        <a href="#">14</a>
        <a href="#">下一页</a>
    </div>
  </div>
</template>

<script>

export default {
  name: "paging",
  data() {
    return {
    }
  },
  created() {
    
  }
};
</script>

<style scoped lang="less">
.paging{
    padding: 20px;
    margin-bottom: 160px;
    // background: rgba(0, 217, 255, 0.212);
}

.page-box{
    float: right;
}

.page-box a{
    display: inline-block;
    padding: 0 10px;
    margin-left: 5px;
    height: 30px;
    line-height: 30px;
    color: #888;
    font-size: 14px;
    text-align: center;
    border: 1px solid #eee;
    border-radius: 2px;
    background: #fff;
    box-sizing: border-box;
}

.page-box a.cur{
    color: #fff;
    background: rgb(101, 160, 34);
}

.page-box a:hover{
    color: #fff;
    background: rgb(101, 160, 34);
}
</style>