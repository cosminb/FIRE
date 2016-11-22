app.camera = {
    
    
    //position camera based on lookAt and a,b angles 
    //a : angle with xz 
    //b : angle in xz
	positionAtAngle : function ( x, z, far, a,b ) {
		
		var p1 = pos3d( x, z );
		
		a = a * Math.PI / 180;
		b = b * Math.PI / 180;
		
		var p2  = { 
			x : p1.x + far * Math.sin( a ) * Math.cos( b ),
			z : p1.z + far * Math.sin( a ) * Math.sin( b ),
			y :        far * Math.cos( a )
		}
		
		app.scene.camera2.position.copy( p2 );
		app.scene.camera2.lookAt( p1 );
	},
	

}

