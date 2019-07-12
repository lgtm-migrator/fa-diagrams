/* jshint -W117 */
const rendering = require('../src/rendering');

describe('getIcon', () => {
  const solidCirclePath = 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z';
  const regularCirclePath = 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z';

  test('no name', () => {
    const res = rendering().getIcon(undefined);
    expect(res).toBeNull();
  });
  test('empty name', () => {
    const res = rendering().getIcon('  ');
    expect(res).toBeNull();
  });
  test('invalid name', () => {
    const res = rendering().getIcon('circle-2');
    expect(res).toBeNull();
  });
  test('valid circle', () => {
    const res = rendering().getIcon('circle');
    expect(res).toEqual({
      path: solidCirclePath,
      width: 512
    });
  });
  test('valid circle alt name', () => {
    const res = rendering().getIcon('fa-circle');
    expect(res).toEqual({
      path: solidCirclePath,
      width: 512
    });
  });
  test('ignored other name', () => {
    const res = rendering().getIcon('circle server');
    expect(res).toEqual({
      path: solidCirclePath,
      width: 512
    });
  });
  test('forcing regular', () => {
    const res = rendering().getIcon('far circle');
    expect(res).toEqual({
      path: regularCirclePath,
      width: 512
    });
  });
  test('forcing regular 2', () => {
    const res = rendering().getIcon('regular circle');
    expect(res).toEqual({
      path: regularCirclePath,
      width: 512
    });
  });
  test('forcing regular 3', () => {
    const res = rendering().getIcon('circle far');
    expect(res).toEqual({
      path: regularCirclePath,
      width: 512
    });
  });
  test('double type', () => {
    const res = rendering().getIcon('circle far solid');
    expect(res).toEqual({
      path: solidCirclePath,
      width: 512
    });
  });
  test('double type 2', () => {
    const res = rendering().getIcon('circle solid far');
    expect(res).toEqual({
      path: solidCirclePath,
      width: 512
    });
  });
  test('forcing solid on brands icon', () => {
    const res = rendering().getIcon('usb');
    expect(res).not.toBeNull();
    const res2 = rendering().getIcon('fas usb');
    expect(res2).toBeNull();
  });
});


describe('toXML', () => {
  test('no data', () => {
    const res = rendering({beautify: false}).toXML({}, 0, 0);
    expect(res).toEqual('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0"/>');
  });
  test('sample svg data', () => {
    const res = rendering({beautify: false}).toXML({
      'circle': {
        '_attributes': {
          'cx': 50,
          'cy': 50,
          'r': 50
        }
      }
    }, 100, 100);
    expect(res).toEqual('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"/></svg>');
  });
});

describe('compute', () => {
  test('no nodes no links', () => {
    const res = rendering({beautify: true}).compute({}, []);
    expect(res).toEqual('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0"/>');
  });
});