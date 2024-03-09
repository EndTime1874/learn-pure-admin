<!--
 * @Descripttion: 
 * @version: 
 * @Author: yuweiyuan
 * @Date: 2024-03-09 08:39:14
 * @LastEditors: yuweiyuan
 * @LastEditTime: 2024-03-09 12:39:14
-->

<script setup lang="ts">
import { regroupArr,dateFormat, compareDates } from "./utils/tools" 
import { dota2Data } from "./utils/mockData.js" 
import dota2Bar from "./components/dota2Bar.vue";


function getData(list) {
  return list.map((item1) => {
    const d = item1.data
    return d.map((item2) => {
      if (item2.count) {
        return {
          ...item2,
          dateCN: dateFormat(item2.date, 'YYYY年MM月DD日'),
          dateYear: dateFormat(item2.date, 'YYYY'),
          dateMount: dateFormat(item2.date, 'YYYY-MM'),
          dateDay: dateFormat(item2.date, 'MM-DD'),
        }
      }
    }).filter(Boolean)
  }).flat()
}



const arr = getData(dota2Data)
const reduceYear = regroupArr(arr, 'dateYear').map(yearData => yearData.sort(compareDates));
const reverseYear = reduceYear.reverse()

console.log('年份: ', reduceYear);
console.log('月份: ', regroupArr(arr, 'dateMount'));
console.log('天: ', regroupArr(arr, 'dateDay'));

</script>

<template>
    <!-- result: {{result}} -->
    <div v-for="d of reverseYear">
      <dota2Bar :resultData="d" :year="d[0].dateYear"/>
    </div>
</template>

<style lang="scss" scoped>

</style>