app.units = {
    
      awidth    : 300, 
      alength   : 300,
      y        : 10,
      
      get3DPos : function ( x, z ) {
           return new THREE.Vector3(  x * this.awidth, this.y, z * this.alength );
      }
}

pos3d = function ( x, z ) {
    return app.units.get3DPos( x, z );
}