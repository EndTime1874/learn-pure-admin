import Antdesign from "@/assets/svg/antdesign.svg?component";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/antd",
  component: Layout,
  meta: {
    title: "Antd｜组件",
    icon: Antdesign
  },
  children: [
    {
      path: "/antd/form/menu1",
      component: () => import("@/views/antd/form/demo/index.vue"),
      name: "AntdForm",
      meta: {
        title: "Antd表单"
      }
    },
    {
      path: "/antd/form/menu2",
      component: () => import("@/views/antd/form/demo/index.vue"),
      name: "AntdForm2",
      meta: {
        title: "Antd-菜单2"
      }
    }
  ]
};
