
app.floor = {
	add : function ( item ) {
	
		this.render( item );
		
		app.scene.add( item.obj );
	},
	
	
	
	render : function ( item ) {
	
		var planeW = 100; // pixels
		var planeH = 100; // pixels 
		var numW = 50; // how many wide (50*50 = 2500 pixels wide)
		var numH = 50; // how many tall (50*50 = 2500 pixels tall)

		
		planeGeometry = new THREE.PlaneGeometry( numW* planeW, numH*planeH, numW, numH),
		
		planeGeometry.vertices.map(function (vertex) {
			///vertex.x += -.5 + Math.random();
			//vertex.z += Math.random()* 100  ;
			//vertex.z = -.5 + Math.random() ;
			return vertex;
		});
		
		planeGeometry.computeFaceNormals();
		
		
		var plane = new THREE.Mesh(
			planeGeometry, 
			
			new THREE.MeshBasicMaterial({
				color: new THREE.Color("#222"),
				wireframe: true,
				
				//opacity : 0.03
			})
		);	
		
		plane.rotation.x =  Math.PI / 2 ;
		
		plane.position.x = 2500;
		
		plane.position.y = 0;
		
		plane.position.z = 2500;
		
		
		
		
		var light = new THREE.DirectionalLight(0xffffff, 0.3);
		light.position.set(1, 1, 1);
		app.scene.scene.add(light);
		
		
		
		item.obj = plane;
	}
}
	
