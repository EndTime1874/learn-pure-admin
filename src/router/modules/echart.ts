import piechart from "@/assets/svg/antdesign.svg?component";
import dota2Icon from "@/assets/svg/dota2.svg";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/echart",
  component: Layout,
  meta: {
    title: "暂存",
    icon: piechart
  },
  children: [
    {
      path: "/echart/bar",
      component: () => import("@/views/echart/bar/index.vue"),
      name: "EchartBar",
      meta: {
        title: "Dota2 数据统计",
        icon: dota2Icon
      }
    },
    {
      path: "/echart/pie",
      component: () => import("@/views/echart/pie/index.vue"),
      name: "EchartPie",
      meta: {
        title: "工具集"
      }
    }
  ]
};
