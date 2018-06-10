import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import solids from '@fortawesome/fontawesome-free-solid'
import brands from '@fortawesome/fontawesome-free-brands'

import App from '../components/editor.vue'

fontawesome.library.add(brands, solids)

var editor = new Vue({
    el: '#app',
    render: h => h(App)
})
