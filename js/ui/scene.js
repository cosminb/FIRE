app.ui.scene = {
	
	
	init : function ( ) {
		
		var scene = new createjs.Stage("canvas");
		
		this.scene = scene;
		
		this.box = app.scene.box;
	},
	
	
	update : function ( ) {
		this.scene.update();
	},
	
	
	add : function ( obj ) {
		this.scene.addChild( obj );
	},
	
	remove : function ( ) {
		console.error( "not implemented" );
	}
	
	
}
