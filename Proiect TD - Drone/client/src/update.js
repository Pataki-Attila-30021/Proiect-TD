function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
          drone: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/drones/'+this.id).then(
            (response) => {
                this.drone = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.drone);

            return axios.post('http://localhost:3000/drones', this.drone).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  