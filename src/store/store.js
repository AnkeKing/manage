import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';
import createPersistedState from "vuex-persistedstate"
// import {
//     getPersonalData, getPersonalDataSecond,
//     getGoodsColl, getGoodsDetail, getShopCarData, searchGoodsList, dealerColl,
//     addGoodsColl, delGoodsColl
// } from "../api/send";
Vue.use(Vuex)

const Store = new Vuex.Store({
    state: {
        loading: false,
        warnBool:false,
        warnText:"",
        token: ""
    },
    getters: {
    },
    mutations: {
        setToken(state, token){
            state.token = token;
        },
        setLoading(state, bool) {
            state.loading = bool;
        },
        setWarning(state,obj) {
            state.warnBool = obj.bool;
            state.warnText = obj.text;
        },
    },
    actions: {
        showWarning(context,text){
            context.commit("setWarning",{bool:true,text:text});
            setTimeout(function(){
                context.commit("setWarning",{bool:false,text:""});
            },1777)
        }
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