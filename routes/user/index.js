function read() {
  return { name: 'Vlad', age: 20 };
}

function update({ name, age }) {
  return { name, age };
}

function options() {
  return { message: 'Options endpoint' };
}

export { read, update, options };
