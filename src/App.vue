<template>
  <el-config-provider :locale="elementLocale">
    <a-config-provider :locale="antLocale">
      <a-style-provider hash-priority="high" :transformers="[legacyLogicalPropertiesTransformer]">
        <router-view />
        <ReDialog />
      </a-style-provider>
    </a-config-provider>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import { legacyLogicalPropertiesTransformer } from "ant-design-vue";
import elementZhCn from "element-plus/lib/locale/lang/zh-cn";
import antZhCN from "ant-design-vue/es/locale/zh_CN";
import { ReDialog } from "@/components/ReDialog";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider,
    ReDialog
  },
  setup() {
    return {
      elementLocale: elementZhCn,
      antLocale: antZhCN,
      legacyLogicalPropertiesTransformer
    };
  }
});
</script>
