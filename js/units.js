app.units = {
    
      awidth    : 100, 
      alength   : 100,
      y        : 0,
      
      get3DPos : function ( x, z ) {
           return new THREE.Vector3(  x * this.awidth, this.y, z * this.alength);
      }
}

pos3d = function ( x, z ) {
    return app.units.get3DPos( x, z );
}
