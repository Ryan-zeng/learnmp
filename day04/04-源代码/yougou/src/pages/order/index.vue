<template>
  <div class="container">
    <ul class="address">
      <li>收货地址</li>
      <li>
        <div>
          {{address.telNumber}} {{address.userName}} 收
          <br>
          <br>
          {{detailAddr}}
        </div>
      </li>
    </ul>

    <ul class="goods-list">
      <li>购物清单</li>
      <li v-for="(item,a) in goodsList"
          :key="item.goods_id">
        <template v-if="item.checked">
          <img :src="item.goods_small_logo"
               alt="">
          <div class="right">
            <p class="name">
              {{item.goods_name}}
            </p>
            <p class="num_price">
              {{item.num}}*{{item.goods_price}}
            </p>
          </div>
        </template>
      </li>
    </ul>
    <ul>
      <li>
        <span>订单金额</span>
        <span>{{totalPrice}}</span>
      </li>
    </ul>

    <div class="bottom-fixed">
      微信支付
    </div>
  </div>
</template>
<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      address: [],
      cartObj: {},
      goodsList: [],
      order_num: ''
    }
  },
  onShow (options) {
    console.log(options)
    this.address = wx.getStorageSync('address')
    this.cartObj = wx.getStorageSync('cart')
    this.getGoodsList(Object.keys(this.cartObj).join(','))
    this.order_num = options.order_number
  },
  methods: {
    getGoodsList (ids) {
      request({
        url: `/api/public/v1/goods/goodslist?goods_ids=${ids}`
      }).then(res => {
        let { meta, message } = res.data
        console.dir(message)
        if (meta.status === 200) {
          message.forEach(v => {
            v = Object.assign(v, this.cartObj[v.goods_id])
            v.goods_price = v.goods_price.toFixed(2)
          })
          this.goodsList = message
        }
      })
    }
  },
  computed: {
    detailAddr () {
      if (!this.address) {
        return ''
      }
      return `${this.address.provinceName}${this.address.cityName}${this.address.countyName} ${this.address.detailInfo}`
    },
    totalPrice () {
      let price = 0
      this.goodsList.forEach(v => {
        if (v.checked) {
          price += v.goods_price * v.num
        }
      })
      return price.toFixed(2)
    }
  }
}
</script>

<style lang="less">
.container {
  background-color: #f4f4f4;
  ul {
    margin-bottom: 20rpx;
    background-color: #fff;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx;
      &:not(:last-child) {
        border-bottom: 1rpx solid #ddd;
      }
    }
    &.goods-list {
      img {
        width: 160rpx;
        height: 160rpx;
      }
      .right {
        margin-left: 40rpx;
        display: flex;
        flex-direction: column;
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; // 控制多行的行数
          -webkit-box-orient: vertical;
          margin-bottom: 40rpx;
        }
      }
    }
  }

  .bottom-fixed {
    position: absolute;
    height: 98rpx;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1aad19;
    color: #fff;
    line-height: 98rpx;
    text-align: center;
  }
}
</style>