import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';
import createPersistedState from "vuex-persistedstate"
import { getCategories, getCategoriesById, findAttributesById } from '../api/http';
Vue.use(Vuex)

const Store = new Vuex.Store({
    state: {
        loading: false,
        warnBool: false,
        warnText: "",
        token: ""
    },
    getters: {
        classifyArr: (state) => (selectedData) => {
            var classify = "";
            for (var s in selectedData) {
                if (s != selectedData.length - 1) {
                    classify += selectedData[s].cat_id + ",";
                } else {
                    classify += selectedData[s].cat_id;
                }
            }
            return classify;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setLoading(state, bool) {
            state.loading = bool;
        },
        setWarning(state, obj) {
            state.warnBool = obj.bool;
            state.warnText = obj.text;
        },

    },
    actions: {
        showWarning(context, text) {
            context.commit("setWarning", { bool: true, text: text });
            setTimeout(function () {
                context.commit("setWarning", { bool: false, text: "" });
            }, 1777)
        },
        //参数列表
        getCategoriesById({ dispatch }, obj) {
            return getCategoriesById({
                id: obj.id,
                sel: obj.sel
            }).then(res => {
                console.log("参数列表", res);
                return res;
            })
        },
        //根据ID查询参数
        findAttributesById({ dispatch }, obj) {
            return findAttributesById({
                id: obj.id,
                attrId: obj.attrId,
                attr_sel: obj.attr_sel,
                attr_vals: obj.attr_vals
            }).then(res => {
                console.log("查询参数", res);
                return res;
            })
        },
        //商品分类列表
        getCategories({ dispatch }, obj) {
            return getCategories({
                pagesize: obj.pagesize,
                pagenum: obj.pagenum, 
                type: obj.type
            }).then(res => {
                dispatch("FOR", res.result);
                return res;
            });
        },
        FOR({ dispatch }, newData) {
            for (var r in newData) {
                newData[r].label = newData[r].cat_name;
                newData[r].value = newData[r].cat_id;
                if (newData[r].cat_level === 0) {
                    newData[r].font_level = "一级";
                } else if (newData[r].cat_level === 1) {
                    newData[r].font_level = "二级";
                } else {
                    newData[r].font_level = "三级";
                }
                if (!newData[r].cat_deleted) {
                    newData[r].valid = "有效";
                } else {
                    newData[r].valid = "无效";
                }
                if (newData[r].children) {
                    dispatch("FOR", newData[r].children);
                }
            }

        }, //获取并处理多级联动选择的值
    },
    modules: {

    },
    plugins: [createPersistedState({
        reducer(val) {
            // console.log("val:",val);
            return {
                // 只储存state中的token 使vuex的token刷新不掉
                token: val.token,
            }
        }
    })],
})

export default Store