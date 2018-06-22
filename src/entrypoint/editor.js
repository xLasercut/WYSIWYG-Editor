import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import App from '../components/editor/editor.vue'

library.add(fas, fab)

new Vue({
    el: '#app',
    render: h => h(App)
})
