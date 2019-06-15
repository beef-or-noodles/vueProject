import vue from 'vue'
import vuex from 'vuex'
import state from '../../vuex/state/state.js'
import getters from '../../vuex/getter/getter.js'
import mutations from '../../vuex/mutations/mutations.js'
import actions from '../../vuex/actions/actions.js'
import createPersistedState from "vuex-persistedstate" //添加持久化
vue.use(vuex);
export default new vuex.Store({
        state,
        mutations,
        getters,
        actions,
        plugins: [createPersistedState({
                storage: window.localStorage,
        })]
})
