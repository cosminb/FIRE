app.camera = {
    
    
	moveSq : function (  lookAt, pos) {
		if ( lookAt.length )
        lookAt = pos3d( lookAt[0], lookAt[1] );
        
		if ( pos.length ) 
			pos = pos3d( pos[ 0], pos[ 1] );
		
        
        app.scene.camera2.lookAt( lookAt ) ;
		app.scene.camera2.position.x  = pos.x;
		app.scene.camera2.position.y  = pos.y;
		app.scene.camera2.position.z  = pos.z;
		
		console.log( app.scene.camera2.position, lookAt );
		xrender();
		
    },
	
	xmove : function ( y, a, b ) {
		
		
		a = a * Math.PI / 180;
		b = b * Math.PI / 180;
		
		var p1 = pos3d( 25, 25 );
		
		
		var p2 = new THREE.Vector3( );
		
		
		var cosa = Math.cos( a );
		var sina = Math.sin( a );
		var cosb = Math.cos( b );
		var sinb = Math.sin( b );
		
		p2.x = cosa * cosb * y + p1.x;
		p2.y = sina * y;
		p2.z = sina * cosb * y + p1.z;
		
		//app.scene.camera2.position.copy( p2 )
		app.scene.camera2.lookAt( p1 );
		
		app.scene.camera2.rotation.x = (90 - a ) * Math.PI / 180
		app.scene.camera2.rotation.y = (90 - b ) * Math.PI / 180
		
		//app.scene.camera2.updateProjectionMatrix(); 
		
		xrender();
		
		console.log( p1, p2, app.scene.camera2.getWorldPosition(), app.scene.camera2 );
		
	},
	move : function ( y, a, b , c) {
		
		var pos1 = pos3d( 0, 0 );
		
		var pos2 = pos3d( 50, 50 );
		
		
		var p1 = pos3d( 25, 25 );
		var p2 = pos3d( 25, 25 );
		
		
		p2.y = y;
		//p2.applyAxisAngle( new THREE.Vector3( 1, 0, 0 ), a * Math.PI / 180 );
		p2.applyAxisAngle( new THREE.Vector3( 0, 1, 0 ), b * Math.PI / 180 );
		//p2.applyAxisAngle( new THREE.Vector3( 0, 0, 1 ), c * Math.PI / 180 );
		
		
		console.log( p1, p2 );
		
		app.scene.camera2.lookAt( p1 );
		
		app.scene.camera2.position.copy(p2);

		/*
		app.scene.camera2.position.x = a;
		app.scene.camera2.position.y = b;
		app.scene.camera2.position.z = c;
		*/
		
		/*
		app.scene.camera2.rotation.x = 0; //copy( new THREE.Vector3( 0, 0 , 0 ) ) ;
		app.scene.camera2.rotation.y = 0;
		app.scene.camera2.rotation.z = 0;
		*/
		
		app.scene.camera2.updateProjectionMatrix(); 
		
		xrender();
		
	},
    
    
}

var ax = new THREE.Object3D();
var ay = new THREE.Object3D();

ax.add( ay );

