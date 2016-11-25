app.materials = {
    
     playerMaterial : function ( opt, color ) {
         
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
		
        material.color =  new THREE.Color( color );
		
		return material;
		
     },
     i : 0,
}
