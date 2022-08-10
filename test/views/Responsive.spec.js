import Responsive from '../../src/views/Responsive.vue'
import { mount } from '@vue/test-utils'
import options from '../utils/pluginInitializer.js'

test('Responsive', async () => {
    const wrapper = mount(Responsive, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('Responsive layout')
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Responsive layout"]))
    expect(wrapper.find('#title-section-slot').exists()).toBe(false)
    expect(wrapper.find('#main-section-slot').exists()).toBe(true)
})