import swal from 'sweetalert';

export default function ({ $axios, redirect, app, store }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json, */*'
            }
        }
    })

    // Set baseURL to something different
    api.setBaseURL('http://localhost:5000/api')
    // api.setBaseURL('http://localhost:3050/api')



    api.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    api.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code >= 400) {

            swal("Please check for errors");
            if (code == 422) {

                store.dispatch('error', error.response.data);
            }

        }
    });

    // Inject to context as $api
    inject('api', api)
}