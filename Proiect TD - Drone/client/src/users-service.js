function users() {
  get = function () {
    return axios.get('http://localhost:3000/drones');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/drones/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
