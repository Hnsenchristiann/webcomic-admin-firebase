import Settings from '../../../src/views/settings/settings.vue'
import { mount, flushPromises } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import storeMock from '../../__mocks__/storeMock.js'

test('Settings', async () => {
    const wrapper = mount(Settings, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const item = storeMock.getState(['settings', 'banners'])
    console.log(item)

    expect(wrapper.find('#hero-bar').text()).toContain('Settings')
    expect(wrapper.find('#tab-banner').text()).toContain('Banners')
    expect(wrapper.findAll('.banner-title').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Settings"]))

    expect(wrapper.find('#tab-dashboard').text()).toContain('Dashboard Tags')

    expect(wrapper.find('#tab-prices').text()).toContain('Prices')

    expect(wrapper.find('#tab-social').text()).toContain('Social Media')

    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Settings"]))
    expect(wrapper.findAll('.settings-banner').map(v => v.text())).toEqual(expect.arrayContaining(["Drop files to Attach, or browse Cancel"]))
    expect(wrapper.findAll('.settings-tag').map(v => v.text())).toEqual(expect.arrayContaining(["Tags Name Cancel"]))
    expect(wrapper.findAll('.settings-prices').map(v => v.text())).toEqual(expect.arrayContaining(["Tokens Price - Tokens Amount Cancel"]))
    expect(wrapper.findAll('.settings-social').map(v => v.text())).toEqual(expect.arrayContaining(["Social Media Name Delete"]))

    // await wrapper.find('#banner-button').trigger('click')
    // await wrapper.find('#banner-button-delete').trigger('click')
    // await wrapper.find('#banner-button-save').trigger('click')

    // await wrapper.find('#tag-button').trigger('click')
    // await wrapper.find('#tag-button-delete').trigger('click')
    // await wrapper.find('#tag-button-save').trigger('click')
    
    // await wrapper.find('#price-button').trigger('click')
    // await wrapper.find('#price-button-delete').trigger('click')
    // await wrapper.find('#price-button-save').trigger('click')

    // await wrapper.find('#social-button').trigger('click')
    // await wrapper.find('#social-button-delete').trigger('click')
    // await wrapper.find('#social-button-save').trigger('click')
})