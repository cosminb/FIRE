app.units = {
    
      width    : 150, 
      height   : 150,
	  ex        : 0, 
	  ez        : 0,
      y         : 20,
      
      get3DPos : function ( x, z ) {
           return new THREE.Vector3(  x * this.width  + this.ex, this.y, z * this.height + this.ez);
      },
	  
	  getX : function ( x ) { return x * this.width + this.ex },
	  getZ : function ( z ) { return z * this.height + this.ez },
	  
}

pos3d = function ( x, z ) {
    return app.units.get3DPos( x, z );
}
