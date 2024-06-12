<!--
 * @Descripttion: 
 * @version: 
 * @Author: yuweiyuan
 * @Date: 2024-03-09 08:39:14
 * @LastEditors: yuweiyuan
 * @LastEditTime: 2024-06-12 10:59:23
-->

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { regroupArr, dateFormat, compareDates } from "./utils/tools";
// import { dota2Data } from "./utils/mockData.js";
import basicDataOfDota2 from "./utils/yyy.json";
import dota2Bar from "./components/dota2Bar.vue";

onBeforeMount(() => {
  init();
});

const result = ref();

function init() {
  const arr = getData(basicDataOfDota2.calendar);
  const reduceYear = regroupArr(arr, "dateYear").map(yearData => yearData.sort(compareDates));
  result.value = reduceYear.reverse();

  // console.log("年份: ", reduceYear);
  // console.log("月份: ", regroupArr(arr, "dateMount"));
  // console.log("天: ", regroupArr(arr, "dateDay"));
  console.log("%c [ 处理后的数据 ] >>>", "color:#2656c9", result);
}

function getData(list) {
  return list
    .map(item1 => {
      const d = item1.data;
      return d
        .map(item2 => {
          if (item2.count) {
            return {
              ...item2,
              dateCN: dateFormat(item2.date, "YYYY年 MM月DD日"),
              dateYear: dateFormat(item2.date, "YYYY"),
              dateMount: dateFormat(item2.date, "YYYY-MM"),
              dateDay: dateFormat(item2.date, "MM-DD")
            };
          }
        })
        .filter(Boolean);
    })
    .flat();
}
</script>

<template>
  <div>
    <div v-for="d of result">
      <dota2Bar :resultData="d" :year="d[0].dateYear" />
    </div>
  </div>
</template>
