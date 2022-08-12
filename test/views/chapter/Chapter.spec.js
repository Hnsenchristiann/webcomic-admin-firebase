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
        wrapper.find('input[name="chapterNumber"]').setValue('10'),
        wrapper.find('input[name="arPrice"]').setValue('15'),
        wrapper.find('input[name="price"]').setValue('12')
    ]

    await Promise.all(promises)

    await wrapper.find('#chapter-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const item = storeMock.getState(['comics', 'comic-1', 'chapters'])

    console.log(item)

    const isNewChapterAdded = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].chapter_number == '10'
        return acc
    }, false);

    const isNewArPriceAdded = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].ar_price == '15'
        return acc
    }, false);

    const isNewpriceAdded = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].price == '12'
        return acc
    }, false);

    
    expect(isNewChapterAdded).toEqual(true)
    expect(isNewArPriceAdded).toEqual(true)
    expect(isNewpriceAdded).toEqual(true)

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
    options.plugins.router.push({ name: 'chapterEdit', params: { comicId: 'comic-1', chapterId: 'chapter-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()

    const wrapper = mount(ChapterEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1', 'chapter_number'])).toEqual(1)
    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1', 'ar_price'])).toEqual(null)
    expect(storeMock.getState(['comics', 'comic-1', 'chapters', 'chapter-1', 'price'])).toEqual(1)

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