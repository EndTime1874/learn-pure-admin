import piechart from "@/assets/svg/antdesign.svg?component";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/echart",
  component: Layout,
  meta: {
    title: "Echart｜图表",
    icon: piechart
  },
  children: [
    {
      path: "/echart/bar",
      component: () => import("@/views/echart/bar/index.vue"),
      name: "EchartBar",
      meta: {
        title: "柱状图"
      }
    },
    {
      path: "/echart/pie",
      component: () => import("@/views/echart/pie/index.vue"),
      name: "EchartPie",
      meta: {
        title: "饼图"
      }
    }
  ]
};
