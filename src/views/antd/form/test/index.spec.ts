import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import Form from "../demo/index.vue";

// 引入elementui，不对全局的 Vue 构造函数注入任何东西。我们可以使用 createLocalVue 方法来存档它们：
// const localVue = createLocalVue()
// localVue.use(ElementUI)

describe("antd-form.vue", () => {
  // 由于在接下来的几个测试中都会用到同一个容器，所以仅需将vue挂载一次就可以了
  const wrapper = mount(Form, {
    // localVue
  });

  console.log("wrapper: ", wrapper);

  // 默认我们将使用async，await模式
  it("dialog pop", async () => {
    const dialog = wrapper.find(".el-dialog__wrapper"); // 拿到弹窗
    const openBtn = wrapper.findAll(".el-button").at(0); // 拿到触发弹窗显示的按钮

    expect(dialog.attributes().style).contain("display"); // 因为是elementui内部组件本有特性，这步可省略
    expect(wrapper.vm.$data.dialogFormVisible).to.be.eq(false); // 控制弹窗的变量初始值为false
    await openBtn.trigger("click"); // 触发按钮的单击事件
    expect(dialog.attributes().style).to.not.contain("display"); // 同上可省略
    expect(wrapper.vm.$data.dialogFormVisible).to.be.eq(true); // 控制弹窗的变量值是否变为true
  });

  // 对值的检查
  it("check value", async () => {
    const openBtn = wrapper.findAll(".el-button").at(0);
    await openBtn.trigger("click");

    // 模拟输入值
    await wrapper.setData({
      form: {
        name: "xiaomin",
        age: 30
      }
    });
    expect(typeof wrapper.vm.$data.form.name).to.be.eq("string"); // 判断输入的值是否输入成功，是否为提前设置的类型
    expect(typeof wrapper.vm.$data.form.age).to.be.eq("number"); // wrapper.vm.$data可拿到所有的变量
  });

  it("点击按钮后打开 Dialog", async () => {
    const button = wrapper.find("el-button");
    console.log("button", button);

    // 初始状态下对话框应该是隐藏的
    expect(wrapper.findComponent({ name: "ElDialog" }).isVisible()).toBe(false);

    await button.trigger("click"); // 模拟点击按钮
    expect(wrapper.vm.visible).toBe(true); // 确保对话框现在是显示的
  });

  it("点击 Cancel 按钮后关闭 Dialog", async () => {
    wrapper.setData({ visible: true });
    const cancelButton = wrapper.find(".dialog-footer el-button");

    await cancelButton.trigger("click");
    expect(wrapper.vm.visible).toBe(false);
  });
});

// function sum(a, b) {
//   return a + b
// }
//
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3)
// })

// All tests within this suite will be run in parallel
// describe.concurrent('suite', () => {
//   it('concurrent test 1', async ({ expect }) => {
//     /* ... */
//   })
//   it('concurrent test 2', async ({ expect }) => {
//     /* ... */
//   })
//   it.concurrent('concurrent test 3', async ({ expect }) => {
//     /* ... */
//   })
// })
