/* 公共引入,勿随意修改,修改时需经过确认 */
import Vue from "vue";
import "./element";
import "./support";
import "@/styles/vab.scss";
import vab from "@/utils/vab";
import "@/remixIcon";
import "@/colorfulIcon";
import "@/config/permission";
import "@/utils/errorLog";
import "./f12";
import permission from "@/directive/permission";
import "./vabIcon";
import VabQueryForm from "@/components/VabQueryForm";
import VabQueryFormTopPanel from "@/components/VabQueryForm/VabQueryFormTopPanel";
import VabQueryFormBottomPanel from "@/components/VabQueryForm/VabQueryFormBottomPanel";
import VabQueryFormLeftPanel from "@/components/VabQueryForm/VabQueryFormLeftPanel";
import VabQueryFormRightPanel from "@/components/VabQueryForm/VabQueryFormRightPanel";

Vue.use(permission);
Vue.use(vab);

Vue.component("vab-query-form", VabQueryForm);
Vue.component("vab-query-form-left-panel", VabQueryFormTopPanel);
Vue.component("vab-query-form-right-panel", VabQueryFormBottomPanel);
Vue.component("vab-query-form-top-panel", VabQueryFormLeftPanel);
Vue.component("vab-query-form-bottom-panel", VabQueryFormRightPanel);
