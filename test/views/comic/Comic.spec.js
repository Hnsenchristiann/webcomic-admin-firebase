import ComicList from '../../../src/views/comic/List.vue'
import ComicAdd from '../../../src/views/comic/Add.vue'
import ComicEdit from '../../../src/views/comic/Edit.vue'
import { mount } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import storeMock from '../../__mocks__/storeMock.js'

test('ComicList', async () => {
    const wrapper = mount(ComicList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        slots: {
            default: 'Comic List'
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('Comic List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Comics')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Comic List"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    expect(wrapper.findAll('.author-table').map(v => v.text())).toEqual(expect.arrayContaining([]))
    expect(wrapper.find('#comic-page').text()).toBe('Page 1 of 0')
})

test('ComicAdd', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(ComicAdd, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const promises = [
        wrapper.find('input[name="comicTitle"]').setValue('testing'),
        // wrapper.find('input[name="comicAuthorsName"]').setValue('Budi'),
        wrapper.find('input[name="comicGenre"]').setValue('horror'),
        wrapper.find('input[name="comicTag"]').setValue('scifi'),
        wrapper.find('input[name="file_upload"]').setValue('gs://comics-77200.appspot.com/cpt-prev.jpg')
    ]

    await Promise.all(promises)

    await wrapper.find('#comic-submit').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    
    expect(storeMock.getState(['comics', 'comic-new', 'title', 'chapter-new'])).toEqual('testing')
    // expect(storeMock.getState(['comics', 'comic-new', 'authors_data', 'name'])).toEqual(false)
    expect(storeMock.getState(['comics', 'comic-new', 'categories', 'name'])).toEqual('horror')
    expect(storeMock.getState(['comics', 'comic-new', 'tags', 'name'])).toEqual('scifi')
    expect(storeMock.getState(['comics', 'comic-new', 'cover_image_url'])).toEqual('1')

    expect(wrapper.find('#hero-bar').text()).toContain('Add a New Comic')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Comic", "Add"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#comic-authors').text()).toContain('Authors')
    expect(wrapper.find('#comic-genres').text()).toContain('Genres')
    expect(wrapper.find('#comic-tags').text()).toContain('Tags')
    expect(wrapper.find('#comic-description').text()).toContain('Description :')
    expect(wrapper.find('#comic-cover').text()).toContain('Cover Image :')
    expect(wrapper.find('#comic-image-capt').text()).toContain('Drop files to Attach, or browse')

    expect(wrapper.find('#comic-card-header').text()).toContain('Comicsubmitdraft')
})

test('ComicEdit', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(ComicEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const comicTitle = wrapper.find('input[name="comicTitle"]')
    await comicTitle.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('')

    const comicRelease = wrapper.find('input[name="comicRelease"]')
    await comicRelease.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('')

    expect(wrapper.find('#hero-bar').text()).toContain('Edit Comic')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Comic", "Edit"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#comic-authors').text()).toContain('Authors')
    expect(wrapper.find('#comic-genres').text()).toContain('Genres')
    expect(wrapper.find('#comic-tags').text()).toContain('Tags')
    expect(wrapper.find('#comic-release').text()).toContain('Release Date')
    expect(wrapper.find('#comic-description').text()).toContain('Description :')
    expect(wrapper.find('#comic-cover').text()).toContain('Cover Image :')
    expect(wrapper.find('#comic-cover-capt').text()).toContain('Drop files to Attach, or browse')

    expect(wrapper.find('#comic-card-header').text()).toContain('Comicsubmitdraft')
})