
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
		renderer.setSize( window.innerHeight, window.innerHeight );
		
		
		
		document.body.appendChild( renderer.domElement );
		renderer.domElement.style.float = "left";
		renderer.domElement.style.width =  window.innerHeight;
		renderer.domElement.style.height = window.innerHeight;

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
	
	add  : function ( obj ) {
		this.scene.add( obj );
	},
    
    renderFrame : function ( time ) {

        stats.begin();
        

        app.timeline.runAnimations();

        app.objects.eachTrap( function ( item, id ) {
            app.trap.rotateDelta( item, 0.05, 0.09 );
        });
        
        
        app.scene.render( );
        

        stats.end();
    }

}
