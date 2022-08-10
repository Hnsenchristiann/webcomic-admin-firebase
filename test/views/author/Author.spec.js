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
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    await wrapper.find('#add-author').trigger('click')

    expect(wrapper.findAll('.author-table').map(v => v.text())).toEqual(expect.arrayContaining([]))
    expect(wrapper.find('#chapter-page').text()).toBe('Page 1 of 0')
})

test('AuthorAdd', async () => {
    const mockRouter = {
        push: jest.fn()
    }
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(AuthorAdd, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        },
        mocks: {
            $router: mockRouter
        }
    })

    const promises = [
        wrapper.find('input[name="authorName"]').setValue('testing'),
        wrapper.find('input[name="authorEmail"]').setValue('testing@gmail.com'),
        wrapper.find('input[name="authorFacebook"]').setValue('facebook.com'),
        wrapper.find('input[name="authorTwitter"]').setValue('twitter.com'),
        wrapper.find('input[name="authorInstagram"]').setValue('instagram.com'),
    ]

    await Promise.all(promises)

    await wrapper.find('#author-button').trigger('click')

    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    
    expect(storeMock.getState(['authors', 'author-new', 'name'])).toEqual('testing')
    expect(storeMock.getState(['authors', 'author-new', 'email'])).toEqual('testing@gmail.com')

    // const authorName = wrapper.find('input[name="authorName"]')
    // await authorName.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    // const authorEmail = wrapper.find('input[name="authorEmail"]')
    // await authorEmail.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    const authorDes = wrapper.find('textarea')
    await authorDes.setValue('some value')

    expect(wrapper.find('textarea').element.value).toBe('some value')

    // const authorFacebook = wrapper.find('input[name="authorFacebook"]')
    // await authorFacebook.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    // const authorTwitter = wrapper.find('input[name="authorTwitter"]')
    // await authorTwitter.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    // const authorInstagram = wrapper.find('input[name="authorInstagram"]')
    // await authorInstagram.setValue('some value')

    // expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

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

    const authorName = wrapper.find('input[name="authorName"]')
    await authorName.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    const authorEmail = wrapper.find('input[name="authorEmail"]')
    await authorEmail.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

    const authorFacebook = wrapper.find('input[name="authorFacebook"]')
    await authorFacebook.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('Andra Fembriarto')

    const authorTwitter = wrapper.find('input[name="authorTwitter"]')
    await authorTwitter.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('Andra Fembriarto')

    const authorInstagram = wrapper.find('input[name="authorInstagram"]')
    await authorInstagram.setValue('some value')

    expect(wrapper.find('input[type="text"]').element.value).toBe('Andra Fembriarto')

    const authorDes = wrapper.find('textarea')
    await authorDes.setValue('some value')

    expect(wrapper.find('textarea').element.value).toBe('some value')


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
    expect(wrapper.find('#author-image-capt').text()).toContain('Drop files to Attach, or browse')
    expect(wrapper.find('#author-card-header').text()).toContain('Author')
})