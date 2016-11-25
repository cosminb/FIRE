
app.scene = {

	
	renders : [],
	cameras : [],
	
	
	init : function ( ) {
	
	
		this.scene = new THREE.Scene()
		
		the.scene = this.scene;

		this.scene.add( new THREE.AmbientLight( 0xeef0ff ) );

	},
	
	renderers : [],
	
	
	addRender : function (camera , box ) {
		var renderer = new THREE.WebGLRenderer({antialias:true} );
		renderer.setSize(app.units.board3d.width,  app.units.board3d.width );
		
		
		
		document.body.appendChild( renderer.domElement );
		
		$(renderer.domElement ).css( {
			"position" : "absolute",
			 width :   app.units.board3d.width,
			 height : app.units.board3d.width,
			 left : 10,
			 top : 10
		});
		

		this.renderers.push ( { render : renderer, camera : camera } );
	},
	
	render : function ( ) {
		for ( var i = 0; i< this.renderers.length; i++ ) {
			var rend = this.renderers[ i ];
			rend.render.render( this.scene, rend.camera );
			
		}
	},
	
	addCamera : function ( ) {
		this.camera2 = new THREE.PerspectiveCamera(90, 1, 100, 100000 );
	},
	
	add  : function ( obj, index ) {
		this.scene.add( obj );
		
		if ( index !== undefined)
			this.scene.setChildIndex(obj, index );
	},
    
    renderFrame : function ( time ) {
        

        app.timeline.runAnimations();

        app.objects.eachTrap( function ( item, id ) {
            app.trap.rotateDelta( item, 0.05, 0.09 );
        });
        
        
        app.scene.render( );
    }

}
