app.ui.info = {
	
	
	render : function ( ) {
		
		this.node = $("<div class='info'>/ACI/S24/5/14</div>");
		
		this.node.css ( {
			
			"overflow" : "hidden",
			
			position : "absolute",
			
			left : app.units.info.left,
			
			top : app.units.info.top,
			
			
		});
		
		$("body").append( this.node );
		
	},
	
	
}
