<template>
  <div class="wrapper">
    <div class="search">
      <icon type="search"
            size="12">
      </icon>
      <input type="text"
             placeholder="请输入你想要的商品"
             v-model="keyword"
             @confirm="toSearchList">
      <button v-show="keyword"
              @click="keyword=''">取消</button>
    </div>
    <div class="history-search">
      <div class="title">
        <span class="title">历史搜索</span>
        <icon type="clear"
              size="18">
        </icon>
      </div>
      <ul>
        <li>小米</li>
        <li>小米智能电视</li>
        <li>小米空气净化器</li>
        <li>西门子洗碗机</li>
        <li>华为手机</li>
        <li>苹果</li>
        <li>锤子</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    toSearchList () {
      wx.navigateTo({ url: `/pages/search_list/main?keyword=${this.keyword}` })
    }
  }
}
</script>

<style lang="less">
.search {
  background-color: #eee;
  padding: 30rpx 15rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  position: relative;
  icon {
    position: absolute;
    top: 50rpx;
    left: 38rpx;
  }
  input {
    height: 60rpx;
    flex: 1;
    background-color: #fff;
    padding-left: 70rpx;
    box-sizing: border-box;
    border-radius: 4rpx;
  }
  button {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: 1rpx solid #bfbfbf;
    background-color: #eee;
    margin-left: 20rpx;
  }
}

.history-search {
  color: #333;
  font-size: 28rpx;
  padding: 30rpx 30rpx 30rpx 15rpx;
  .title {
    display: flex;
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30rpx;
    li {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 26rpx;
      background-color: #ddd;
      margin: 0 30rpx 16rpx 0;
    }
  }
}
</style>