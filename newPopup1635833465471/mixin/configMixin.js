import { getConfig } from '../config'

const configMixin = {
    data() {
        return {
            config: {}
        }
    },
    created() {
        this.config = getConfig(this.$env)
    }
}
export default configMixin;