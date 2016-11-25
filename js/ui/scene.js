app.ui.scene = {
	
	
	init : function ( ) {
		
		var scene = new createjs.Stage("canvas");
		
		this.scene = scene;
		
		this.box = app.scene.box;
	},
	
	
	update : function ( ) {
		this.scene.update();
	},
	
	
	add : function ( obj , index ) {
		this.scene.addChildAt( obj, index || 0 );
		//this.scene.setChildIndex( obj, index || 0 );
	},
	
	
	sendToBack : function ( obj, index ) {
		this.scene.setChildIndex(obj, this.scene.children.length - 1 );		
	},
	
	remove : function ( ) {
		console.error( "not implemented" );
	}
	
	
}
