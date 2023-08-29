/*
 * @Description: 自定义表单组件
 * @Author: yyy
 * @Date: 2023-07-27 10:44:48
 * @LastEditors: yyy
 * @LastEditTime: 2023-08-03 11:14:03
 */

import { defineComponent, ref, type PropType } from "vue";
import type { FormItem, CompConfig, FormItemConfig } from "./types";
import {
  SearchOutlined,
  RedoOutlined,
  UpOutlined,
  DownOutlined
} from "@ant-design/icons-vue";

export const SelfForm = defineComponent({
  name: "SelfForm",
  props: {
    formItems: {
      type: Array as PropType<FormItem[]>,
      required: true
    },
    // a-row的布局参数
    rowOptions: {
      type: Object
    }
  },
  setup(props, { attrs, slots, emit }) {
    const formRef = ref();
    const expand = ref(false);

    // console.log(
    //   '%c SelfForm ---> props ',
    //   'color:#fff; background-color: #3498db',
    //   props
    // )
    console.log(
      "%c SelfForm ---> attrs ",
      "color:#fff; background-color:#2ecc71",
      attrs
    );
    // console.log(
    //   '%c SelfForm ---> slots ',
    //   'color:#fff; background-color:#2ecc71',
    //   slots
    // )

    const validate = () => {
      return formRef.value.validate();
    };
    const resetForm = (defaultValue: any) => {
      for (const key in attrs.model as any) {
        delete attrs.model[key];
      }
      Object.assign(attrs.model, defaultValue);

      if (attrs && attrs.rules) {
        // 默认不使用antd的重置，因为元素隐藏的时候无法重置
        formRef.value.resetFields();
      }
    };

    const createSearchBtn = () => {
      const hasMore = props.formItems.filter(f => f.defaultHide);

      return (
        <a-col
          md={(!expand.value && 6) || 24}
          sm={24}
          style={{
            ...(expand.value && { "text-align": "right", overflow: "hidden" }),
            "padding-top": "4px"
          }}
        >
          <a-button type="primary" onclick={() => emit("handleSearch")}>
            <SearchOutlined />
            搜索
          </a-button>

          <a-button
            style={{ margin: "0 8px" }}
            onclick={() => emit("handleReset")}
          >
            <RedoOutlined />
            重置
          </a-button>

          {hasMore.length ? (
            <a
              style="font-size: 12px"
              onClick={() => {
                expand.value = !expand.value;
              }}
            >
              {!expand.value ? "展开" : "收起"}
              {expand.value ? <UpOutlined /> : <DownOutlined />}
            </a>
          ) : (
            ""
          )}
        </a-col>
      );
    };

    const createCol = (custom: FormItem, index: number) => {
      return (
        <a-col {...(custom.colConfig || { span: 24 })}>
          <a-form-item key={index} {...custom.formItemConfig}>
            {getComponent(custom, attrs.model)}
          </a-form-item>
        </a-col>
      );
    };

    return {
      expand,
      formRef,
      validate,
      resetForm,
      createFrom: () => {
        return (
          <>
            <a-form ref="formRef" {...attrs}>
              {slots["prev-form"]?.()}

              <a-row gutter={24} {...props.rowOptions}>
                {slots.default
                  ? slots.default()
                  : props?.formItems
                      .sort((a, b) => a.sort - b.sort)
                      .map(item => {
                        return !item.defaultHide
                          ? createCol(item, item.sort)
                          : expand.value && createCol(item, item.sort);
                      })}

                {slots["btn-form"]?.() ||
                  attrs.showButtons === false ||
                  createSearchBtn()}
              </a-row>

              {slots["next-form"]?.()}
            </a-form>
          </>
        );
      }
    };
  },
  render() {
    // 兼容驼峰命名法(camelCase)和短横线命名法(kebab-case)
    return this.createFrom();
  }
});

function getComponent(opt: FormItem, model: any) {
  const itemConfig = opt.formItemConfig as FormItemConfig;
  const compConfig = opt.compConfig as CompConfig;
  // console.log('opt', opt)

  switch (opt?.type) {
    case "slot":
      return <slot>{opt?.slot || "自定义插槽"}</slot>;

    case "input":
      return (
        <a-input
          v-model:value={model[itemConfig.name]}
          placeholder={"请输入"}
          {...compConfig}
        />
      );
    case "textArea":
      return (
        <a-textarea
          v-model:value={model[itemConfig.name]}
          placeholder={"请输入"}
          autoSize={{ minRows: 4, maxRows: 10 }}
          {...compConfig}
        />
      );

    case "select":
      return (
        <a-select
          v-model:value={model[itemConfig.name]}
          allowClear
          placeholder={"请选择"}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
          {...compConfig}
        />
      );

    case "radioGroup":
      return (
        <a-radio-group v-model:value={model[itemConfig.name]} {...compConfig} />
      );

    case "datePicker":
      return (
        <a-date-picker
          v-model:value={model[itemConfig.name]}
          format={"YYYY-MM-DD"}
          value-format={"YYYY-MM-DD"}
          style={{ width: "100%" }}
          {...compConfig}
        />
      );

    case "rangePicker":
      return (
        <a-range-picker
          v-model:value={model[itemConfig.name]}
          format={"YYYY-MM-DD"}
          value-format={"YYYY-MM-DD"}
          style={{ width: "100%" }}
          {...compConfig}
        />
      );

    default:
      throw new Error("未知的表单类型");
      break;
  }
}
