import ComicList from '../../../src/views/comic/List.vue'
import ComicAdd from '../../../src/views/comic/Add.vue'
import ComicEdit from '../../../src/views/comic/Edit.vue'
import { mount, flushPromises } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import { nextTick } from 'vue'
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
        },
    })

    const currentComic = wrapper.vm.comic
    currentComic.tags = 'testing tags', 'testing tags2'
    currentComic.categories = 'testing categories', 'testing categories2'
    currentComic.authors = 'testing authors'
    wrapper.setData({comic: currentComic})

    const promises = [
        wrapper.find('input[name="comicTitle"]').setValue('testing'),
        wrapper.find('textarea').setValue('testing comic description'),
    ]

    await Promise.all(promises)

    await wrapper.find('#comic-submit').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const item = storeMock.getState(['comics'])

    console.log(item)

    const isNewComicName = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].title == 'testing'
        return acc
    }, false);

    const isNewComicDescription = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].description == 'testing comic description'
        return acc
    }, false);

    const isNewComictag = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].tags == 'testing tags', 'testing tags2'
        return acc
    }, false);

    const isNewComicGenre = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].categories == 'testing categories', 'testing categories2'
        return acc
    }, false);

    const isNewComicAuthors = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].authors == 'testing authors'
        return acc
    }, false);

    expect(isNewComicName).toEqual(true)
    expect(isNewComicDescription).toEqual(true)
    expect(isNewComictag).toEqual(true)
    expect(isNewComicGenre).toEqual(true)
    expect(isNewComicAuthors).toEqual(true)

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
    options.plugins.router.push({ name: 'comicEdit', params: { id: 'comic-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()
    const wrapper = mount(ComicEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    expect(storeMock.getState(['comics', 'comic-1', 'title'])).toEqual('hard drive 2000')
    expect(storeMock.getState(['comics', 'comic-1', 'description'])).toEqual('Eligendi sed amet eum odit qui voluptas. Possimus voluptatibus nemo minus sapiente rerum delectus. Odit occaecati voluptates quos. Aperiam quasi voluptatem itaque voluptatem beatae. Sint occaecati eius enim aut rerum quaerat.')
    expect(storeMock.getState(['comics', 'comic-1', 'tags'])).toEqual(['horror', 'scifi'])
    expect(storeMock.getState(['comics', 'comic-1', 'categories'])).toEqual(['horror', 'scifi'])


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