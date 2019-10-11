<template>
  <div>
    <span class="detail">{{isFolder?subContent:content}}</span>
    <a href=""
       @click.prevent="handleFolder">{{isFolder?'展开':'收起'}}</a>
  </div>

</template>

<script>
export default {
  data () {
    return {
      content: '刘德华（Andy Lau），1961年9月27日出生于中国香港，籍贯广东新会 [1]  ，中国香港男演员、歌手、作词人、制片人。1981年出演电影处女作《彩云曲》 [2]  。1983年主演的武侠剧《神雕侠侣》在香港获得62点的收视纪录 [3-4]  。1991年创办天幕电影公司 [5]  。1992年，凭借传记片《五亿探长雷洛传》获第11届香港电影金像奖最佳男主角提名 [6]  。1994年担任剧情片《天与地》的制片人 [7]  。2000年凭借警匪片《暗战》获第19届香港电影金像奖最佳男主角奖 [8]  。2004年凭借警匪片《无间道3：终极无间》获第41届台湾金马奖最佳男主角奖 [9]  。2005年获得香港UA院线颁发的全港最高累积票房香港男演员”奖 [10]  。2006年获得釜山国际电影节亚洲最有贡献电影人奖 [11]  。2011年主演剧情片《桃姐》，并凭借该片获台湾金马奖最佳男主角奖、香港电影金像奖最佳男主角奖 [12]  ；担任第49届台湾电影金马奖评审团主席 [13]  。2017年主演警匪动作片《拆弹专家》 [14]  ；获世界杰出华人奖。 [15]',
      subContent: '',
      isFolder: true
    }
  },
  created () {
    this.subContent = this.content.substr(0, 82)
  },
  methods: {
    handleFolder () {
      this.isFolder = !this.isFolder
    }
  },
}
</script>

<style>
.detail {
  font-size: 30rpx;
}
a {
  display: inline-block;
  color: green;
  margin-left: 10rpx;
}
</style>