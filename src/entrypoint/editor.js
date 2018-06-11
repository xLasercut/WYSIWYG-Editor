import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import solids from '@fortawesome/fontawesome-free-solid'
import brands from '@fortawesome/fontawesome-free-brands'

import App from '../components/editor/editor.vue'

fontawesome.library.add(brands, solids)

new Vue({
    el: '#app',
    render: h => h(App)
})
