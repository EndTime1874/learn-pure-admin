# Antd-Form

### 使用方式

```html
<!-- html使用方式 -->
<SelfForm
  ref="formRef"
  :model="formState"
  :formItems="formItems"
  :label-col="{ span: 6 }"
  :wrapper-col="{ span: 18 }"
  @handleSearch="handleSearch"
  @handleReset="handleReset"
/>
```

### 配置

```javascript
formItems = [
  {
    type: "input", // 组件类型
    sort: 1, // 排序，放在第几个位置
    defaultHide: true, // 是否隐藏，默认显示（根据需求自己显示出来）
    colConfig: { span: 6 }, // a-col配置
    formItemConfig: { label: "名称", name: "username" }, // a-form-item 配置
    compConfig: { onPressEnter: myPressEnter } // 组件配置
  }
];
```

<hr />

组件事件的传递，通过将事件传入组件配置里面  
compConfig: { 'on' + ' antd 文档的事件 ': '自定义的事件' }  
例如：`compConfig: { onClick: hanldeClick }`

<hr/>

组件配置的插槽传递，也是如此  
例如：`compConfig: { suffix: MyComponent }`

<hr/>

同时也支持自定义的组件

- h 渲染函数用法: https://cn.vuejs.org/guide/extras/render-function.html#built-in-components

```text
// 方式一： 在getComponent里面添加一个自定义组件
function getComponent(opt: FormItem, model: any) {
  const itemConfig = opt.formItemConfig as FormItemConfig;
  const compConfig = opt.compConfig as CompConfig;

  switch (opt?.type) {

    case "myComponent":
      return (
        <MyComponent
           v-model:modelValue={model[itemConfig.name]}
           {...compConfig}
        />
      )
    ......
    default:
      throw new Error("未知的表单类型");
      break;
  }
}


// 方式二： 使用插槽的方式

{
  type: 'slot',
  sort: 1,
  colConfig: { span: 24 },
  formItemConfig: { label: '自定义下拉框', name: 'photo' },
  slot: h(MyComponent, {
    modelValue: computed(() => formState.returnReason),
    'onUpdate:modelValue': (value: any) => {
      formState.returnReason = value // @todo 为什么清空文字，不会校验？
    }
  })
}
```

```vue
MyComponent组件：

<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";

const props = defineProps<{
  modelValue: any;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", newValue: any): void;
}>();

const internalValue = ref();
watchEffect(() => {
  internalValue.value = props.modelValue.value;
});

watch(internalValue, val => {
  emit("update:modelValue", val);
});

const selectList = ref([
  { label: "错误原因：错别字太多", value: "1" },
  { label: "错误原因：唱歌太好听", value: "2" },
  { label: "错误原因：跑步太快", value: "3" }
]);
const handleChange = (_: string, info: any) => {
  internalValue.value = info.label;
};
</script>

<template>
  <a-select value="错误原因" :options="selectList" @change="handleChange" />

  <!-- 选择错误原因后，自动回填到输入框 -->

  <a-textarea
    v-model:value="internalValue"
    placeholder="请输入"
    :auto-size="{ minRows: 3, maxRows: 8 }"
  />
</template>
```

### 提交&重置

```typescript
// 保存
async function handleSubmit() {
  try {
    await formRef.value.validate(); // 校验表单项
    loading.value = true;
    await onSubmit(); // 请求提交
  } catch (err) {
    message.error("检验不通过！");
  } finally {
    loading.value = false;
  }
}

function onSubmit() {
  return new Promise(resolve => {
    setTimeout(() => {
      message.info("提交成功");
      resolve("ok");
    }, 1000);
  });
}
```

```typescript
// 重置
const handleReset = () => {
  formRef.value.resetForm();
};
```
