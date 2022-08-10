import TagList from '../../../src/views/tag/List.vue'
import TagAdd from '../../../src/views/tag/Add.vue'
import TagEdit from '../../../src/views/tag/Edit.vue'
import { mount, flushPromises } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import storeMock from '../../__mocks__/storeMock.js'
    
import { nextTick } from 'vue'

test('TagList', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(TagList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('Tag List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Tags List')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Tag List"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
})

test('TagAdd', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const mockRouter = {
        push: jest.fn()
    }
    const wrapper = mount(TagAdd, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        mocks: {
            $router: mockRouter
        }
        
    })

    const promises = [
        wrapper.find('input[name="tag-name"]').setValue('image'),
    ]

    await Promise.all(promises)

    await wrapper.find('#tag-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const path = storeMock.getState(['tags'])
    
    expect(path).toEqual('image')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('image')

    expect(wrapper.find('#hero-bar').text()).toContain('Add a New Tag')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Tag", "Add"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    expect(wrapper.find('#tag-card-header').text()).toContain('Tags')
})

test('TagEdit', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    options.plugins.router.push({ name: 'tag', params: { id: 'tag-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()
    const wrapper = mount(TagEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const tagEdit = wrapper.find('input[name="tagEdit"]')
    await tagEdit.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    expect(wrapper.find('#hero-bar').text()).toContain('Edit Tag')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Tag", "Edit"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    expect(wrapper.find('#tag-card-header').text()).toContain('Tags')
})