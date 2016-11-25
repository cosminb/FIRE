		
app.trap = {

	add : function ( item ) {
		this.render(item );
		app.scene.add( item.obj );
		app.scene.add( item.obj3 );
		
		
		item.nextOp = 0.01;
		app.scene.add( item.obj2 );
		
		//app.scene.add( item.obj4 );
	},
	render : function (item) {
		var geometry = new THREE.CylinderGeometry( 85, 65, 200, 32,8, 1,true  );
		
		
		material2 = this.getMaterial(item.color, 1);
		
		item.mat  =material2;
		
		var cylinder = new THREE.Mesh( geometry, material2 );

		
		
		item.obj = cylinder;
		
		
		
		
		
		var geometry = new THREE.CylinderGeometry( 85, 65, 200, 32,8, 1,true  );
		
		
		material2 = this.getMaterial(item.color);
		
		item.mat2  =material2;
		
		var cylinder = new THREE.Mesh( geometry, material2 );

		
		
		item.obj2 = cylinder;
		
		
		
		var cube = new THREE.Mesh( new THREE.SphereGeometry( 50, 40, 20 ), new THREE.MeshNormalMaterial() );


		item.obj3 = cube;

		
		var cube = new THREE.Mesh( new THREE.SphereGeometry( 12 ), new THREE.MeshNormalMaterial() );


		item.obj4 = cube;

		
	},
	
	getMaterial : function ( i, wf) {
	
		map = flair;
		
		var material = new THREE.MeshBasicMaterial({
			
			map : map,
			transparent: true,
			depthTest: true,
			depthWrite: true,
			wireframe: false,
			
			opacity :1
		});

		
		
		
		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		material.map.repeat.set( 1,1 );
		material.depthWrite = false;


		material.side = THREE.DoubleSide;
		material.color = new THREE.Color("hsl("+((i*6)%360)+", 100%,40%)");// "#bada55");//0xff0000);
		return material;
	},
	
	rotateDelta : function( item,dx, dy ) {
		
		return;
		
		//this.obj.rotation.x += dx;
		item.obj.rotation.y += dx * 2;
		item.obj2.rotation.y -= dx/3;
		
		//item.mat.map.offset.x  += dx/2;
		//item.mat2.map.offset.x += dx/6;
		
		
		var dop = item.nextOp ///* Math.random();
		item.mat.opacity = item.mat.opacity + dop;
		item.mat2.opacity = item.mat2.opacity + dop;
		
		if( item.mat.opacity < -0.2 || item.mat.opacity > 1 ) item.nextOp = - item.nextOp;
		
		
		item.obj3.position.y += ( item.nextOp );
	},
	
	move : function ( item, x, y, z) {
	
      //*
      
        //var p = pos3d( x, z );
        
        item.obj.position.x = x;
		item.obj.position.y = y + 40;
		item.obj.position.z = z;
		
        item.obj2.position.x = x;
		item.obj2.position.y = y  +40;
		item.obj2.position.z = z;
		
        item.obj3.position.x = x;
		item.obj3.position.y = y + 20;
		item.obj3.position.z = z;
		
        item.obj4.position.x = x;
		item.obj4.position.y = y;
		item.obj4.position.z = z;
           
	},

	delteTrap : function(item){

	}

}
