import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
    props: ['fileTreeData', 'selectionData'],
    data: function () {
        return {
            selData: this.selectionData
        }
    },
    components: {
        FontAwesomeIcon
    },
    watch: {
        selData (val) {
            this.$emit('input', val)
        }
    },
    methods: {
        showFile: function (parents) {
            var count = 0
            for (var parent of parents) {
                if (this.selData[parent]) {
                    count++
                }
            }
            if (count == parents.length) {
                return true
            }

            return false
        }
    }
}
