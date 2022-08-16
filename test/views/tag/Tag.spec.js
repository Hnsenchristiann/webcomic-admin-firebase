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
        },
    })
    
    const testingId = "tag-1"
    const testingName = "folk"

    expect(wrapper.find('#hero-bar').text()).toContain('Tag List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Tags List')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    console.log(wrapper.html())
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Tag List"]))
    // expect(wrapper.findAll('.tag-table').map(v => v.text())).toContainEqual(expect.arrayContaining(['tags-1', 'folk']))
    expect(wrapper.find('.tag-table-id').text()).toBe(testingId)
    expect(wrapper.find('.tag-table-name').text()).toBe(testingName)
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#edit-tag-button').exists()).toBe(true)
    expect(wrapper.find('#delete-tag-button').exists()).toBe(true)
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

    const item = storeMock.getState(['tags'])

    console.log(item)

    const isNewTagAdded = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].name == 'image'
        return acc
      }, false);

    expect(isNewTagAdded).toEqual(true)

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
    options.plugins.router.push({ name: 'tagEdit', params: { id: 'tag-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    const wrapper = mount(TagEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.find('#hero-bar').text()).toContain('Edit Tag')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Tag", "Edit"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#tag-card-header').text()).toContain('Tags')

    expect(storeMock.getState(['tags', 'tag-1', 'name'])).toEqual('folk')

    const promises = [
        wrapper.find('input[name="tagName"]').setValue('new valueee'),
    ]

    await Promise.all(promises)

    await wrapper.find('#tag-save').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(storeMock.getState(['tags', 'tag-1', 'name'])).toEqual('new valueee')
})