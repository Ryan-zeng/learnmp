<template>
  <div v-if="isInit">
    <Search></Search>
    <div class="content">
      <div class="left">
        <div class="cate1-item"
             @click="selectIndex=index"
             :class="{selected:index===selectIndex}"
             v-for="(item,index) in cateList"
             :key="index">{{item.cat_name}}</div>
      </div>
      <div class="right">
        <!-- 图片 -->
        <img src="../../../static/images/titleImage.png"
             alt="">
        <div class="cate2"
             v-for="(item2, index2) in cateList[selectIndex].children"
             :key="index2">
          <p class="title">/<span>{{item2.cat_name}}</span>/</p>
          <div class="cate3-list">
            <div class="cate3-item"
                 @click="toSearch(item3.cat_name)"
                 v-for="(item3, index3) in item2.children"
                 :key="index3">
              <img :src="'https://autumnfish.cn/wx/'+item3.cat_icon"
                   alt="">
              <p>{{item3.cat_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../../components/search'
import request from '../../utils/request'
export default {
  data () {
    return {
      selectIndex: 0,
      cateList: [],
      isInit: false
    }
  },
  components: {
    Search
  },
  created () {
    this.getCateList()
  },
  methods: {
    getCateList () {
      request({
        url: '/api/public/v1/categories'
      }).then(res => {
        // console.log(res)
        let { message, meta } = res.data
        if (meta.status === 200) {
          this.cateList = message
          this.isInit = true
        }
      })
    },
    toSearch (name) {
      wx.navigateTo({ url: `/pages/search/main?keyword=${name}` })
    }
  }
}
</script>

<style lang="less">
.content {
  position: absolute;
  top: 100rpx;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  .left {
    width: 198rpx;
    background-color: #ccc;
    overflow: auto;
    .cate1-item {
      height: 100rpx;
      line-height: 100rpx;
      background-color: #f4f4f4;
      color: #333;
      border-bottom: 1rpx solid #eee;
      text-align: center;
      font-size: 28rpx;
      &.selected {
        background-color: #fff;
        color: #eb4450;
        position: relative;
        &::before {
          content: "";
          width: 8rpx;
          height: 60rpx;
          background-color: #eb4450;
          position: absolute;
          left: 0;
          top: 20rpx;
        }
      }
    }
  }
  .right {
    background-color: #fff;
    flex: 1;
    overflow: auto;
    padding: 20rpx 16rpx;
    & > img {
      height: 180rpx;
      width: 100%;
    }
    .cate2 {
      margin-top: 20rpx;
      .title {
        color: #ddd;
        font-size: 28rpx;
        text-align: center;
        margin-top: 40rpx;
        span {
          color: #333;
          margin: 0 30rpx;
        }
      }
      .cate3-list {
        display: flex;
        flex-wrap: wrap;
      }
      .cate3-item {
        width: 33.33%;
        margin-top: 55rpx;
        text-align: center;
        img {
          width: 120rpx;
          height: 75rpx;
        }
        p {
          font-size: 20rpx;
          color: #333;
          margin-top: 20rpx;
        }
      }
    }
  }
}
</style>