
app.dummy.glow = {

	add : function ( ) {
		this.render();
		app.scene.add( this.obj );
	},
	
	
	render : function ( opt ) {
	
	
		var x = this.getMaterial() ; 
		
		var geo = new THREE.SphereGeometry( 200, 13, 13 ); //new THREE.SGeometry(575, 250, 1500, 32,8, 1,true  )
		var xobj = new THREE.Mesh( geo, x.material );
		
		xobj.attributes = x.attributes;
		
		
		var pos = pos3d( 25,25 );
		
		pos.y = 400;
		xobj.position.copy(   pos );
		
		this.obj = xobj;
		
		
		
		window.setInterval( function ( ) {
			
			var delta = app.scene.clock.getDelta();
		
			
			x.uniforms.viewVector.value  = app.scene.camera2.position
			
			x.uniforms.p.value += 0.001;
			
			if ( x.uniforms.p.value > 5 ) x.uniforms.p.value = 0;
		}, 1 );
		
		
	},
	
	vertexShader : `
	
		uniform vec3 viewVector;
		uniform float c;
		uniform float p;
		varying float intensity;
		void main() 
		{
			vec3 vNormal = normalize( normalMatrix * normal );
			vec3 vNormel = normalize( normalMatrix * viewVector );
			intensity = pow( c - dot(vNormal, vNormel), p );
			
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}
	`,
	
	fragmentShader : `
	
	uniform vec3 glowColor;
	varying float intensity;
	void main() 
	{
		vec3 glow = glowColor * intensity;
		
		float a = (glow.r + glow.g + glow.b) / 3.0;
		
		gl_FragColor = vec4( glow, 1.0 );
	}
		
	`,
	
	getMaterial : function ( color, wf) {
	
		//return new THREE.MeshNormalMaterial();
		
		var vertShader = this.vertexShader; 
		var fragShader = this.fragmentShader;
		
		
		
		var attributes = {}; // custom attributes
		
		var t = [];
		t[0] = new THREE.TextureLoader().load( "textures/shining2.jpg"   )
		t[1] = new THREE.TextureLoader().load( "textures/shining2.jpg"  )
		
		for ( var i in t ) { 
			t[ i ].wrapS = THREE.RepeatWrapping;
			t[i].wrapT = THREE.RepeatWrapping;
			t[i].repeat.set( 150,1 );
		}
		
		var uniforms = {    // custom uniforms (your textures)
			
			"c":   { type: "f", value: 0.2 },
			"p":   { type: "f", value: 2 },
			glowColor: { type: "c", value: new THREE.Color(color ||  0xffff00) },
			viewVector: { type: "v3", value: app.scene.camera2.position }
		};
		
		var material = new THREE.ShaderMaterial({
			
			uniforms: uniforms,
			//attributes: attributes,
			vertexShader: vertShader,
			fragmentShader: fragShader,
			
			side : THREE.FrontSide,
			transparent : true,
			
			blending: THREE.AdditiveBlending,
			
			
			
		});
		
		
		return { material : material, uniforms : uniforms, attributes : attributes };
		
		
	},
}
