app.ui.scene = {
	
	
	init : function ( ) {
		
		var stage = new createjs.Stage("canvas");
		
		this.stage = stage;
		
		
		var circle = new createjs.Shape();
		circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
		circle.x = 100;
		circle.y = 100;
		this.add( circle ) ; //stage.addChild(circle);
	},
	
	update : function ( ) {
		this.stage.update();
	},
	
	
	add : function ( obj ) {
		this.stage.addChild( obj );
	}
	
}
