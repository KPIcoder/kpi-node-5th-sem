function read(from, to) {
  return {
    type: 'fligths',
    allCount: 2,
    sentCount: 2,
    maxPerRequest: 1000,
    flghts: [
      { id: 1, from, to, price: 1000 },
      { id: 2, from, to, price: 1100 },
    ],
  };
}

export { read };
