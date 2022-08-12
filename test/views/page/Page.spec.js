import PageList from '../../../src/views/page/List.vue'
import PageAdd from '../../../src/views/page/Add.vue'
import PageEdit from '../../../src/views/page/Edit.vue'
import { mount, flushPromises  } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import storeMock from '../../__mocks__/storeMock.js'
import { nextTick } from 'vue'

test('PageList', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    options.plugins.router.push({ name: 'pageList', params: { comicId: 'comic-1', chapterId: 'chapter-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()

    const wrapper = mount(PageList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        slots: {
            default: 'Page List'
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('Page List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Pages')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(['Admin', 'Comic', 'Chapter', 'Page List']))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    await wrapper.find('#add-page').trigger('click')

    expect(wrapper.findAll('.page-table').map(v => v.text())).toEqual(expect.arrayContaining([]))
    expect(wrapper.find('#page-total').text()).toBe('Page 1 of 0')
})

test('PageAdd', async () => {
    const wrapper = mount(PageAdd, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const promises = [
        wrapper.find('input[name="mediaType"]').setValue('image'),
        wrapper.find('input[name="pageType"]').setValue('false'),
        wrapper.find('input[name="pageNumber"]').setValue('20')
    ]

    await Promise.all(promises)

    await wrapper.find('#page-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const item = storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1', 'pages'])

    console.log(item)

    const isNewPagesMedia = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].media_type == 'image'
        return acc
    }, false);

    const isNewPagesPagetype = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].is_ar == 'false'
        return acc
    }, false);

    const isNewPagesPageNumber = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].page_number == '20'
        return acc
    }, false);

    expect(isNewPagesMedia).toEqual(true)
    expect(isNewPagesPagetype).toEqual(true)
    expect(isNewPagesPageNumber).toEqual(true)

    // expect(storeMock.getState(['comics', 'chapters', 'pages', 'pages-new', 'media_stype'])).toEqual('testestest')
    // expect(storeMock.getState(['comics', 'chapters', 'pages', 'pages-new', 'media_type'])).toEqual('testestest')
    // expect(storeMock.getState(['comics', 'chapters', 'pages', 'pages-new', 'page_number'])).toEqual('testestest')

    expect(wrapper.find('#hero-bar').text()).toContain('Add a New Page')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Page", "Add"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#page-add-media').text()).toContain('Media Type')
    expect(wrapper.find('#page-add-type').text()).toContain('Type')
    expect(wrapper.find('#page-add-pageNum').text()).toContain('Page Number')
    expect(wrapper.find('#page-image').text()).toContain('Page Image :')
    expect(wrapper.find('#page-image-capt').text()).toContain('Drop files to Attach, or browse')

    expect(wrapper.find('#author-card-header').text()).toContain('Page')
})

test('PageEdit', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    options.plugins.router.push({ name: 'pageEdit', params: { comidId: 'comic-1', chapterId: 'chapter-1', pageId: 'page-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()
    const wrapper = mount(PageEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1', 'pages', 'page-1', 'media_type'])).toEqual('image')
    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1', 'pages', 'page-1', 'is_ar'])).toEqual(null)
    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1', 'pages', 'page-1', 'page_number'])).toEqual(null)

    expect(wrapper.find('#hero-bar').text()).toContain('Edit Page')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Page", "Edit"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#page-edit-media').text()).toContain('Media Type')
    expect(wrapper.find('#page-edit-type').text()).toContain('Type')
    expect(wrapper.find('#page-edit-pageNum').text()).toContain('Page Number')
    expect(wrapper.find('#page-edit-image').text()).toContain('Page Image :')
    expect(wrapper.find('#page-image-capt').text()).toContain('Drop files to Attach, or browse')

    expect(wrapper.find('#author-card-header').text()).toContain('Page')
})