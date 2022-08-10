import Error from '../../src/views/Error.vue'
import { mount } from '@vue/test-utils'
import options from '../utils/pluginInitializer.js'

test('Error', async () => {
    const wrapper = mount(Error, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(wrapper.find('#error-text').text()).toBe('Unhandled exception An Error Occurred')
    expect(wrapper.find('#jb-label').text()).toBe('Done')
})