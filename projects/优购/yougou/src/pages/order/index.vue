<template>
  <div class="container">
    <div class="header">
      <ul>
        <li :class="{active:index==activeIndex}"
            v-for="(item, index) in orderMenu"
            :key="index"
            @click="activeIndex=index">{{item}}</li>
      </ul>
    </div>

    <div class="content">
      <ul>
        <li v-for="(item, index) in orderList"
            :key="item.order_id">
          <div class="goods-info"
               v-for="(item2, index2) in item.goods"
               :key="item2.goods_id">
            <img :src="item2.goods_small_logo"
                 alt="">
            <div class="right">
              <p>{{item2.goods_name}}</p>
              <div class="price-num">
                <span class="price">￥{{item2.goods_price}}</span>
                <span class="num">x{{item2.goods_number}}</span>
              </div>
            </div>
          </div>
          <p class="total-price">
            共{{item.total_count}}件商品 总计：&yen;{{item.total_price}}(含运费0.00)
          </p>
          <div class="order">
            <span>订单号:{{item.order_number}}</span>
            <button type="primary">
              支付
            </button>
          </div>

        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      orderMenu: [
        '全部',
        '待付款',
        '待收货',
        '退款/退货'
      ],
      activeIndex: 0,
      orderList: []
    }
  },
  onLoad (options) {
    this.activeIndex = options.index || 0
    this.queryOrder()
  },
  methods: {
    queryOrder () {
      let token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({ url: '/pages/login/main' })
      }
      request({
        url: `/api/public/v1/my/orders/all?type=1`,
        method: 'GET',
        header: {
          'Authorization': token
        }
      }).then(res => {
        let { meta, message } = res.data
        console.log(message)
        if (meta.status === 200) {
          this.orderList = message.orders
        }
      })
    }
  }

}
</script>

<style lang="less">
.container {
  background-color: #f4f4f4;
}
.header {
  background-color: #fff;
  ul {
    display: flex;
    align-items: center;
    li {
      flex: 1;
      text-align: center;
      height: 100rpx;
      line-height: 100rpx;
      box-sizing: border-box;
      &.active {
        border-bottom: 12rpx solid #eb4450;
      }
    }
  }
}
.content {
  li {
    background-color: #fff;
    margin-top: 30rpx;
    padding: 0 20rpx;
    .goods-info {
      height: 260rpx;
      border-bottom: 1rpx solid #ddd;
      display: flex;
      align-items: center;

      img {
        width: 200rpx;
        height: 200rpx;
        margin-right: 26rpx;
        flex-shrink: 0;
      }
      .right {
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; // 控制多行的行数
          -webkit-box-orient: vertical;
        }
        .price-num {
          margin-top: 84rpx;
          display: flex;
          justify-content: space-between;
          .price {
            color: #eb4450;
          }
        }
      }
    }
    .total-price {
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 1rpx solid #ddd;
      text-align: right;
      color: #999;
    }
    .order {
      height: 88rpx;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        flex: 1;
        font-size: 14px;
      }
      button {
        width: 160rpx;
        height: 60rpx;
        line-height: 60rpx;
      }
    }
  }
}
</style>