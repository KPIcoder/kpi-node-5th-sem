function read(from, to, min) {
  return {
    type: 'fligths',
    allCount: 2,
    sentCount: 2,
    maxPerRequest: 1000,
    flghts: [
      { id: 1, from, to, price: Math.min(1000, min) },
      { id: 2, from, to, price: 1100 },
    ],
  };
}

export { read };
