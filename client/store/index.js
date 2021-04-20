export const state = () => ({
    user: process.server ? '' : !!localStorage.getItem('user'),
    errors: "",
    headerInfo: "",
});

//getters
export const getters = {
    getUser: state => {
        return state.user;
    },
    getErrors: state => {
        return state.errors;
    },

    getHeaderInfo: state => {
        return state.headerInfo;
    }
}

//actions async
export const actions = {
    async login(context, payload) {

        const user = await this.$api.post('/Users/login', { ...payload });

        context.commit('setLoginUser', { ...user.data });
    },
    async signup(context, payload) {
        context.commit('setSignupUser', await this.$api.post('/Users', { ...payload }));

    },
    async error(context, payload) {
        context.commit('setError', payload)
    },
    logout(context) {
        context.commit('setLogout');
    }

}

//mutation sync
export const mutations = {
    setLoginUser(state, user) {

        state.user = user;
        localStorage.setItem('user', user);
        if (!process.server) { localStorage.setItem('user', user); }
        this.$router.replace('/user');
    },
    setSignupUser(state, user) {
        swal("sign up successfully login to your new account");
    },
    setLogout(state) {
        if (!process.server) { localStorage.setItem('user', ""); }
        state.user = "";
        state.headerInfo = "";

    },
    setError(state, error) {
        state.errors = error;
    },
    setHeaderInfo(state, user) {
        state.headerInfo = user;
    }

}