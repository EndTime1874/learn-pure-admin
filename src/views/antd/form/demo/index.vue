<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { message } from "ant-design-vue";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined
} from "@ant-design/icons-vue";

import { SelfForm } from "@/views/antd/form/Form";
import type { FormItem } from "@/views/antd/form/types";

defineOptions({
  name: "AntdForm"
});

/* -----------------------------------------------------------------------------
 * 案例一、二
 * -----------------------------------------------------------------------------*/

const selectOpt = reactive<Record<string, any>>({
  list1: [
    { name: "类型一", key: "key1" },
    { name: "类型二", key: "key2" }
  ],
  list2: [],
  list3: []
});

class InitFormState {
  title = "";
  status = "";
  xxId = undefined;
  _Date1 = undefined;
  _Date2 = undefined;
}

const selfForm = ref();
const listLoading = ref(false);
const formState = reactive(new InitFormState());
const formItems = reactive<any[]>([
  {
    type: "radioGroup",
    sort: 1,
    colConfig: { span: 8 },
    formItemConfig: { label: "状态", name: "status" },
    compConfig: {
      options: [
        { label: "全部", value: "" },
        { label: "已保存", value: "save" },
        { label: "已退回", value: "back" }
      ]
    }
  },
  {
    type: "input",
    sort: 2,
    colConfig: { span: 8 },
    formItemConfig: { label: "标题", name: "title" },
    compConfig: {}
  },
  {
    type: "select",
    sort: 3,
    colConfig: { span: 8 },
    defaultHide: true,
    formItemConfig: { label: "类型", name: "xxId" },
    compConfig: {
      fieldNames: {
        label: "name",
        value: "key"
      },
      options: computed(() => selectOpt.list1)
    }
  },
  {
    type: "rangePicker",
    sort: 4,
    colConfig: { span: 8 },
    defaultHide: true,
    formItemConfig: { label: "公开日期", name: "_Date1" },
    compConfig: {}
  },
  {
    type: "rangePicker",
    sort: 5,
    colConfig: { span: 8 },
    defaultHide: true,
    formItemConfig: { label: "截止日期", name: "_Date2" },
    compConfig: {}
  }
]);

function getList() {
  listLoading.value = true;
  setTimeout(() => {
    listLoading.value = false;
  }, 500);
}

function handleSearch() {
  getList();
}

function handleReset() {
  selfForm.value.resetForm(new InitFormState());
  getList();
}

/* -----------------------------------------------------------------------------
 * 案例三
 * -----------------------------------------------------------------------------*/
class InitFormState2 {
  state = "";
  title = "";
  createName = "小李";
  createTime = undefined;
  endDate = undefined;
}

const formRef = ref();
const confirmLoading = ref(false);
const formRules = ref({
  title: [{ required: true, message: "请输入标题" }],
  createName: [{ required: true, message: "请输入创建人名称" }],
  createTime: [{ required: true, message: "请选择创建时间" }],
  endDate: [{ required: true, message: "请选择截止日期" }],
  state: [{ required: true, message: "请选择状态" }]
});
const formData = reactive<Record<string, any>>(new InitFormState2());
const formItems2 = reactive<FormItem[]>([
  {
    type: "input",
    sort: 1,
    colConfig: { span: 23 },
    formItemConfig: {
      label: "标题",
      name: "title",
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    },
    compConfig: {}
  },
  {
    type: "radioGroup",
    sort: 2,
    colConfig: { span: 24 },
    formItemConfig: {
      label: "状态",
      name: "state",
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    },
    compConfig: {
      options: [
        { label: "是", value: "0" },
        { label: "否", value: "1" }
      ]
    }
  },
  {
    type: "datePicker",
    sort: 3,
    colConfig: { span: 12 },
    defaultHide: false,
    formItemConfig: { label: "创建日期", name: "createTime" },
    compConfig: {}
  },
  {
    type: "datePicker",
    sort: 4,
    colConfig: { span: 12 },
    formItemConfig: { label: "截止日期", name: "endDate" },
    compConfig: {
      showTime: true,
      format: "YYYY-MM-DD hh:mm:ss",
      valueFormat: "YYYY-MM-DD hh:mm:ss"
    }
  },
  {
    type: "input",
    sort: 5,
    colConfig: { span: 12 },
    formItemConfig: { label: "创建人", name: "createName" },
    compConfig: {}
  }
]);

const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    confirmLoading.value = true;
    await onSubmit();
  } catch (err) {
    message.error("检验不通过！");
  } finally {
    confirmLoading.value = false;
  }
};
const handleReset2 = () => {
  formRef.value.resetForm();
};

function onSubmit() {
  return new Promise(resolve => {
    setTimeout(() => {
      message.info("提交成功");
      resolve("提交成功");
    }, 1000);
    // try {
    //   const params = {
    //     id: route.query.id as string,
    //   }
    //   Object.assign(params, formData)
    //
    //   // await 请求Api(params)
    //   message.info('提交成功')
    //   resolve('提交成功')
    // } catch (e) {
    //   reject('提交失败')
    // }
  });
}
</script>

<template>
  <div class="app-container">
    <aside class="p-4 mb-8 border-2 border-blue-300">
      <span class="text-blue-300">第一种：列表｜模式一</span>
      <SelfForm
        ref="selfForm"
        :model="formState"
        :formItems="formItems"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      />
    </aside>

    <aside class="p-4 mb-8 border-2 border-blue-400">
      <span class="text-blue-400">第二种：列表｜模式二</span>
      <SelfForm
        ref="selfForm"
        :model="formState"
        :formItems="formItems"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      >
        <template #next-form>
          <div class="table-operations">
            <a-button class="mr-2" type="primary">
              <PlusOutlined />
              新增
            </a-button>
            <a-button
              class="mr-2"
              type="primary"
              style="background-color: #f39c12"
            >
              <UploadOutlined />
              上传
            </a-button>
            <a-button type="primary" danger>
              <DeleteOutlined />
              批量删除
            </a-button>
          </div>
        </template>
      </SelfForm>

      <a-spin :spinning="listLoading">
        <section class="list">假装我是一个表格</section>
      </a-spin>
    </aside>

    <aside class="p-4 border-2 border-amber-400">
      <span class="text-amber-400">第三种：详情页｜表单模式</span>
      <SelfForm
        ref="formRef"
        :model="formData"
        :formItems="formItems2"
        :rules="formRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        :showButtons="false"
      />

      <div class="text-center">
        <a-button
          class="mr-2"
          type="primary"
          :loading="confirmLoading"
          @click="handleSubmit"
          >提交
        </a-button>
        <a-button @click="handleReset2">重置</a-button>
      </div>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
hr {
  color: #eee;
}

.list {
  display: grid;
  place-content: center;
  height: 200px;
  margin-top: 12px;
  background-color: #ecf0f1;
}
</style>
