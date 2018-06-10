import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
    props: ['button'],
    components: {
        FontAwesomeIcon
    },
    data: function () {
        return {
            status: false,
            value: {}
        }
    }
}
