<template>
  <div>
    <div class="address-wrapper">
      <div class="address"
           v-if="address">
        <div class="receiver">
          <p class="name">收货人：{{address.userName}}</p>
          <p class="phone-num">{{address.telNumber}}</p>
          <span class="iconfont icon-arrow-right"></span>
        </div>
        <p class="address-txt">收货地址：{{address.provinceName}}{{address.cityName}}{{address.countyName}}{{address.detailInfo}}</p>
      </div>
      <!-- 选择地址 -->
      <div class="choose-address"
           v-else
           @click="getAddress">
        <p>请选择地址</p>
        <span class="iconfont icon-arrow-right"></span>
      </div>
      <div class="flower">
        <img src="/static/images/cart_border@2x.png">
      </div>
    </div>

    <!-- 购买信息 -->
    <div class="cart-info">
      <div class="title">
        <span class="iconfont icon-shop"></span>
        <span>优购生活馆</span>
      </div>
      <ul>
        <li v-for="(item,a) in cartInfo"
            :key="item.goods_id">
          <span class="iconfont"
                :class="goodsObj[item.goods_id].checked?'icon-checked':'icon-unchecked'"
                @click="goodsObj[item.goods_id].checked=!goodsObj[item.goods_id].checked"></span>
          <div class="main">
            <img :src="item.goods_small_logo"
                 alt="">
            <div class="name-price-num">
              <p>{{item.goods_name}}</p>
              <div class="price-num">
                <p class="price"><span>￥</span>{{item.goods_price}}</p>
                <div class="num">
                  <div class="sub">+</div>
                  <span>{{goodsObj[item.goods_id].num}}</span>
                  <div class="add">-</div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 结算 -->
    <div class="total-price-wrapper">
      <div class="select-all">
        <span class="iconfont icon-checked"></span>
        <span class="select-all-label">全选</span>
      </div>
      <div class="info">
        <p class="total-price">合计： <span>￥{{totalPrice}}.00</span></p>
        <p class="notice">包含运费</p>
      </div>
      <div class="total-btn">结算(3)</div>
    </div>

  </div>
</template>
 
<script>

import request from '../../utils/request'
const ADDRESS_KEY = 'address'
export default {
  data () {
    return {
      address: wx.getStorageSync(ADDRESS_KEY),
      goodsObj: wx.getStorageSync('cart'),
      cartInfo: []
    }
  },
  onShow () {
    this.goodsObj = wx.getStorageSync('cart')
    console.log('onload')
    this.getCartInfo(Object.keys(this.goodsObj).join(','))
  },
  methods: {
    getAddress () {
      wx.chooseAddress({
        success: (res) => {
          console.log(res)
          this.address = res
          wx.setStorageSync(ADDRESS_KEY, res)
        }
      })
    },
    getCartInfo (ids) {
      request({
        url: `/api/public/v1/goods/goodslist?goods_ids=${ids}`
      }).then(res => {
        let { meta, message } = res.data
        console.dir(message)
        if (meta.status === 200) {
          this.cartInfo = message
        }
      })
    }
  },
  computed: {
    totalPrice () {
      let price = 0
      this.cartInfo.forEach(v => {
        price += v.goods_price * this.goodsObj[v.goods_id].num
      })
      return price
    }
  }
}
</script>

<style lang="less">
page {
  background-color: #f4f4f4;
}
.address-wrapper {
  background-color: #fff;
}

.address {
  display: flex;
  flex-direction: column;
  padding: 44rpx 30rpx 48rpx 20rpx;
  .receiver {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50rpx;
    position: relative;
    .phone-num {
      margin-right: 40rpx;
    }
    .icon-arrow-right {
      position: absolute;
      top: 8rpx;
      right: 0;
      color: #999;
    }
  }
}

.choose-address {
  display: flex;
  padding: 44rpx 30rpx 48rpx 20rpx;
  justify-content: space-between;
  .icon-arrow-right {
    color: #999;
  }
}

.flower {
  img {
    height: 16rpx;
    width: 100%;
    display: block;
  }
}

.icon-checked,
.icon-unchecked {
  color: #eb4450;
  font-size: 40rpx;
}

.cart-info {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    height: 86rpx;
    line-height: 86rpx;
    color: #333;
    border-bottom: 1rpx solid #ddd;
    padding-left: 30rpx;
    .icon-shop {
      color: #999;
      margin-right: 10rpx;
    }
  }
  ul {
    padding: 0 20rpx 0 30rpx;
    li {
      height: 208rpx;
      display: flex;
      align-items: center;

      .main {
        flex: 1;
        margin-left: 30rpx;
        height: 100%;
        border-bottom: 1rpx solid #ddd;
        display: flex;
        align-items: center;
        img {
          width: 116rpx;
          height: 160rpx;
        }
        .name-price-num {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24rpx 0 20rpx 40rpx;
          .price-num {
            display: flex;
            margin-top: 40rpx;
            align-items: flex-end;
            justify-content: space-between;
          }
          .num {
            display: flex;
            align-items: center;
            span {
              margin: 0 30rpx;
            }
            .sub,
            .add {
              width: 60rpx;
              height: 50rpx;
              border: 4rpx solid #666;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #666;
            }
          }
          .price {
            color: #eb4450;
            span {
              font-size: 20rpx;
            }
          }
        }
      }
    }
  }
}

.total-price-wrapper {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98rpx;
  display: flex;
  align-items: center;
  .select-all {
    flex: 1;
  }
  .icon-right {
    margin: 0 30rpx;
  }
  .total-price span {
    color: #eb4450;
  }
  .notice {
    color: #a6a6a6;
  }
  .total-btn {
    width: 230rpx;
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eb4450;
    margin-left: 20rpx;
  }
}
</style>