app.units = {
      //constants & conversion ( from pos to pos3d )
      
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
	  
	  
	  init : function ( ) {
		  
		  this.window = { 
            width : window.innerWidth, 
            height : window.innerHeight 
          };
		  
		  this.board3d = { 
			  width : this.window.width - 430 , 
			  height : this.window.height - 20 , 
			  left : 10, 
			  top : 10 
          };
		  
		  this.board3d.right =  this.board3d.width + 10;
		  
		  
		 
			
		  this.radar = { 
			height : 400, 
			width : 400, 
			top : 10, 
			left : this.board3d.width + 10 , 
			bottom : 310, 
            right : this.board3d.right +30 + 300 +  10
          }
		 
		 
		 this.status = {
			left : this.radar.left + 30, 
			top  : this.radar.top + this.radar.width + 10,
			
			width : this.radar.width,
		 }
		 
		 
	
	  },
	  
	  
	  clock : new THREE.Clock(),
	  
	  
}

pos3d = function ( x, z ) {
    return app.units.get3DPos( x, z );
}
