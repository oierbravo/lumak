'use strict';

const hooks = require('./hooks');
const _ = require('lodash');


class Service {
  constructor(options) {
    this.options = options || {};
    

    var datosArduino = {
      id:'arduino',
      relay1:1,
      relay2:0,
      color:'#00ff00',
      motor1Speed:0,
      motor2Speed:0
    }
    this.datos = {
      arduino:datosArduino
    }
  }

  find(params) {
    console.log('find-params-query',params.query);
    var output = [];
    for(var key in this.datos){
      var data = this.datos[key];
     
      output.push(data);
    }
    return Promise.resolve(output);
  }

  get(id, params) {
    console.log('get-id',id);
    console.log('get-params-query',params.query);
    var output = {};
    if(typeof this.datos[id] !== 'undefined'){
      var data = this.datos[id];
      //var output =  _.extend(output,data);
      if(typeof params.query.key !== 'undefined'){
        output = data[params.query.key];
      } else {
        output = data;
     }
    }

    return Promise.resolve(output);
  }

  create(data, params) {


    if(Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update(id, data, params) {
    console.log('update-id',id);
    console.log('update-data',data);
   // console.log('update-params',params);
    if(typeof this.datos[id] !== 'undefined'){
      this.datos[id][data.key] = data.value;
    }
    return Promise.resolve({id:id,key:data.key,value:data.value});
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/datos', new Service());

  // Get our initialize service to that we can bind hooks
  const datosService = app.service('/datos');

  // Set up our before hooks
  datosService.before(hooks.before);

  // Set up our after hooks
  datosService.after(hooks.after);
};

module.exports.Service = Service;
