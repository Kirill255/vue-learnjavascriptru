import { mount } from '@vue/test-utils'
import SelectPerPage from "~/components/SelectPerPage";

describe('Компонент SelectPerPage', () => {
  test('Является экземпляром Vue', () => {
    const wrapper = mount(SelectPerPage, {})

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Default props - selectedValue равен 5', () => {
    const wrapper = mount(SelectPerPage, {})

    expect(wrapper.props().selectedValue).toBe(5)
    expect(wrapper.props().selectedValue).not.toBe(10)
  })

  test('Значение props - selectedValue изменяется', () => {
    const wrapper = mount(SelectPerPage, {
      propsData: {
        selectedValue: 10
      }
    })

    expect(wrapper.props().selectedValue).toBe(10)

    wrapper.setProps({ selectedValue: 2 })

    expect(wrapper.props().selectedValue).toBe(2)
  })

  test('Есть data - selectOptions', () => {
    const wrapper = mount(SelectPerPage, {})

    expect(wrapper.vm.selectOptions).toEqual([
      { text: "2", value: 2 },
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "100", value: 100 }
    ])
  })

  test('Вызов метода onSelectChange эмитит событие input с новым значением', () => {
    const wrapper = mount(SelectPerPage, {})

    wrapper.vm.onSelectChange({ target: { value: 10 } })

    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0]).toEqual([10])

    wrapper.vm.onSelectChange({ target: { value: 5 } })

    expect(wrapper.emitted('input').length).toBe(2)
    expect(wrapper.emitted('input')[1]).toEqual([5])

    expect(wrapper.emitted('input')).toEqual([[10], [5]])
  })
})


// https://stackoverflow.com/questions/50225034/vue-test-utils-with-jest-throws-unexpected-token-error-for-map-spread-operator
