<!--
 * @Descripttion: 
 * @version: 
 * @Author: yuweiyuan
 * @Date: 2024-03-09 09:36:26
 * @LastEditors: yuweiyuan
 * @LastEditTime: 2024-03-09 15:28:13
-->
<script setup lang="ts">
import { computed, ref } from "vue";
import { useECharts } from "@pureadmin/utils";
import { dateFormat } from "../utils/tools";

const chartRef = ref();
const { setOptions } = useECharts(chartRef);

const props = defineProps({
  resultData: {
    type: Array,
    default: () => []
  },
  year: {
    type: String,
    default: ""
  }
});
const inlineData: any = computed(() => props.resultData);

// 根据配置项渲染ECharts
setOptions({
  backgroundColor: "#fff",
  title: {
    text: `${props.year} 年天梯情况分析`,
    textStyle: {
      rich: {
        a: {
          fontSize: 16,
          fontWeight: 600
        }
      }
    },
    left: "center",
    itemGap: 20,
    subtextStyle: {
      color: "#6C7B8A",
      fontSize: 16,
      fontWeight: 600
    }
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  legend: {
    top: "5%",
    right: "10%",
    icon: "circle"
  },
  grid: {
    left: 30,
    right: 30,
    top: 50,
    bottom: 50
  },
  yAxis: {
    type: "value"
    // interval: 2
  },
  xAxis: {
    type: "category",
    // data: ['2021-01', '2021-02']
    data: inlineData.value.map(m => m.dateDay)
  },
  color: ["#4474c4", "#ccc"],
  series: [
    {
      name: "win",
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: true,
        formatter: (params: any) => (params.value == 0 ? "" : params.value)
      },
      data: inlineData.value.map(m => m.win_count)
    },
    {
      name: "lose",
      type: "bar",
      stack: "total",
      barWidth: "60%",
      label: {
        show: true,
        formatter: (params: any) => (params.value == 0 ? "" : params.value)
      },
      data: inlineData.value.map(m => m.lose_count)
    }
  ]
});

const niceDayList = computed(() => {
  return inlineData.value
    .sort(
      (a, b) =>
        Number(a.lose_count) -
        Number(a.win_count) -
        (Number(b.lose_count) - Number(b.win_count))
    )
    .slice(0, 3)
    .sort((a, b) => a.date - b.date);
});

const allCount = computed(() => {
  return inlineData.value.reduce(
    (acc, cur) => {
      acc.all += Number(cur.count);
      acc.win += Number(cur.win_count);
      acc.lose += Number(cur.lose_count);
      return acc;
    },
    { all: 0, win: 0, lose: 0 }
  );
});
</script>

<template>
  <a-card :title="year + '年'" :bordered="false">
    <a-descriptions bordered class="pb-6" :column="2">
      <a-descriptions-item label="最佳状态" :span="4">
        <ul>
          <li v-for="day of niceDayList">
            <span class="label"
              >{{ day.dateCN }} {{ dateFormat(day.date, "dddd") }}</span
            ><a-divider type="vertical" />
            <a-tag color="green" :bordered="false"
              >胜 {{ day.win_count }} 场 </a-tag
            ><a-divider type="vertical" />
            <a-tag color="red" :bordered="false"
              >输 {{ day.lose_count }} 场</a-tag
            ><a-divider type="vertical" />
            <a-tag color="blue" :bordered="false"
              >净胜 {{ day.win_count - day.lose_count }} 场</a-tag
            >
            <!-- <a-divider/> -->
          </li>
        </ul>
      </a-descriptions-item>
      <a-descriptions-item label="胜场总数">{{
        allCount.win
      }}</a-descriptions-item>
      <a-descriptions-item label="净胜场总数">{{
        allCount.win - allCount.lose
      }}</a-descriptions-item>
      <a-descriptions-item label="败场总数">{{
        allCount.lose
      }}</a-descriptions-item>
      <a-descriptions-item label="总场数">{{
        allCount.all
      }}</a-descriptions-item>
    </a-descriptions>

    <div ref="chartRef" style="width: 100%; height: 50vh" />
  </a-card>
</template>

<style lang="scss" scoped>
.ant-card {
  margin: 24px;
}
.ant-tag {
  min-width: 55px;
  text-align: center;
}
:deep(.ant-descriptions-item-label) {
  width: 120px;
  text-align: center;
}

ul {
  li {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0px;
    }

    .label {
      display: inline-block;
      width: 170px;
      text-align: end;
      letter-spacing: 0.25px;
    }
  }
}
</style>
