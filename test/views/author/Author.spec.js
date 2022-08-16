import AuthorList from '../../../src/views/author/List.vue'
import AuthorAdd from '../../../src/views/author/Add.vue'
import AuthorEdit from '../../../src/views/author/Edit.vue'
import { mount, flushPromises } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'
import { nextTick } from 'vue'
import storeMock from '../../__mocks__/storeMock.js'

test('AuthorList', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(AuthorList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        slots: {
            default: 'Author List'
        }
    })

    expect(wrapper.find('#hero-bar').text()).toContain('Author List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Authors')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Author List"]))
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(wrapper.findAll('.author-table-id').map(v => v.text())).toEqual(expect.arrayContaining(["author-1", "author-2"]))
    expect(wrapper.findAll('.author-table-name').map(v => v.text())).toEqual(expect.arrayContaining(["Andra Fembriarto", "Andra Fembriarto"]))
    expect(wrapper.findAll('.author-table-social').map(v => v.text())).toEqual(expect.arrayContaining(["https://facebook.com, https://twitter.com", "https://facebook.com, https://twitter.com"]))
    expect(wrapper.findAll('.author-table-email').map(v => v.text())).toEqual(expect.arrayContaining(["author1@mail.com", "author2@mail.com"]))
    expect(wrapper.findAll('.author-table-description').map(v => v.text())).toEqual(expect.arrayContaining(["He is the writer of Kara, Guardian of Realms. He has been writing for 10 years.", "He is the writer of Kara, Guardian of Realms. He has been writing for 10 years."]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    await wrapper.find('#add-author').trigger('click')

    // expect(wrapper.findAll('.author-table').map(v => v.text())).toEqual(expect.arrayContaining([]))
    expect(wrapper.find('#chapter-page').text()).toBe('Page 1 of 0')
})

test('AuthorAdd', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(AuthorAdd, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })

    const promises = [
        wrapper.find('input[name="authorName"]').setValue('testing'),
        wrapper.find('input[name="authorEmail"]').setValue('testing@gmail.com'),
        wrapper.find('textarea').setValue('testing author description'),
        wrapper.find('input[name="authorFacebook"]').setValue('facebook.com/testing'),
        wrapper.find('input[name="authorTwitter"]').setValue('twitter.com/testing'),
        wrapper.find('input[name="authorInstagram"]').setValue('instagram.com/testing')
    ]

    await Promise.all(promises)

    await wrapper.find('#author-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    const item = storeMock.getState(['authors'])

    console.log(item)

    const isNewAuthorName = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].name == 'testing'
        return acc
    }, false);

    const isNewAuthorEmail = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].email == 'testing@gmail.com'
        return acc
    }, false);

    const isNewAuthorDescription = Object.keys(item).reduce((acc, key) => {
        acc = acc || item[key].description == 'testing author description'
        return acc
    }, false);

    // const isNewAuthorfacebook = Object.keys(item).reduce((acc, key) => {
    //     acc = acc || item[key].social_media_links.facebook == 'facebook.com/testing'
    //     return acc
    // }, false);

    // const isNewAuthorTwitter = Object.keys(item).reduce((acc, key) => {
    //     acc = acc || item[key].social_media_links.twitter == 'twitter.com/testing'
    //     return acc
    // }, false);

    // const isNewAuthorInstagram = Object.keys(item).reduce((acc, key) => {
    //     acc = acc || item[key].social_media_links.instagram == 'instagram.com/testing'
    //     return acc
    // }, false);

    expect(isNewAuthorName).toEqual(true)
    expect(isNewAuthorEmail).toEqual(true)
    expect(isNewAuthorDescription).toEqual(true)
    // expect(isNewAuthorfacebook).toEqual(true)
    // expect(isNewAuthorTwitter).toEqual(true)
    // expect(isNewAuthorInstagram).toEqual(true)

    expect(wrapper.find('#hero-bar').text()).toContain('Add a New Author')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Author", "Add"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#author-email').text()).toContain('Email')
    expect(wrapper.find('#author-description').text()).toContain('Description')
    expect(wrapper.find('#author-social').text()).toContain('Social Media Links :')
    expect(wrapper.find('#author-facebook').text()).toContain('Facebook')
    expect(wrapper.find('#author-twitter').text()).toContain('Twitter')
    expect(wrapper.find('#author-instagram').text()).toContain('Instagram')
    expect(wrapper.find('#author-image').text()).toContain('Profile Image :')
    expect(wrapper.find('#author-image-capt').text()).toContain('Drop files to Attach, or browse')

    expect(wrapper.find('#author-card-header').text()).toContain('Author')
})

test('AuthorEdit', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    options.plugins.router.push({ name: 'authorEdit', params: { id: 'author-1' } })
    await options.plugins.router.isReady()
    await nextTick()
    await nextTick()
    await flushPromises()
    await flushPromises()

    await options.plugins.router.isReady()
    const wrapper = mount(AuthorEdit, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    expect(storeMock.getState(['authors', 'author-1', 'name'])).toEqual('Andra Fembriarto')
    expect(storeMock.getState(['authors', 'author-1', 'email'])).toEqual('author1@mail.com')
    expect(storeMock.getState(['authors', 'author-1', 'social_media_links', 'facebook'])).toEqual('https://facebook.com')
    expect(storeMock.getState(['authors', 'author-1', 'social_media_links', 'twitter'])).toEqual('https://twitter.com')
    expect(storeMock.getState(['authors', 'author-1', 'social_media_links', 'instagram'])).toEqual('https://instagram.com')
    expect(storeMock.getState(['authors', 'author-1', 'description'])).toEqual('He is the writer of Kara, Guardian of Realms. He has been writing for 10 years.')

    //change value
    const promises = [
        wrapper.find('input[name="authorName"]').setValue('testingss'),
        wrapper.find('input[name="authorEmail"]').setValue('testingss@gmail.com'),
        wrapper.find('textarea').setValue('testing author descriptionss'),
        wrapper.find('input[name="authorFacebook"]').setValue('facebook.com/testingss'),
        wrapper.find('input[name="authorTwitter"]').setValue('twitter.com/testingss'),
        wrapper.find('input[name="authorInstagram"]').setValue('instagram.com/testingss')
    ]

    await Promise.all(promises)

    //click
    await wrapper.find('#author-save').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()

    //check again
    expect(storeMock.getState(['authors', 'author-1', 'name'])).toEqual('testingss')
    expect(storeMock.getState(['authors', 'author-1', 'email'])).toEqual('testingss@gmail.com')
    expect(storeMock.getState(['authors', 'author-1', 'social_media_links', 'facebook'])).toEqual('facebook.com/testingss')
    expect(storeMock.getState(['authors', 'author-1', 'social_media_links', 'twitter'])).toEqual('twitter.com/testingss')
    expect(storeMock.getState(['authors', 'author-1', 'social_media_links', 'instagram'])).toEqual('instagram.com/testingss')
    expect(storeMock.getState(['authors', 'author-1', 'description'])).toEqual('testing author descriptionss')

    expect(wrapper.find('#hero-bar').text()).toContain('Edit Author')
    expect(wrapper.find('#card-component-title').exists()).toBe(false)
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(["Admin", "Author", "Edit"]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)
    expect(wrapper.find('#author-email').text()).toContain('Email')
    expect(wrapper.find('#author-description').text()).toContain('Description')
    expect(wrapper.find('#author-social').text()).toContain('Social Media Links :')
    expect(wrapper.find('#author-facebook').text()).toContain('Facebook')
    expect(wrapper.find('#author-twitter').text()).toContain('Twitter')
    expect(wrapper.find('#author-instagram').text()).toContain('Instagram')
    expect(wrapper.find('#author-profile').text()).toContain('Profile Photo :')
    expect(wrapper.find('#author-image').text()).toContain('Cover Image :')
    // expect(wrapper.find('#author-image-capt').text()).toContain('Drop files to Attach, or browse')
    expect(wrapper.find('#author-card-header').text()).toContain('Author')
})