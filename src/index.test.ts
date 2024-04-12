import {describe, expect, test} from '@jest/globals';
import { hasAsterisk } from '.';

describe(`It finds '*' in Resources`, ()=>{
  test(`In json with single statement`, () => {
    expect(hasAsterisk('resources/data.json')).toBe(false);
  })
  test(`In json with multiple statements`, () => {
    expect(hasAsterisk('resources/data1.json')).toBe(false);
  })
})

describe(`It not finds '*' in Resources`, ()=>{
  test(`In not valid json`, () => {
    expect(hasAsterisk('resources/bad_data.json')).toBe(true);
  })
  test(`In not found file`, () => {
    expect(hasAsterisk('resources/not_found.json')).toBe(true);
  })
  test(`In empty file`, () => {
    expect(hasAsterisk('resources/empty.json')).toBe(true);
  })
  test(`In json with multiple resources`, () => {
    expect(hasAsterisk('resources/data2.json')).toBe(true);
  })
  test(`In json with resource that contains only '**' `, () => {
    expect(hasAsterisk('resources/data3.json')).toBe(true);
  })
  test(`In json with resources that contains only '**' `, () => {
    expect(hasAsterisk('resources/data4.json')).toBe(true);
  })
})
