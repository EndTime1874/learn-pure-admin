<template>
  <div v-if="isTourActive">
    <!-- 遮罩层 -->
    <Mask v-if="showMask" :pos="targetPos" @close="showMask = false" />

    <!-- 引导框 -->
    <div v-if="currentStep" class="tour-popup" :style="popupStyle">
      <h3>{{ currentStep.title }}</h3>
      <p>{{ currentStep.content }}</p>
      <div class="tour-buttons">
        <button v-if="stepIndex > 0" @click="prevStep">上一步</button>
        <button v-if="stepIndex < steps.length - 1" @click="nextStep">下一步</button>
        <button v-if="stepIndex === steps.length - 1" @click="endTour">完成</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import Mask from "./components/Mask.vue";

const steps = ref([
  { el: "#step1", title: "欢迎", content: "这是第一个日期" },
  { el: "#step2", title: "功能介绍", content: "这里是一个重要功能" },
  { el: "#step3", title: "完成", content: "你已经学会使用这个功能了" }
]);
const isTourActive = ref(false);
const showMask = ref<Boolean>(true);
const stepIndex = ref(0);
const currentStep = computed(() => steps.value[stepIndex.value] || {});

// 动态添加步骤：
// steps.value.push({ el: '#newElement', title: '新功能', content: '这是新功能介绍' });

// 计算当前步骤的元素位置
const targetPos = computed(() => {
  const el = document.querySelector(currentStep.value?.el);
  if (!el) return {};
  const rect = el.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    width: rect.width,
    height: rect.height
  };
});

// 计算引导框的位置
const popupStyle = computed(() => {
  const el = document.querySelector(currentStep.value?.el);
  if (!el) return { top: "20px", left: "20px" };
  const rect = el.getBoundingClientRect();

  // 顶部固定导航栏高度
  // const headerHeight = document.querySelector(".fixed-header").offsetHeight;
  // const sidebarWidth = document.querySelector(".sidebar-container").offsetWidth;

  // return {
  //   top: `${rect.top + rect.height + window.scrollY - headerHeight}px`,
  //   left: `${rect.left + window.scrollX - sidebarWidth}px`
  // };
  return {
    top: `${rect.top + window.scrollY + 10}px`,
    left: `${rect.left + window.scrollX}px`
  };
});

// 下一步
const nextStep = () => {
  if (stepIndex.value < steps.value.length - 1) stepIndex.value++;
};
// 上一步
const prevStep = () => {
  if (stepIndex.value > 0) stepIndex.value--;
};
// 结束
const endTour = () => {
  isTourActive.value = false;
};

// 开始引导
const startTour = () => {
  isTourActive.value = true;
  stepIndex.value = 0;
  nextTick(() => window.scrollTo(0, 0)); // 确保视图正确
};

// 监听键盘事件（ESC 退出）
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") endTour();
};

onMounted(() => window.addEventListener("keydown", onKeyDown));
onUnmounted(() => window.removeEventListener("keydown", onKeyDown));

defineExpose({ startTour });
</script>

<style>
/* 引导框 */
.tour-popup {
  position: absolute;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 2001;
}

.tour-buttons {
  display: flex;
  gap: 10px;
  button {
    padding: 2px 6px;
  }
}
</style>
