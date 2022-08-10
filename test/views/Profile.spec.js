import Profile from '../../src/views/Profile.vue'
import { mount } from '@vue/test-utils'
import options from '../utils/pluginInitializer.js'

test('Profile', async () => {
    const wrapper = mount(Profile, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Edit Profile')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.find('#field-label').text()).toBe('Avatar')
    expect(wrapper.find('#field-help').text()).toBe('Max 500kb')
})