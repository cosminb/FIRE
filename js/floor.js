
app.floor = {
	add : function ( item ) {
	
		this.render( item );
		
		app.scene.add( item.obj );
	},
	
	
	setupFloor : function ( board ) {
      for ( var i = 0; i<map.length; i++ ) {

        for ( var j = 0; j < map[ i ].length; j++ ) {
            
             this.set
        }
      }      
    },
	
	changeColors : function ( ) {
		var planeGeometry = this.plane.geometry; //planeGeometry;
		
		
		var l = planeGeometry.faces.length;
		
		
		var c1 = Math.round( Math.random() * 435345 ) %360;
		
		var c2 = Math.round( Math.random() * 435345 ) %360;
		
		
		var colors = [ new THREE.Color( "hsl(" + c1 + ", 12%, 80%)" ), 
						new THREE.Color( "hsl(" + c1 + ", 24%, 85%)" ), 
						new THREE.Color( "hsl(" + c2 + ", 2%, 20%)" ), 
						new THREE.Color( "hsl(" + c2 + ", 4%, 25%)" ), 
						] ;
														 
		for ( var i = 0; i < l; i+=2 ) {
			
			var ind =  Math.round( Math.random( ) );
			//ind = 1;
			//planeGeometry.faces[ i ].materialIndex = ind;
			//planeGeometry.faces[ i+1 ].materialIndex = ind;
			
			planeGeometry.faces[ i ].color.copy( colors [ ind*2 ] ); 
			planeGeometry.faces[ i+1 ].color.copy( colors [ ind*2+1 ] );
			
			//setRGB( Math.random(),
													 //Math.random(), Math.random())
			
			//planeGeometry.faces[ i+1 ].color = colors[ ind ].clone();
		}
		
		
		planeGeometry.__dirtyColors = true;
		planeGeometry.colorsNeedUpdate = true;
		///this.planeGeometry = planeGeometry;
		
	},
	render : function ( item ) {
	
		var planeW = 150; // pixels
		var planeH = 150; // pixels 
		var numW = 50; // how many wide (50*50 = 2500 pixels wide)
		var numH = 50; // how many tall (50*50 = 2500 pixels tall)

		
		materialEven = new THREE.MeshBasicMaterial({color:new THREE.Color( "#162" ) , side: THREE.DoubleSide})
		
		materialOdd = new THREE.MeshPhongMaterial( { color: new THREE.Color( "#111" ), side: THREE.DoubleSide , shading: THREE.FlatShading, shininess: 6 } );
		materialOdd = new THREE.MeshBasicMaterial( { color: new THREE.Color( "#111" ), side: THREE.DoubleSide } );
				
		materials = [materialEven, materialOdd,]
		
		
		var mat = new THREE.MeshBasicMaterial( 
		{ color: 0xffffff, shading: THREE.FlatShading, side: THREE.DoubleSide ,
			vertexColors: THREE.VertexColors } )
		
		
		var colors = [ new THREE.Color("#000"), 
										
					   new THREE.Color(  "#bbb"), 
					   
					   new THREE.Color(  "#040404"), 
					   
					   new THREE.Color(  "#ccc"), 
														 
		];
		
		
		
		
		planeGeometry = new THREE.PlaneGeometry( numW* planeW, numH*planeH, numW, numH, materials)
		planeGeometry.dynamic = true;
		
		
		var l = planeGeometry.faces.length;
		
		for ( var i = 0; i < l; i+=2 ) {
			
            var ind =  Math.round( Math.random( ) );
// 			ind = 2;
// 			planeGeometry.faces[ i ].materialIndex = ind;
// 			planeGeometry.faces[ i+1 ].materialIndex = ind;
// 			
			planeGeometry.faces[ i ].color.copy( colors[ ind ] ) ;
			planeGeometry.faces[ i+1 ].color.copy( colors[ ind+2 ] ) ;
			
			
		}

		this.planeGeometry = planeGeometry;
		
		console.log( planeGeometry );
		planeGeometry.sortFacesByMaterialIndex();
		
		var plane = new THREE.Mesh(
			planeGeometry, 
			mat
			//new THREE.MultiMaterial(materials)
		);	
		
		plane.rotation.z =  Math.PI / 2 ;
		
		plane.rotation.x =  Math.PI / 2 ;
		
		plane.position.x = planeW * numW  / 2 - planeW/2 ;
		
		plane.position.y = 0;
		
		plane.position.z = planeH * numH / 2 - planeH / 2;
		
		
		
		
		var light = new THREE.DirectionalLight(0xffffff, 0.3);
		light.position.set(1, 1, 1);
		app.scene.scene.add(light);
		
		
		this.plane = plane;
		item.obj = plane;
	}
}
	
