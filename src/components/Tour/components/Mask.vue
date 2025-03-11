<script setup>
defineProps({
  pos: {
    type: Object,
    default: null // 取引导卡片指向的元素 { top, left, width, height, radius }
  },
  fill: {
    type: String,
    default: "rgba(0, 0, 0, 0.6)" // 蒙层颜色
  },
  animated: {
    type: Boolean,
    default: true // 是否有动画
  }
});

const emit = defineEmits(["close"]);

// 生成一个唯一的 mask ID，防止多个组件冲突
const maskId = `highlight-mask-${Math.random().toString(36).substring(2, 10)}`;
</script>

<template>
  <teleport to="body">
    <!-- 使用 SVG + mask 完美挖空 -->
    <div class="highlight-mask" @click.self="emit('close')">
      <svg width="100vw" height="100vh">
        <defs>
          <mask :id="maskId">
            <!-- 完整白色背景 -->
            <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
            <!-- 挖空高亮区域（黑色区域会被透明化） -->
            <rect
              v-if="pos"
              :x="pos.left"
              :y="pos.top"
              :width="pos.width"
              :height="pos.height"
              :rx="pos.radius || 0"
              fill="black"
              :class="{ animated: animated }"
            />
          </mask>
        </defs>
        <!-- 遮罩层，应用 mask -->
        <rect x="0" y="0" width="100%" height="100%" :fill="fill" :mask="`url(#${maskId})`" />
      </svg>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.highlight-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  // pointer-events: none; /* 让鼠标可以穿透遮罩层 */
}
</style>
