<template>
  <div class="container">
    <div class="header">
      <ul>
        <li :class="{active:index==activeIndex}"
            v-for="(item, index) in orderMenu"
            :key="index"
            @click="activeIndex=index">{{item.name}}</li>
      </ul>
    </div>

    <div class="content">
      <ul>
        <li>

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
        {
          name: '全部',
          id: 'allOrder'
        },
        {
          name: '待付款',
          id: 'prePay'
        },
        {
          name: '待收货',
          id: 'payed'
        },
        {
          name: '退款/退货',
          id: 'refund'
        }
      ],
      activeIndex: 0
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
        url: `/api/public/v1/my/orders/all?type=2`,
        method: 'GET',
        header: {
          'Authorization': token
        }
      }).then(res => {
        let { meta, message } = res.data
        console.log(message)
        if (meta.status === 200) {
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
      height: 102rpx;
      line-height: 102rpx;
      box-sizing: border-box;
      &.active {
        border-bottom: 12rpx solid #eb4450;
      }
    }
  }
}
.content {
  li {
    margin-top: 30rpx;
  }
}
</style>