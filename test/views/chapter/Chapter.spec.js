import ChapterList from '../../../src/views/chapter/List.vue'
import ChapterAdd from '../../../src/views/chapter/Add.vue'
import ChapterEdit from '../../../src/views/chapter/Edit.vue'
import { mount, flushPromises  } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import { nextTick } from 'vue'
import storeMock from '../../__mocks__/storeMock.js'

test('ChapterList', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    options.plugins.router.push({ name: 'chapter', params: { comicId: 'comic-1', chapterId: 'chapter-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()
    
    const wrapper = mount(ChapterList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        slots: {
            default: 'Chapter List'
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('Chapter List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Chapters')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Comic", "Chapter List"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    await wrapper.find('#add-chapter').trigger('click')

    expect(wrapper.findAll('.chapter-table').map(v => v.text())).toEqual(expect.arrayContaining([]))
    expect(wrapper.find('#chapter-page').text()).toBe('Page 1 of 0')
})

test('ChapterAdd', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(ChapterAdd, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const promises = [
        wrapper.find('input[name="chapterNumber"]').setValue('testing'),
        wrapper.find('input[name="arPrice"]').setValue(false),
        wrapper.find('input[name="price"]').setValue('1')
    ]

    await Promise.all(promises)

    await wrapper.find('#chapter-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    
    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-new', 'chapter_number'])).toEqual('testing')
    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-new', 'ar_price'])).toEqual(false)
    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-new', 'price'])).toEqual('1')

    // const chapterNumber = wrapper.find('input[name="chapterNumber"]')
    // await chapterNumber.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    // const arPrice = wrapper.find('input[name="arPrice"]')
    // await arPrice.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    // const price = wrapper.find('input[name="price"]')
    // await price.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    expect(wrapper.find('#hero-bar').text()).toContain('Add a New Chapter')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Chapter", "Add"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#chapter-add-number').text()).toContain('Chapter Number')
    expect(wrapper.find('#chapter-add-ar').text()).toContain('Ar Price')
    expect(wrapper.find('#chapter-add-price').text()).toContain('Price')
    expect(wrapper.find('#chapter-cover').text()).toContain('Cover Image :')
    expect(wrapper.find('#chapter-image').text()).toContain('Drop files to Attach, or browse')

    expect(wrapper.find('#author-card-header').text()).toContain('Chapter')
})

test('ChapterEdit', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(ChapterEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const chapterNumber = wrapper.find('input[name="chapterNumber"]')
    await chapterNumber.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('')

    const arPrice = wrapper.find('input[name="arPrice"]')
    await arPrice.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('')

    const price = wrapper.find('input[name="price"]')
    await price.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('')

    expect(wrapper.find('#hero-bar').text()).toContain('Edit Chapter')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Chapter", "Edit"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#chapter-add-number').text()).toContain('Chapter Number')
    expect(wrapper.find('#chapter-add-ar').text()).toContain('Ar Price')
    expect(wrapper.find('#chapter-add-price').text()).toContain('Price')
    expect(wrapper.find('#chapter-cover').text()).toContain('Cover Image :')
    expect(wrapper.find('#chapter-image').text()).toContain('Drop files to Attach, or browse')

    expect(wrapper.find('#author-card-header').text()).toContain('Chapter')
})