app.player = {

	add : function ( item ) {
		this.render(item );
		app.scene.add( item.obj );
				
	},
	
	move : function ( item, x, y, z ) {
	
		item.obj.position.x = x;
		item.obj.position.y = y;
		item.obj.position.z = z;
		
	},
	
    
	setPlace : function (item,  obj, opt ) {
		if ( !opt.position ) return;
		
		var position = opt.position;
		for ( var i in position ) {
			obj.position[ i ] = position[ i ];
		}
	},
	
    
	cylinder : function ( item, opt ) {
	
		var material = this.getMaterial();
		
		var geometry = new THREE.CylinderBufferGeometry( 50, 50, opt.h, 29 );
		
		var obj = new THREE.Mesh( geometry, material );
		
		
		this.setPlace( item, obj,opt );
		
		
		item.material1 = material;
		
		item.group.add( obj );
	},
	
	
	sphere     : function (item, opt ) {
		var material = this.getMaterial( opt.c );
		
		var geometry = new THREE.SphereBufferGeometry( opt.r, 13, 13, 0, Math.PI * 2, 0,  1.7* Math.PI / 3 );		
		
		var obj = new THREE.Mesh( geometry, material );
		
		
		this.setPlace( item, obj, opt );
		
		item.group.add( obj );
		
		
	},
	
	
	getMaterial : function ( col) {
		var map = ten;
		
		
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
		
		var i = (this.i+= 20) //Math.random() * 360;
		
		if ( col ) 
            material.color = new THREE.Color(col)
		else
            material.color =  new THREE.Color("hsl("+((i  )%360 )+", 100%, 70%)");// "#bada55");//0xff0000);
		
		
		return material;
		
	},
	
	i : 20,
	
	render : function ( item ) {
	
		var group = new THREE.Group();
		
		item.group = group;
		
		
		var items = {
		
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
					x : 170,
					z : 0
				},
				
				r : 20
			},
			
						
			eye1 : {
				type : "sphere",
				
				position : {
					y : 140,
					x : -70,
					z : 0
				},
				
				r : 10,
				
c : "#ffffff"
			},
			eye2 : {
				type : "sphere",
				
				position : {
					y : 140,
					x : 170,
					z : 0
				},
				
				r : 20,
				
c : "#ffffff"
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
			}
		
			
		}
		
		
		for ( var i in items ) {
		
			this[ items[ i ].type ](item, items[ i ] ) 
		}
		
		
		item.obj = group;
		
	},
	
	
	createTarget : function ( item ) {
	
		var target = {
		
			x  : Math.random() * 2000,
			z  : Math.random() * 2000,
			
			y   : Math.random() * 600,
			
			
		}
		
		target.dx = ( -item.obj.position.x + target.x ) / 300;
		target.dz = ( -item.obj.position.z + target.z ) / 300;
		target.dy = ( -item.obj.position.y + target.y ) / 300;
		
		target.steps = 0;
		
		
		item.target = target;
	},
	rotateDelta : function( item, dx, dy ) {
	
	
		item.obj.rotation.y += dy
		
		
		if ( !item.target ) 
			this.createTarget( item );
			
		if ( item.target.steps >= 300 ) 
			this.createTarget( item );
			
		item.target.steps++;
		
		item.obj.position.x += item.target.dx;
		
		
		item.obj.position.z += item.target.dz;
		
		item.obj.position.y += item.target.dy;
		
		
		
		/*
		item.spotLight.position.x = item.obj.position.x + 3 * item.target.dx
		item.spotLight.position.z = item.obj.position.z + 3 * item.target.dz
		item.spotLight.position.y = item.obj.position.y + 3 * item.target.dy
		*/
		item.material1.map.offset.y += 0.0001;
			
		//item.obj.rotation.x = 0.5 - Math.random();
		//this.obj.rotation.z += dz
		///*
		//this.obj2.position.y = 150;
		//this.obj.position.y = 240;
		
		
		//this.obj.position.z = 0;
		//*/
		//this.obj.rotation.x += dx;
		//this.obj.rotation.y += dy;
	}
}
