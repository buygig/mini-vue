/// <reference lib="dom" />
import { h, mount } from '../index'
import { describe, expect, test } from "bun:test"

describe('mount', () => {
  test('mount component', () => {
    const vdom = h('div', null, 'hello')
    const app = document.createElement('div')
    app.setAttribute('id', 'app')
    mount(vdom, app)
    expect(app.innerHTML).toBe('<div>hello</div>')
  })

  test('mount component', () => {
    const vdom = h('div', null, ['hello', h('span', { class: 'test' }, 'world')])
    const app = document.createElement('div')
    app.setAttribute('id', 'app')
    mount(vdom, app)
    expect(app.innerHTML).toBe('<div>hello<span class="test">world</span></div>')
  })
})