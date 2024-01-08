function read(id) {
  console.log(id);
  return { message: 'LOL' };
}

function update(id, { name, age }) {
  return { id, name, age };
}

export { read, update };
