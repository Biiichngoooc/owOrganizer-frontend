
import { mount } from '@vue/test-utils'
import Player from '../../src/views/Player'
import PlayerCreateForm from '../../src/components/PlayerCreateForm'

describe('Testing Player.vue', () => {
  it('should show page title', () => {
    const wrapper = mount(Player)

    expect(wrapper.text()).toMatch('Player')
  })

  it('should have player create from component', () => {
    const wrapper = mount(Player)

    const createForm = wrapper.findComponent(PlayerCreateForm)
    expect(createForm.exists()).toBeTruthy()
  })
})
