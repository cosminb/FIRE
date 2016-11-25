app.ui.logs = {
	
	
	render : function ( ) {
		
		this.node = $("<div class='logs'>");
		
		this.node.css ( {
			
			"overflow" : "hidden",
			
			height : app.units.logs.height,
			
			position : "absolute",
			
			left : app.units.logs.left,
			
			top : app.units.logs.top,
			
			width : app.units.logs.width
			
		});
		
		$("body").append( this.node );
		
	},
	
	append : function ( step, logs ) {
		
		var header = this.getLog( "step", [ step ] );
		
		this.node.prepend( header + logs.join("" ));
		
		//this.node.scrollTop( this.node.get(0).scrollHeight )
	},
	
	
	reg : /\[\$(\d+)\]/g, 
	digitReg : /\d+/g,
	
	getLog : function( type, val ) {
		
		var tpls = this.tpls[ type ];
		
		var tpl = tpls[ Math.round( (tpls.length -1 ) * Math.random() ) ];
		
		var str = tpl.replace( this.reg, function ( all, path ) {
			return val[ path ];
		});
		
		str = str.replace( this.digitReg, function( all ) {
			return "<span class='digit'>" + all + "</span>";
		})
		return "<div class='log_"+type+" '>" + str + "</div>";
	},
	
	tpls : {
		
		step : [
			"step [$0]"
		],
		
		move : [
		
		"[$0] decided to move to ( [$1], [$2] )",
		" a fantastic move from [$0] : ( [$1], [$2] )",
		
		],
		sonar : [
		
		"[$0] looking around to see the winning move",
		"[$0] looking around with the sonar",
		
		],
		
	}
}
