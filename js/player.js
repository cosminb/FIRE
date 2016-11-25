app.player = {

	
	components : {
		
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
		
		base : {
			type : "circle",
			
			r : 60, 
			
			position : {
				y : 0
			}
		},
		
	},
	
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
	
    
	cylinder : function ( item, opt, material ) {
	
		var geometry = new THREE.CylinderGeometry( 50, 50, opt.h, 29 );
		
		var obj = new THREE.Mesh( geometry, material );
		
		
		this.setPlace( item, obj,opt );
		
		return obj;
	},
	
	sphere     : function (item, opt, material ) {
		var material = this.material;
		var geometry = new THREE.SphereGeometry( opt.r, 13, 13, 0, Math.PI * 2, 0,  1.7* Math.PI / 3 );		
		
		var obj = new THREE.Mesh( geometry, material );
		
		this.setPlace( item, obj, opt );
		
		return obj;
	},
	
	circle : function ( item, opt, material ) {
		var material = this.material;
		var geometry = new THREE.CircleGeometry(opt.r, 32 );
		
		var obj = new THREE.Mesh( geometry, material );
		
		obj.rotation.x = Math.PI / 2;
		
		this.setPlace( item, obj, opt );
		
		return obj;
	},
	
	render : function ( item ) {
	
		this.material =  app.materials.playerMaterial( {}, item.color);

		var combined = new THREE.Geometry();
		
		
		var items = this.components;
		
		
		for ( var i in items ) {
		
			var component = this[ items[ i ].type ](item, items[ i ], this.material ) 
		
			component.updateMatrix();
		
			combined.merge(component.geometry, component.matrix);
			
		}
		
		mesh = new THREE.Mesh(combined.clone(), this.material);

		item.obj = mesh;
		
		
	},
	

}
