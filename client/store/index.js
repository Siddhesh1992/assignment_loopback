export const state = () => ({
    user: "",
    errors: "",
});

//getters
export const getters = {
    getUser: state => {
        return state.user;
    },
    getErrors: state => {
        return state.errors;
    }
}

//actions async
export const actions = {
    async login(context, payload) {

        const user = await this.$api.post('/Users/login', { ...payload });

        const { id, userId } = user.data;

        const userDet = await this.$api.get(`/Users/${userId}?access_token=${id}`);

        context.commit('setLoginUser', { ...userDet.data, ...user.data });
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
        this.$router.replace('/user');
    },
    setSignupUser(state, user) {
        state.user = user;

    },
    setLogout(state) {
        state.user = "";

    },
    setError(state, error) {
        state.errors = error;
    }

}