<template>
  <section class="sixty-box">
    <div v-for="(item, index) in list" :key="index" class="item-container">
      <div class="flex-col">
        <!-- <p class="cell">{{ index  }}</p> 0 年 1 月 3 日 返回中文 -->

        <p class="cell" :style="{ color: getColor('天干', item.天干) }">{{ item.天干 }}</p>
        <p class="cell" :style="{ color: getColor('地支', item.地支) }">{{ item.地支 }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: any[];
}>();

const sixtyInfo = {
  天干: [
    { label: "甲", color: "#6be553" }, // 木，绿色
    { label: "乙", color: "#6be553" }, // 木，绿色
    { label: "丙", color: "#c6382f" }, // 火，红色
    { label: "丁", color: "#c6382f" }, // 火，红色
    { label: "戊", color: "#82562b" }, // 土，土色
    { label: "己", color: "#82562b" }, // 土，土色
    { label: "庚", color: "#ffb300" }, // 金，金色
    { label: "辛", color: "#ffb300" }, // 金，金色
    { label: "壬", color: "#0288d1" }, // 水，蓝色
    { label: "癸", color: "#0288d1" } // 水，蓝色
  ],
  地支: [
    { label: "子", color: "#0288d1" }, // 水，蓝色
    { label: "丑", color: "#82562b" }, // 土，土色
    { label: "寅", color: "#6be553" }, // 木，绿色
    { label: "卯", color: "#6be553" }, // 木，绿色
    { label: "辰", color: "#82562b" }, // 土，土色
    { label: "巳", color: "#c6382f" }, // 火，红色
    { label: "午", color: "#c6382f" }, // 火，红色
    { label: "未", color: "#82562b" }, // 土，土色
    { label: "申", color: "#ffb300" }, // 金，金色
    { label: "酉", color: "#ffb300" }, // 金，金色
    { label: "戌", color: "#82562b" }, // 土，土色
    { label: "亥", color: "#0288d1" } // 水，蓝色
  ]
};

const getColor = (type: "天干" | "地支", value: string) => {
  const list = type === "天干" ? sixtyInfo["天干"] : sixtyInfo["地支"];
  const item = list.find(item => item.label === value);
  return item?.color || "transparent";
};

const formatDate = (index: number) => {
  const year = Math.floor(index / 12);
  const month = (index % 12) + 1;
  return `${year}年${month}月`;
};
</script>

<style scoped lang="scss">
.sixty-box {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.item-container {
  .flex-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .cell {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-weight: bold;
    font-size: 16px;

    box-shadow: 0 2px 8px 0 rgba(77, 79, 168, 0.12);
    border-radius: 8px;
    background: #fff;
  }
}
</style>
