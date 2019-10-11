<template>
  <div>
    <Search></Search>
    <div class="content">
      <div class="left">
        <div class="box">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>20</div>
        </div>
      </div>
      <div class="right">
        <div class="main"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../../components/search'

export default {
  components: {
    Search
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
    .box {
      height: 200%;
      width: 190rpx;
      background-color: blue;
    }
  }
  .right {
    background-color: #ccc;
    flex: 1;
    overflow: auto;
    .main {
      height: 200%;
      width: 90%;
      background-color: green;
    }
  }
}
</style>