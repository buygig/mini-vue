import { ref } from '../index'
import { describe, expect, test } from "bun:test"
describe('ref', () => {
  test('should create a ref with an initial value', () => {
    const a = ref(0)
    expect(a.value).toBe(0)
    a.value = 1
    expect(a.value).toBe(1)
  })

  test('should be reactive', () => {
    const a = ref(0)
    const sum = a.value + 1
    expect(sum).toBe(1)
    a.value = 4
    expect(sum).toBe(5)
  })
})