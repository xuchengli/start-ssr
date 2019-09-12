const items = [
  {
    id: 1,
    name: 'Foo',
    value: 'Foo-value',
  },
  {
    id: 2,
    name: 'Bar',
    value: 'Bar-value',
  },
  {
    id: 3,
    name: 'Baz',
    value: 'Baz-value',
  },
];
export function fetchItem(id) {
  return Promise.resolve(items.find(item => item.id === parseInt(id)));
}
