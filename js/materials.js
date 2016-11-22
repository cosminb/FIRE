app.materials = {
    
     playerMaterial : function ( opt, hue ) {
         
		var map = ten;
		
		if ( opt.texture  == "smiley" ) map = smiley;
		
		
		var material = new THREE.MeshBasicMaterial({
			
			map : map,
			transparent: false,
			depthTest: true,
			depthWrite: true,
			wireframe: false,
			
			
		});

		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		material.map.repeat.set( 1,1 );


		material.side = THREE.DoubleSide;
		
		var i = hue; //(this.i+= 20) //Math.random() * 360;
		
		if ( opt.col ) 
            material.color = new THREE.Color(opt.col)
		else {
			
			i = i * 1234;
			var hue = i ;
			var sat = i % 30 + 70;
			var lum = i % 40 + 20;
            material.color =  new THREE.Color("hsl("+((hue  )%360 )+", 100%, 50%)");// "#bada55");//0xff0000);
		}
		
		return material;
		
     },
     i : 0,
}
