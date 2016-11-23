
app.floor = {
	add : function ( item ) {
	
		this.render( item );
		
		app.scene.add( item.obj );
	},

    planeW : 150, // pixels
    planeH : 150,
    numW   : 100, // how many wide (50*50 = 2500 pixels wide)
    numH   : 100, // how many tall (50*50 = 2500 pixels tall)
    

    colors : [ new THREE.Color("#000"), 
			   new THREE.Color(  "#040404"), 
                
                
                new THREE.Color(  "#bbb"), 
               
			   new THREE.Color(  "#ccc"), 												 
		],
        
	render : function ( item ) {

		
		var material = new THREE.MeshBasicMaterial({  
                shading: THREE.FlatShading, 
                side: THREE.DoubleSide ,
                vertexColors: THREE.VertexColors 
         })
		
		
		
		
		
		planeGeometry = new THREE.PlaneGeometry( 
                    this.numW* app.units.width, this.numH*app.units.height, 
                    this.numW, this.numH, 
                    material
                 )
                 

		
		this.planeGeometry = planeGeometry;
		
		var planeMesh = new THREE.Mesh(
			planeGeometry, 
			material
		);	
		
		planeMesh.rotation.z =  Math.PI / 2 ;		
		planeMesh.rotation.x =  Math.PI / 2 ;
		planeMesh.position.x = app.units.width  * this.numW  / 2 - app.units.width/2 ;
		planeMesh.position.y = 0;
		planeMesh.position.z = app.units.height  * this.numH / 2 - app.units.height / 2;
		
        
        
		this.plane = planeMesh;
		item.obj = planeMesh;
        
        this.updateBoard( game["Level 2 - Map 0 - Round 0"].board, 100 );
		
        
	},

    
    
	updateBoard : function ( board , width ) {
		var planeGeometry = this.plane.geometry; //planeGeometry;
		
		
		var l = planeGeometry.faces.length;
		
        var colors = this.colors;

        if ( !colors ) {
            var c1 = Math.round( Math.random() * 435345 ) %360;

            var c2 = Math.round( Math.random() * 435345 ) %360;

            var colors = [ new THREE.Color( "hsl(" + c1 + ", 12%, 80%)" ), 
                        new THREE.Color( "hsl(" + c1 + ", 24%, 85%)" ), 
                        new THREE.Color( "hsl(" + c2 + ", 2%, 20%)" ), 
                        new THREE.Color( "hsl(" + c2 + ", 4%, 25%)" ), 
                        ] ;		
		               
        }
					
                    
        var faceIndex = 0;
        for ( var i = 0; i< width; i++ ) {
            
            
            for ( var j = 0; j < width; j++ ) {
                
                  if ( board[ i][ j ] === "W" ) {
                      var ind = 0;
                  }
                  else ind = 1;
                  
                  
			planeGeometry.faces[ faceIndex ].color.copy( colors [ ind*2 ] ); 
			planeGeometry.faces[ faceIndex+1 ].color.copy( colors [ ind*2+1 ] );
			
            
            faceIndex += 2;
            
            //console.log( ind, faceIndex );
            }
        }
        /*
		for ( var i = 0; i < l; i+=2 ) {
			
			var ind =  Math.round( Math.random( ) );

			planeGeometry.faces[ i ].color.copy( colors [ ind*2 ] ); 
			planeGeometry.faces[ i+1 ].color.copy( colors [ ind*2+1 ] );
			
		}
        */
		
		planeGeometry.colorsNeedUpdate = true;
		
	},

}
	
