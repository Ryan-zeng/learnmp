<template>
  <div class="wrapper">
    <div class="search">
      <icon type="search"
            size="12">
      </icon>
      <input type="text"
             placeholder="请输入你想要的商品"
             v-model.trim="keyword"
             @confirm="toSearchList"
             @input="querySuggest">
      <button v-show="keyword"
              @click="keyword=''">取消</button>
      <div class="suggest">
        <ul>
          <li>黑马程序员</li>
          <li>黑马程序员</li>
          <li>黑马程序员</li>
          <li>黑马程序员</li>
          <li>黑马程序员</li>
        </ul>
      </div>
    </div>
    <div class="history-search">
      <div class="title">
        <span class="title">历史搜索</span>
        <icon type="clear"
              size="18"
              @click="clearKeywordList">
        </icon>
      </div>
      <ul>
        <li v-for="(item, index) in keywordList"
            :key="index"
            @click="clickSearch(item,index)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const KEYWORD_KEY = 'keyword_list'
export default {
  data () {
    return {
      keyword: '',
      keywordList: wx.getStorageSync(KEYWORD_KEY) || []
    }
  },
  methods: {
    querySuggest () {
      console.log(this.keyword)
    },
    clickSearch (item, index) {
      wx.navigateTo({ url: `/pages/search_list/main?keyword=${item}` })
      this.keywordList.splice(index, 1)
      this.keywordList.unshift(item)
      wx.setStorageSync(KEYWORD_KEY, this.keywordList)
    },
    toSearchList () {
      if (!this.keyword) {
        return
      }

      wx.navigateTo({ url: `/pages/search_list/main?keyword=${this.keyword}` })
      // 去重放前面
      if (!this.keywordList.includes(this.keyword)) {
        this.keywordList.unshift(this.keyword)
      }
      wx.setStorageSync(KEYWORD_KEY, this.keywordList)
    },
    clearKeywordList () {
      wx.showModal({
        title: '提示',
        content: '你确定要删除吗',
        showCancel: true, // 是否显示取消按钮,
        cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', // 取消按钮的文字颜色,
        confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#3CC51F', // 确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            this.keywordList = []
            wx.setStorageSync(KEYWORD_KEY, [])
          }
        }
      })
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
  .suggest {
    position: absolute;
    left: 15rpx;
    top: 90rpx;
    width: 720rpx;
    background-color: #ddd;
    padding: 20rpx 10rpx;
    box-sizing: border-box;
    li {
      margin-bottom: 10rpx;
    }
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