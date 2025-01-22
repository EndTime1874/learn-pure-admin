import piechart from "@/assets/svg/antdesign.svg";
import dota2Icon from "@/assets/svg/dota2.svg";
import toolIcon from "@/assets/svg/tool.svg";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/pending",
  component: Layout,
  meta: {
    title: "暂存",
    icon: piechart
  },
  children: [
    {
      path: "/pending/dota2",
      component: () => import("@/views/pending/dota2/index.vue"),
      name: "Dota2Bar",
      meta: {
        title: "Dota2 数据统计",
        icon: dota2Icon
      }
    },
    {
      path: "/pending/gadget",
      component: () => import("@/views/pending/gadget/index.vue"),
      name: "PendingGadget",
      meta: {
        title: "工具集",
        icon: toolIcon
      }
    }
  ]
};
