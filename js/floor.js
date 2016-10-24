
app.floor = {
	add : function ( item ) {
	
		this.render( item );
		
		app.scene.add( item.obj );
	},
	
	
	
	render : function ( item ) {
	
		var planeW = 550; // pixels
		var planeH = 550; // pixels 
		var numW = 50; // how many wide (50*50 = 2500 pixels wide)
		var numH = 50; // how many tall (50*50 = 2500 pixels tall)
		var plane = new THREE.Mesh(
			new THREE.PlaneGeometry( planeW*numW, planeH*numH, planeW, planeH ),
			new THREE.MeshPhongMaterial( {
				color: "#fff",
				wireframe: false
			} )
		);	
		
		plane.rotation.x = Math.PI / 2 ;
		
		var grid = new THREE.GridHelper(30000, 100);
		
		grid.position.y = 20;

		
		item.obj = grid;
	}
}
	