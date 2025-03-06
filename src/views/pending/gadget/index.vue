<!--
 * @Descripttion: 
 * @version: 
 * @Author: yyy
 * @Date: 2024-03-09 15:32:25
 * @LastEditors: yyy
 * @LastEditTime: 2024-03-09 15:33:00
-->

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { addSixtyWordArray } from "@/views/pending/utils/tools";
import SixtyBox from "./components/SixtyBox.vue";

const activeKey = ref(["1"]);

watch(activeKey, val => {
  console.log(val);
});

const header1 = reactive({
  title: "查询天干地支",
  info: {
    date: "",
    dateWords: []
  }
});
const header2 = reactive({
  title: "header 2",
  info: {
    content: "内容...."
  }
});
const header3 = reactive({
  title: "header 3",
  info: {
    content: "header 3"
  }
});

function onChange(date) {
  console.log("%c [ date ] >>>", "color:#2656c9", date);
  header1.info.dateWords = date ? Object.values(addSixtyWordArray(date)) : [];
}
</script>

<template>
  <div>
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" :header="header1.title">
        <a-card title="查询天干地支" style="width: 300px">
          <a-date-picker
            v-model:value="header1.info.date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            allowClear
            @change="onChange"
          />

          <SixtyBox :list="header1.info.dateWords" class="mt-2" />
        </a-card>
      </a-collapse-panel>
      <a-collapse-panel key="2" :header="header2.title">
        {{ header2.info.content }}
      </a-collapse-panel>
      <a-collapse-panel key="3" :header="header3.title" collapsible="disabled"> </a-collapse-panel>
    </a-collapse>
  </div>
</template>
