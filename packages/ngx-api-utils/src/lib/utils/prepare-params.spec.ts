import {prepareParams} from './prepare-params';

describe('utils/prepareParams', () => {
  it('it should filter any undefined value and cast to string', () => {
    const testSets = [
      {input: {}, expected: {}, expectationFailOutput: 'empty object failed'},
      {input: {num: 99}, expected: {num: '99'}, expectationFailOutput: 'object with number failed'},
      {
        input: {date: new Date('2018-07-30')},
        expected: {date: String(new Date('2018-07-30'))},
        expectationFailOutput: 'object with date failed'
      },
      {
        input: {a: 'valueofa', b: undefined},
        expected: {a: 'valueofa'},
        expectationFailOutput: 'object property and another that is undefined failed'
      },
      {
        input: {a: undefined, b: undefined},
        expected: {},
        expectationFailOutput: 'object with undefined properties only'
      }
    ] as any;
    for (const test of testSets) {
      expect(prepareParams(test.input)).toEqual(jasmine.objectContaining(test.expected), test.expectationFailOutput);
    }
  });
});
