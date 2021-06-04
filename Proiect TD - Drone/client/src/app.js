function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      drones: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => (this.drones = response.data));
    },
    methods: {
      deleteDrone: function(id) {
        console.log('HTTP DELETE spre backend, drones: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.drones = response.data));
        });
      },
    }
  });

  indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
