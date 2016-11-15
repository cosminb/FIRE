
app.floor = {
	add : function ( item ) {
	
		this.render( item );
		
		app.scene.add( item.obj );
	},
	
	
	
	render : function ( item ) {
	
		var planeW = 150; // pixels
		var planeH = 150; // pixels 
		var numW = 50; // how many wide (50*50 = 2500 pixels wide)
		var numH = 50; // how many tall (50*50 = 2500 pixels tall)

		
		materialEven = new THREE.MeshBasicMaterial({color:new THREE.Color( "#162" ) , side: THREE.DoubleSide})
		materialOdd = new THREE.MeshBasicMaterial({color: new THREE.Color( "#111" ), side: THREE.DoubleSide})
		
		materialOdd = new THREE.MeshPhongMaterial( { color: new THREE.Color( "#111" ), side: THREE.DoubleSide , shading: THREE.FlatShading, shininess: 6 } );
		
		materialOdd3 = new THREE.MeshBasicMaterial({color: 0x444464, side: THREE.DoubleSide})
		
		materials = [materialEven, materialOdd, materialOdd3]
		
		
		planeGeometry = new THREE.PlaneGeometry( numW* planeW, numH*planeH, numW, numH, materials),
		
		planeGeometry.vertices.map(function (vertex) {
			///vertex.x += -.5 + Math.random();
			//vertex.z += Math.random()* 400  ;
			//vertex.z = -.5 + Math.random() ;
			return vertex;
		});
		
		//planeGeometry.computeFaceNormals();
		
		var l = planeGeometry.faces.length;
		
		for ( var i = 0; i < l; i+=2 ) {
			var ind =  Math.round( Math.random( ) );
			
			planeGeometry.faces[ i ].materialIndex = ind;
			planeGeometry.faces[ i+1 ].materialIndex = ind;
		}
				
				
		
		
		var plane = new THREE.Mesh(
			planeGeometry, 
			new THREE.MultiMaterial(materials)
			/*
			new THREE.MeshBasicMaterial({
				color: new THREE.Color("#222"),
				wireframe: true,
				
				//opacity : 0.03
			})
			*/
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
	
