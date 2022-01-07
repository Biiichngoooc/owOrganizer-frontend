import { mount } from '@vue/test-utils'
import PlayerCreateForm from '../../src/components/PlayerCreateForm'

describe('Testing PlayerCreateForm.vue', () => {
  it('should not show form by default', () => {
    const wrapper = mount(PlayerCreateForm)

    expect(wrapper.find('#players-create-offcanvas').classes()).not.toContain('show')
  })

})
