app.units = {
    
      awidth    : 150, 
      alength   : 150,
	  ex : 30, 
	  ez : 30,
      y        : 0,
      
      get3DPos : function ( x, z ) {
           return new THREE.Vector3(  x * this.awidth  + this.ex, this.y, z * this.alength + this.ez);
      },
	  
	  getX : function ( x ) { return x * this.awidth + this.ex },
	  getZ : function ( z ) { return z * this.alength + this.ez },
	  
}

pos3d = function ( x, z ) {
    return app.units.get3DPos( x, z );
}
