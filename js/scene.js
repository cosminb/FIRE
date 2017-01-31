app.ui.scene = {
	//utility to handle 2d graphics
	
	init : function ( ) {
		
        var c = $("#canvas").get( 0 );
        
        c.height = app.units.window.height;
        c.width = app.units.window.width;
        
		var scene = new createjs.Stage("canvas");
		
		this.scene = scene;
		
	},
	
	
	update : function ( ) {
		this.scene.update();
	},
	
	
	add : function ( obj , index ) {
		this.scene.addChildAt( obj, this.scene.children.length );
		//this.scene.setChildIndex( obj, index || 0 );
	},
	
	
	sendToBack : function ( obj, index ) {
		this.scene.setChildIndex(obj, this.scene.children.length - 1 );		
	},
	
	remove : function ( ) {
		console.error( "not implemented" );
	}
	
	
}
