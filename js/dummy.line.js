
app.dummy.line = {

	add : function ( ) {
		this.render();
		app.scene.add( this.obj );
	},
	
	move : function ( pos ) {
        
      this.obj.position.copy( pos );
    },
	render : function ( opt ) {
	
	
		var x = this.getMaterial() ; 
		
		var geo = new THREE.CylinderGeometry(130, 130, 4500, 32,8, 1,true  )
		var xobj = new THREE.Mesh( geo, x.material );
		
		xobj.attributes = x.attributes;
		
		
		var pos = pos3d( 0,0 );
		
		pos.y = 200;
		xobj.position.copy(   pos );
		
		this.obj = xobj;
		
		
		
		window.setInterval( function ( ) {
			
			var delta = app.scene.clock.getDelta();
			x.uniforms.time.value += delta;
            x.uniforms.hue.value += 0.01;
            if ( x.uniforms.hue.value > 360 ) x.uniforms.hue.value = 0;
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
		uniform sampler2D tSec;
		
		varying vec2 vUv;
		
		
		uniform float baseSpeed;
		uniform float noiseScale;
		uniform float alpha;
		uniform float time;
		uniform float hue;
		
		
		float blendReflect(float base, float blend) {
			return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
		}
		
		vec3 blendReflect(vec3 base, vec3 blend) {
			return vec3(blendReflect(base.r,blend.r),blendReflect(base.g,blend.g),blendReflect(base.b,blend.b));
		}
		
		vec3 blendReflect(vec3 base, vec3 blend, float opacity) {
			return (blendReflect(base, blend) * opacity + base * (1.0 - opacity));
		}		
		vec3 blendGlow(vec3 base, vec3 blend) {
			return blendReflect(blend,base);
		}
		
		vec3 blendGlow(vec3 base, vec3 blend, float opacity) {
			return (blendGlow(base, blend) * opacity + base * (1.0 - opacity));
		}

		
		float blendAdd(float base, float blend) {
			return min(base+blend,1.0);
		}
		
		vec3 blendAdd(vec3 base, vec3 blend) {
			return min(base+blend,vec3(1.0));
		}
		
		vec3 blendAdd(vec3 base, vec3 blend, float opacity) {
			return (blendAdd(base, blend) * opacity + base * (1.0 - opacity));
		}
		
		
		float blendColorBurn(float base, float blend) {
			return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
		}
		
		vec3 blendColorBurn(vec3 base, vec3 blend) {
			return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
		}
		
		vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
			return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
		}
		
		
		
		float blendColorDodge(float base, float blend) {
			return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
		}
		
		vec3 blendColorDodge(vec3 base, vec3 blend) {
			return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
		}
		
		vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
			return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
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
		
		vec4 toGrayscale(in vec4 color)
		{
			float average = (color.r + color.g + color.b) / 3.0;
			return vec4(average, average, average, 1.0);
		}
		
		vec4 colorize(in vec4 grayscale, in vec4 color)
		{
			return (grayscale * color);
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
			vec4 Cb = texture2D(tSec, uvTimeShift2);
			
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
			 h = hue / 360.0;
			fragHSV.x *= h;
			
			fragHSV.x = mod(fragHSV.x, 1.0);
			fragRGB = hsv2rgb(fragHSV);

            Cb.rgb = fragRGB;
            
            
            
            
			c = blendVividLight( Ca.rgb ,Cb.rgb);  // blending equation
			
            float a = ( c.b + c.r + c.g ) /3.0;
            
            a = a < 0.4 ? a : a + 0.4;
            /*
			vec3 fragHSV = rgb2hsv(c);
			float h = hue / 360.0;
			fragHSV.x *= h;
			
			fragHSV.x = mod(fragHSV.x, 1.0);
			vec3 fragRGB = hsv2rgb(fragHSV);
			
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
		t[0] = new THREE.TextureLoader().load( "textures/shining2.jpg"   )
		t[1] = new THREE.TextureLoader().load( "textures/shining2.jpg"  )
		
		for ( var i in t ) { 
			t[ i ].wrapS = THREE.RepeatWrapping;
			t[i].wrapT = THREE.RepeatWrapping;
			t[i].repeat.set( 1,1 );
		}
		
		var uniforms = {    // custom uniforms (your textures)
			
			tOne: { type: "t", value: t[0] },
			tSec: { type: "t", value: t[1] },
			
			baseSpeed:    { type: "f", value: 0.05 },
			noiseScale:   { type: "f", value: 0.5337 },
			alpha:        { type: "f", value: 1.0 },
			time:         { type: "f", value: 1.0 },
			hue:         { type: "f", value: 10.0 },
		};
		
		var material = new THREE.ShaderMaterial({
			
			uniforms: uniforms,
			//attributes: attributes,
			vertexShader: vertShader,
			fragmentShader: fragShader,
			
			side : THREE.DoubleSide,
			//transparent : true, 
			
			
		});
		
		
		return { material : material, uniforms : uniforms, attributes : attributes };
		
		
	},
}
