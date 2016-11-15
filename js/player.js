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
		
        //set x,y,z from options 
		var position = opt.position;
		for ( var i in position ) {
			obj.position[ i ] = position[ i ];
		}
	},
	
    
	cylinder : function ( item, opt ) {
	
		var material = app.materials.m4Player( opt, item.color ) //this.getMaterial();
		
		var geometry = new THREE.CylinderGeometry( 50, 50, opt.h, 29 );
		
		var obj = new THREE.Mesh( geometry, material );
		
		
		this.setPlace( item, obj,opt );
		
		item.group.add( obj );
	},
	
	sphere     : function (item, opt ) {
		var material = app.materials.m4Player( opt, item.color);
		
		var geometry = new THREE.SphereGeometry( opt.r, 13, 13, 0, Math.PI * 2, 0,  1.7* Math.PI / 3 );		
		
		var obj = new THREE.Mesh( geometry, material );
		
		
		this.setPlace( item, obj, opt );
		
		
		item.group.add( obj );
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
				
				//t : "smiley"
				
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
			
			/*
			eye1 : {
				type : "sphere",
				
				position : {
					y : 120,
					x : -30,
					z : -30
				},
				
				r : 10,
				
                c : "#ffffff"
			},
			eye2 : {
				type : "sphere",
				
				position : {
					y : 120,
					x : 0,
					z : -40
				},
				
				r : 10,
				
                c : "#ffffff"
            },
			//s*/
			
			
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
		
			a  : Math.random() * 50,
			b  : Math.random() * 50,
			
			y   : Math.random() * 10,
			
			
		}
        
        var temp = pos3d( target.a, target.b );
        target.x = temp.x;
        target.z = temp.z;
		
		target.dx = ( -item.obj.position.x + target.x ) / 700;
		target.dz = ( -item.obj.position.z + target.z ) / 700;
		target.dy = ( -item.obj.position.y + target.y ) / 700;
		
		target.steps = 0;
		
		
		item.target = target;
	},
	rotateDelta : function( item, dx, dy ) {
	
	
		item.obj.rotation.z += dy
		
		item.obj.rotation.x += dy
		
		item.obj.rotation.y += dy
		
		
		if ( !item.target ) 
			this.createTarget( item );
			
		if ( item.target.steps >= 700 ) 
			this.createTarget( item );
			
		item.target.steps++;
		
		item.obj.position.x += item.target.dx;
		
		
		item.obj.position.z += item.target.dz;
		
		item.obj.position.y += item.target.dy;
		
		
		//item.material1.map.offset.y += 0.00007;
        }
}
