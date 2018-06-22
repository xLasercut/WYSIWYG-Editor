import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import App from '../components/upload/upload.vue'

library.add(fas)

new Vue({
    el: '#app',
    render: h => h(App)
})
