import GenreList from '../../../src/views/genre/List.vue'
import GenreAdd from '../../../src/views/genre/Add.vue'
import GenreEdit from '../../../src/views/genre/Edit.vue'
import { mount, flushPromises } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import storeMock from '../../__mocks__/storeMock.js'
import { nextTick } from 'vue'

test('GenreList', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(GenreList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const testingId = "category-1"
    const testingName = "World"

    expect(wrapper.find('#hero-bar').text()).toContain('Genre List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Genres List')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Genre List"]))
    // expect(wrapper.findAll('.genre-table').map(v => v.text())).toEqual(expect.arrayContaining([]))
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(wrapper.find('.genre-table-id').text()).toBe(testingId)
    expect(wrapper.find('.genre-table-name').text()).toBe(testingName)
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#edit-genre-button').exists()).toBe(true)
    expect(wrapper.find('#delete-genre-button').exists()).toBe(true)
})

test('GenreAdd', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(GenreAdd, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const promises = [
        wrapper.find('input[name="genreName"]').setValue('image'),
    ]

    await Promise.all(promises)

    await wrapper.find('#genre-save').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const item = storeMock.getState(['categories'])

    console.log(item)

    const isNewGenreAdded = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].name == 'image'
        return acc
      }, false);

    expect(isNewGenreAdded).toEqual(true)

    
    // expect(storeMock.getState(['categories', 'genre-new', 'name'])).toEqual(null)

    // const genreName = wrapper.find('input[name="genreName"]')
    // await genreName.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    expect(wrapper.find('#hero-bar').text()).toContain('Add a New Genre')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Genre", "Add"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    expect(wrapper.find('#tag-card-header').text()).toContain('Genre')
})

test('GenreEdit', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    options.plugins.router.push({ name: 'genreEdit', params: { id: 'category-1'} })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()
    const wrapper = mount(GenreEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(wrapper.find('#hero-bar').text()).toContain('Edit Genre')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Genre", "Edit"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    expect(wrapper.find('#tag-card-header').text()).toContain('Genre')
    expect(storeMock.getState(['categories', 'category-1', 'name'])).toEqual('World')

    const promises = [
        wrapper.find('input[name="genreEdit"]').setValue('worlds'),
    ]

    await Promise.all(promises)

    await wrapper.find('#genre-save').trigger('click')
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(storeMock.getState(['categories', 'category-1', 'name'])).toEqual('worlds')
})