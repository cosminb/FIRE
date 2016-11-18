
app.scene = {

	
	renders : [],
	cameras : [],
	
	
	init : function ( ) {
	
	
		this.scene = new THREE.Scene()
		
		the.scene = this.scene;
		
		/*
		this.renderer = new THREE.WebGLRenderer({antialias:true} );
		this.renderer.setSize( window.innerWidth/2, window.innerHeight );
				
						
					
		document.body.appendChild( this.renderer.domElement );
		this.renderer.domElement.style.float = "left";
		
		
		this.renderer2 = new THREE.WebGLRenderer({antialias:true} );
		this.renderer2.setSize( window.innerWidth/2 - 10, window.innerHeight );

		/*
        this.renderer2.shadowMap.enabled = true;
        this.renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer2.gammaInput = true;
        this.renderer2.gammaOutput = true;
		*/
				
		//document.body.appendChild( this.renderer2.domElement );
		//this.renderer2.domElement.style.float = "left";
		
		
		this.scene.add( new THREE.AmbientLight( 0xeef0ff ) );

		
		/*
	
		var light = new THREE.DirectionalLight( 0xffddcc, 1 );
		light.position.set( 1, 0.75, 0.5 );
		this.scene.add( light );
		var light = new THREE.DirectionalLight( 0xccccff, 1 );
		light.position.set(200, 400, 500 );
		this.scene.add( light );
		*/


	},
	
	renderers : [],
	
	
	addRender : function (camera ) {
		var renderer = new THREE.WebGLRenderer({antialias:true} );
		renderer.setSize( window.innerWidth/2, window.innerHeight );
		
		
		
		document.body.appendChild( renderer.domElement );
		renderer.domElement.style.float = "left";
		
		//renderer.setClearColor(0xdfdfdf, 1);
		
		//renderer.shadowMapEnabled = true;
		//renderer.shadowMapType = THREE.PCFShadowMap;
		//soft shadowmap version
		//renderer.shadowMapType = THREE.PCFSoftShadowMap;
		
		
		this.renderers.push ( { render : renderer, camera : camera } );
	},
	
	render : function ( ) {
		for ( var i = 0; i< this.renderers.length; i++ ) {
			var rend = this.renderers[ i ];
			rend.render.render( this.scene, rend.camera );
			
		}
		//this.renderer.render( this.scene, this.camera );
		//this.renderer2.render( this.scene, this.camera2 );
	},
	
	addCamera : function ( ) {
		
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / (2 * window.innerHeight), 0.1, 10000 );
		this.camera.position.z = 1350;
		this.camera.position.y = 230;
		this.camera.position.x = 1700;
		
		
		this.camera2 = new THREE.OrthographicCamera( window.innerWidth / - 2 - 500, window.innerWidth / 2-500, window.innerHeight -500, window.innerHeight / - 1 -500, -100, 1000 );
		this.camera2 = new THREE.PerspectiveCamera( 45, window.innerWidth / (2 * window.innerHeight), 100, 10000 );

		this.camera2.position.y = 1600;
		this.camera2.position.x = 500;
		this.camera2.position.z = 100;
		
		/*
		var cameraHelper1 = new THREE.CameraHelper(this.camera);
		
		this.scene.add(cameraHelper1);
		
		
		var cameraHelper2 = new THREE.CameraHelper(this.camera2);
		
		//this.scene.add(cameraHelper2);
		*/

	},
	
	add  : function ( obj ) {
		this.scene.add( obj );
	}
}
