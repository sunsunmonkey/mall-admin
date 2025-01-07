<template>
  <div class="hello">
    <a-avatar style="background-color: #1890ff" :size="60">{{
      state.userInfo.userAccount[0]
    }}</a-avatar>
    <div class="text-hello">你好！ {{ state.userInfo.userAccount }}</div>
  </div>
  <div class="text">pv uv 数据</div>
  <div style="background: #ececec; padding: 30px" class="data-card">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card>
          <a-statistic
            title="uv"
            :value="11.28"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card>
          <a-statistic
            title="pv"
            :value="9.3"
            :precision="2"
            suffix="%"
            class="demo-class"
            :value-style="{ color: '#cf1322' }"
          >
            <template #prefix>
              <arrow-down-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
  <div class="text">用户走势数据</div>
  <div id="chart" style="height: 500px"></div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  const chartDom = document.getElementById("chart");
  const myChart = echarts.init(chartDom);

  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [320, 432, 501, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
  };

  option && myChart.setOption(option);
});

const store = useStore();
const state = reactive({
  userInfo: store.state.login.userInfo,
});
</script>
<style scoped lang="less">
.text {
  font-size: 20px;
  margin-top: 20px;
}
.hello {
  display: flex;
  align-items: center;
  width: 250px;
  justify-content: space-around;
  margin-top: 20px;
  .text-hello {
    font-size: 20px;
  }
}
.data-card {
  margin-top: 20px;
}
</style>
