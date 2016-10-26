
app.dummy.line = {

	add : function ( ) {
		this.render();
		app.scene.add( this.obj );
	},
	
	
	render : function ( opt ) {
	
	
		x0 = 0;
		y0 = 0;
		
		x1 = 100;
		y1 = 440;
		
		x2 = 300;
		y2 = 0;
		
		SUBDIVISIONS = 20;
		geometry = new THREE.Geometry();
		curve = new THREE.QuadraticBezierCurve3();
		curve.v0 = new THREE.Vector3(x0, y0, 0);
		curve.v1 = new THREE.Vector3(x1, y1, 150);
		curve.v2 = new THREE.Vector3(x2, y2, 300);
		for (j = 0; j < SUBDIVISIONS; j++) {
		geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
		}

		material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 20 } );
		
		
		line = new THREE.Line(geometry, material);
		this.obj = line;


	},
	
	
	getMaterial : function ( i, wf) {
	
	
		var filename = "textures/flair.png";
		
		var map = new THREE.TextureLoader().load( filename  );
		
		
		
		var material = new THREE.MeshBasicMaterial({
			
			map : map,
			transparent: true,
			depthTest: true,
			depthWrite: true,
			wireframe: false,
			
			opacity :0.2
		});

		
		
		
		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		material.map.repeat.set( 1,1 );
		material.depthWrite = false;


		material.side = THREE.DoubleSide;
		material.color = new THREE.Color("hsl("+((i*30)%360 )+", 100%, 50%)");// "#bada55");//0xff0000);
		return material;
	},
}
