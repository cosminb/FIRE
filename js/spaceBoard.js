app.spaceScene = {
	
	init : function ( ) {
		
		
		this.scene = new THREE.Scene()
		
		this.scene.add( new THREE.AmbientLight( 0xffffff ) );
		
		
		
		
		this.box = {
			
			left : app.units.board3d.left, 
			top  : app.units.board3d.top, 
			width  : app.units.board3d.width,
			height : app.units.board3d.height,
			
			position : "absolute",
			
			zIndex : 100
		}
		
		var renderer = new THREE.WebGLRenderer({antialias:true} );
		renderer.setSize(this.box.width,  this.box.height );
		
		document.body.appendChild( renderer.domElement );
		
		$(renderer.domElement ).css( this.box );
		
		this.renderer = renderer;
		
		
		this.camera = new THREE.PerspectiveCamera(90, this.box.width / this.box.height, 100, 100000 );
		

	},
	
	
	render : function ( ) {
		this.renderer.render( this.scene, this.camera );
	},
	
	add : function ( obj ) {
		
	},
	
	remove : function ( obj ) {
		
	},
}



app.arena3d = {
	
}


app.arena3d.players = {
	
	
	players : {},
	
	addPlayer : function ( player ) {
		
		var playerColor = player.color.base;
		
		var obj = this.render( playerColor );
		
		
		
		
		var id = player.id;
		
		this.players[ id ] = obj;
		
		this.movePlayer( id , 0,0,0 );
		
		
		app.spaceScene.scene.add( obj );
		
	},
	
	
	movePlayer : function ( id, x, y , z) {
		
		var player = this.players[ id ];
		
		player.position.x = x, 
		player.position.y = y;
		player.position.z = z;
		
		
		//player.updateCache( );
	},
	
	
	render : function ( color ) {
		var material =  app.materials.playerMaterial( {}, color);
		
		if ( !this.mesh ) 
			this.mesh = app.component3d.render( this.items  );
		
		
		var obj = new THREE.Mesh(this.mesh.clone(), material);
		
		
		obj.scale.set( 3,3,3); 
		return obj;
		
	},
	
	items : {
		
		head : {
			
			type : "sphere",
			
			position : {
				
				y : 100,
				
			},
			
			
			r : 50,
			
		},
		
		
		hand : {
			type : "sphere",
			
			position : {
				y : 40,
				x : -70,
				z : 0
			},
			
			r : 20
		},
		hand2 : {
			type : "sphere",
			
			position : {
				y : 40,
				x : 70,
				z : 0
			},
			
			r : 20
		},
		
		body : {
			
			type : "cylinder",
			
			position : {
				
				y : 0,
				
			},
			
			h : 20
		},
		
		body2 : {
			
			type : "cylinder",
			
			position : {
				
				y : 50,
				
			},
			
			h : 50
		},
		
	},
}


app.component3d = {

	
	setPlace : function (obj, opt ) {
		if ( !opt.position ) return;
		
		var position = opt.position;
		for ( var i in position ) {
			obj.position[ i ] = position[ i ];
		}
	},
	
	
	cylinder : function ( opt, material ) {
		
		var geometry = new THREE.CylinderGeometry( 50, 50, opt.h, 29 );
		
		var obj = new THREE.Mesh( geometry, material );
		
		
		this.setPlace( obj,opt );
		
		return obj;
	},
	
	sphere     : function ( opt, material ) {
		var material = this.material;
		var geometry = new THREE.SphereGeometry( opt.r, 13, 13, 0, Math.PI * 2, 0,  1.7* Math.PI / 3 );		
		
		var obj = new THREE.Mesh( geometry, material );
		
		this.setPlace( obj, opt );
		
		return obj;
	},
	
	circle : function (  opt, material ) {
		var material = this.material;
		var geometry = new THREE.CircleGeometry(opt.r, 32 );
		
		var obj = new THREE.Mesh( geometry, material );
		
		obj.rotation.x = Math.PI / 2;
		
		this.setPlace( obj, opt );
		
		return obj;
	},
	
	render : function ( items, material ) {
		
		
		material = this.material;
		var combined = new THREE.Geometry();
		
		
		//var items = this.components;
		
		
		for ( var i in items ) {
			
			var component = this[ items[ i ].type ]( items[ i ], material ) 
			
			component.updateMatrix();
			
			combined.merge(component.geometry, component.matrix);
			
		}
		
		
		return combined.clone();
		
		
		
		
	},
	
	material : {},
	
}

app.arena3d.traps = {
	
	
	traps : {},
	
	add : function ( trap ) {
		
		if ( this.traps[ trap.id ] ) return;
		
		var obj = this.render( );
		this.move( obj, trap.sx,80, trap.sz );
		
		app.spaceScene.scene.add( obj );
		
		
		this.traps[ trap.id ] = obj;
		
	},
	
	
	remove : function ( trapId ) {
		
		if ( !this.traps[ trapId ] ) return;
		
		
		
		app.spaceScene.scene.remove( this.traps[ trapId ] );
		
		
		delete this.traps[ trapId ];
	},
	
	
	removeAll : function ( ) {
		for ( var i in this.traps ) {
			app.spaceScene.scene.removeChild( this.traps[i] );
			delete this.traps[ i ];
		}
	},
	
	setTraps : function ( traps ) {
		for ( var i in traps ) {
			if ( !traps[ i] ) continue;
			if ( this.traps[ i ] ) continue;
			
			this.add( traps[ i ] );
		}
		
		for ( var i in this.traps ) {
			if ( traps[ i ] ) continue;
			
			this.remove( i );
			
			delete this.traps[ i ];
		}
	},
	
	
	disolve : function ( id, percent  ) {
		if ( !this.traps[id] ) return;
		
		this.traps[ id ] .scale.set(percent * 50 , percent * 50 , percent * 50 );
		
		this.traps[id].material.opacity = 1-percent;
	},
	
	render : function () {
		
		
		var sphere = new THREE.Mesh( new THREE.SphereGeometry( 80, 30, 20 ), 
									 new THREE.MeshNormalMaterial({
										side: THREE.DoubleSide,	
									   transparent : true,
									}) );
		
		return sphere;
		
	},
	
	
	move : function ( obj, x, y, z) {
		
		obj.position.x = x;
		obj.position.y = y ;
		obj.position.z = z;
		
	}	
}


app.arena3d.grid = {
	
	add : function (  ) {
		
		this.render();
		
		app.spaceScene.scene.add( this.obj );
	},
	
	
	remove : function ( ) {
		app.spaceScene.scene.remove( this.obj );
	},
	
	
	planeW : 150, // pixels
	planeH : 150,
	numW   : 101, // how many wide (50*50 = 2500 pixels wide)
	numH   : 101, // how many tall (50*50 = 2500 pixels tall)
	
	
	colors : [ new THREE.Color("#000"), 
				new THREE.Color(  "#040404"), 
				
				
				new THREE.Color("#bbb"), 
				
				new THREE.Color("#ccc"), 												 
			],
	
	render : function (  ) {
		
		
		var material = new THREE.MeshBasicMaterial({  
			shading: THREE.FlatShading, 
			side: THREE.DoubleSide ,
			vertexColors: THREE.VertexColors 
		})
		
		
		
		
		
		planeGeometry = new THREE.PlaneGeometry( 
				this.numW* app.units.width, this.numH*app.units.height, 
				this.numW, this.numH, 
				material
		);
		
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
		
		
		
		this.obj = planeMesh;
		
	},
	
	
	update : function ( board , boardSize ) {
		
		if ( this.numW != boardSize) {
			this.numW = boardSize
			this.numH = boardSize;
			
			this.remove( );
			this.add();
		}
		
		var planeGeometry = this.obj.geometry;
		
		
		var colors = this.colors;
				
		
		var faceIndex = 0;
		var colorIndex = 0;
		
		for ( var i = 0; i< boardSize; i++ ) {
			for ( var j = 0; j < boardSize; j++ ) {
				
				if ( board[i][j] === "W" ) {
					var colorIndex = 0;
				}
				else colorIndex = 1;
				
				
				planeGeometry.faces[ faceIndex ].color.copy( colors [ colorIndex*2 ] ); 
				planeGeometry.faces[ faceIndex+1 ].color.copy( colors [ colorIndex*2+1 ] );
				
				
				faceIndex += 2;
			}
		}

		planeGeometry.colorsNeedUpdate = true;
		
	},
}



app.arena3d.idol = {
	
	add : function ( ) {
		this.render();
		
		app.spaceScene.scene.add( this.obj );
	},
	
	move : function ( pos ) {
		this.obj.position.copy( pos );
	},
	
	render : function (  ) {
		
		
		var x = this.getMaterial() ; 
		
		var geo = new THREE.CylinderGeometry(80, 80, 2000, 32,8, 1,true  )
		var xobj = new THREE.Mesh( geo, x.material );
		
		xobj.attributes = x.attributes;
		
		
		var pos = { x :  0, y : 2000, z : 0 };
		
		xobj.position.copy(   pos );
		
		this.obj = xobj;
		
		this.obj.scale.set( 2, 2, 2);
		
		
		window.setInterval( function ( ) {
			
			x.uniforms.time.value += app.units.clock.getDelta();
			x.uniforms.hue.value += 0.1;
			if ( x.uniforms.hue.value > 565 ) x.uniforms.hue.value = 0;
		}, 1 );
		
		
	},
	
	vertexShader : `
	
		varying vec2 vUv;
		
		void main()
		{
			vUv = uv;
			vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
			gl_Position = projectionMatrix * mvPosition;
		}
	
	`,
	
	fragmentShader : `
		
		#ifdef GL_ES
		precision highp float;
		#endif
		
		uniform sampler2D tOne;
		
		varying vec2 vUv;
		
		
		uniform float baseSpeed;

		uniform float time;
		uniform float hue;
		
		
		
		float blendColorBurn(float base, float blend) {
			return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
		}
		
		
		
		float blendColorDodge(float base, float blend) {
			return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
		}
		
		
		
		float blendVividLight(float base, float blend) {
			return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
		}
		
		vec3 blendVividLight(vec3 base, vec3 blend) {
			return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
		}
		
		vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
			return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
		}
		
		
		
		vec3 rgb2hsv(vec3 c)
		{
			vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
			vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
			vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
			
			float d = q.x - min(q.w, q.y);
			float e = 1.0e-10;
			return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
		}
		
		vec3 hsv2rgb(vec3 c)
		{
			vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
			vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
			return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
		}
		
		
		
		void main(void)
		{
			vec3 c;
			
			vec2 uvTimeShift = vUv + vec2( -2, 0 ) * time * baseSpeed;
			
			vec2 uvTimeShift2 = vUv + vec2( 2.6, 0 ) * time * baseSpeed;
			
			
			vec3 _Color = vec3(0.4, 0.4, 0.0);
			
			vec4 Ca = texture2D(tOne, uvTimeShift);
			vec4 Cb = texture2D(tOne, uvTimeShift2);
			
			vec3 fragRGB ;
			vec3 fragHSV;
			float h;
			
			fragHSV = rgb2hsv(Ca.rgb);
			h = hue / 360.0;
			fragHSV.x *= h;
			
			fragHSV.x = mod(fragHSV.x, 1.0);
			fragRGB = hsv2rgb(fragHSV);
			
			Ca.rgb = fragRGB;
			
			
			fragHSV = rgb2hsv(Cb.rgb);
			//h = hue / 360.0;
			fragHSV.x *= h;
			
			fragHSV.x = mod(fragHSV.x, 1.0);
			fragRGB = hsv2rgb(fragHSV);
			
			Cb.rgb = fragRGB;
			
			
			
			
			c = blendVividLight( Ca.rgb ,Cb.rgb);  // blending equation
			
			float a = ( c.b + c.r + c.g );
			
			a = a < 0.8 ? 0.8: 1.0;
			/*
			* vec3 fragHSV = rgb2hsv(c);
			* float h = hue / 360.0;
			* fragHSV.x *= h;
			* 
			* fragHSV.x = mod(fragHSV.x, 1.0);
			* vec3 fragRGB = hsv2rgb(fragHSV);
			* 
			*/
			
			
			gl_FragColor= vec4(c, a);
		}
	
	`,
	
	getMaterial : function ( i, wf) {
		
		//return new THREE.MeshNormalMaterial();
		
		var vertShader = this.vertexShader; 
		var fragShader = this.fragmentShader;
		
		
		
		var attributes = {}; // custom attributes
		
		var t = [];
		t[0] = new THREE.TextureLoader().load( "textures/shine3.jpg"   )
		
		for ( var i in t ) { 
			t[ i ].wrapS = THREE.RepeatWrapping;
			t[i].wrapT = THREE.RepeatWrapping;
			t[i].repeat.set( 1,1 );
		}
		
		var uniforms = {    // custom uniforms (your textures)
			
			tOne: { type: "t", value: t[0] },
			
			baseSpeed:    { type: "f", value: 0.05 },
			time:         { type: "f", value: 1.0 },
			hue:         { type: "f", value: 10.0 },
		};
		
		var material = new THREE.ShaderMaterial({
			
			uniforms: uniforms,
			//attributes: attributes,
			vertexShader: vertShader,
			fragmentShader: fragShader,
			
			side : THREE.DoubleSide,
			transparent : true, 
			
			
		});
		
		
		return { material : material, uniforms : uniforms, attributes : attributes };
		
		
	},
	
	update : function ( boardSize ) {
		var xz = app.units.getX(  Math.floor( app.game.boardSize / 2 ) );
		
		this.obj.position.x = xz;
		this.obj.position.z = xz;
	}
}
