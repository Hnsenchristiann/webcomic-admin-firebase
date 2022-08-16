import CommentList from '../../../src/views/comment/List.vue'
import { mount, flushPromises } from '@vue/test-utils'
import options from '../../utils/pluginInitializer.js'

test('CommentList', async () => {
    window.localStorage.setItem('uid', 'test-uid')
    const wrapper = mount(CommentList, {
        global: {
            plugins: [...Object.values(options.plugins)],
            components: {...options.components}
        }
    })
    
    expect(wrapper.find('#hero-bar').text()).toContain('Comment List')
    expect(wrapper.find('#card-component-title').exists()).toBe(true)
    expect(wrapper.find('#card-component-title').text()).toBe('Comments')
    expect(wrapper.find('#card-component-empty').exists()).toBe(false)
    expect(wrapper.find('#card-component-slot').exists()).toBe(false)
    expect(wrapper.findAll('.title-bar').map(v => v.text())).toEqual(expect.arrayContaining(['Admin', 'Comment List']))
    // expect(wrapper.findAll('.comment-table').map(v => v.text())).toEqual(expect.arrayContaining([]))
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    await flushPromises()
    expect(wrapper.findAll('.comment-table-id').map(v => v.text())).toEqual(expect.arrayContaining(["comment-1", "comment-2"]))
    expect(wrapper.findAll('.comment-table-user').map(v => v.text())).toEqual(expect.arrayContaining(["user-1", "user-1"]))
    expect(wrapper.findAll('.comment-table-userdata').map(v => v.text())).toEqual(expect.arrayContaining(["", "", "", "", "", ""]))
    expect(wrapper.findAll('.comment-table-message').map(v => v.text())).toEqual(expect.arrayContaining(["testing", "testing"]))
    expect(wrapper.findAll('.comment-table-date').map(v => v.text())).toEqual(expect.arrayContaining(["", ""]))
    expect(wrapper.find('#jb-label').text()).toBe('Dark Mode')
    expect(wrapper.find('#jb-icon').exists()).toBe(true)

    expect(wrapper.find('#comment-page').text()).toBe('Page 1 of 0')
})