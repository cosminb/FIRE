		
app.trap = {

	add : function ( item, i ) {
		this.render(item, i );
		app.scene.add( item.obj );
		app.scene.add( item.obj3 );
		
		
		item.nextOp = 0.01;
		app.scene.add( item.obj2 );
		
		//app.scene.add( item.obj4 );
	},
	render : function (item) {
		var geometry = new THREE.CylinderGeometry( 75, 25, 100, 32,8, 1,true  );
		
		
		material2 = this.getMaterial(i, 1);
		
		item.mat  =material2;
		
		var cylinder = new THREE.Mesh( geometry, material2 );

		
		
		item.obj = cylinder;
		
		
		
		
		
		var geometry = new THREE.CylinderGeometry( 75, 25, 100, 32,8, 1,true  );
		
		
		material2 = this.getMaterial(i);
		
		item.mat2  =material2;
		
		var cylinder = new THREE.Mesh( geometry, material2 );

		
		
		item.obj2 = cylinder;
		
		
		
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 20, 40, 20 ), new THREE.MeshNormalMaterial() );


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
			
			opacity :0.2
		});

		
		
		
		material.map.wrapS = THREE.RepeatWrapping;
		material.map.wrapT = THREE.RepeatWrapping;
		material.map.repeat.set( 1,1 );
		material.depthWrite = false;


		material.side = THREE.DoubleSide;
		material.color = new THREE.Color("hsl("+((i*30)%360 )+", 100%, 50%)");// "#bada55");//0xff0000);
		return material;
	},
	
	rotateDelta : function( item,dx, dy ) {
		//this.obj.rotation.x += dx;
		item.obj.rotation.y += dx * 2;
		item.obj2.rotation.y -= dx/3;
		
		//item.mat.map.offset.x  += dx/2;
		//item.mat2.map.offset.x += dx/6;
		
		
		item.mat.opacity = item.mat.opacity + item.nextOp ;
		item.mat2.opacity = item.mat2.opacity + item.nextOp;
		
		if( item.mat.opacity < -0.2 || item.mat.opacity > 1 ) item.nextOp = - item.nextOp;
		
		
		item.obj3.position.y = (item.obj3.position.y + item.nextOp );
	},
	
	move : function ( item, x, y, z ) {
	
		item.obj.position.x = x;
		item.obj.position.y = y  + 60;
		item.obj.position.z = z;
		
		
		item.obj2.position.x = x;
		item.obj2.position.y = y + 60;
		item.obj2.position.z = z;
		
		
		item.obj3.position.x = x;
		item.obj3.position.y = y + 30;
		item.obj3.position.z = z;
		
		item.obj4.position.x = x;
		item.obj4.position.y = y + 60;
		item.obj4.position.z = z;
		
		
		
	}

}