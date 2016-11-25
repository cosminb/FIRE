app.ui.info = {
	
	
	render : function ( ) {
		
		this.node = $("<div class='info'><div id='title'>/ACI/S24/5/14<div id='content'></d</div>");
		
		this.node.css ( {
			
			"overflow" : "hidden",
			
			position : "absolute",
			
			left : app.units.info.left,
			
			top : app.units.info.top,
			
			
		});
		
		$("body").append( this.node );
		
	},
	
    
    EndOfMatch : function ( ) {
        var that = this;
        
        window.setTimeout( function ( ) {
            
      $(that.node) .css( { opacity : 0 } ). animate( {
            left : 0, 
            top  : 0, 
            
            opacity : 0.3,
            width : app.units.window.width, 
            height : app.units.window.height,    
      });
        
        }, 1500 );
        
      
      
      
    },
    
    NewMatch : function ( ) {
      $(this.node) .animate( {
            left : app.units.info.left, 
            top  : app.units.info.top, 
            
            width : app.units.info.width, 
            height : app.units.info.height,    
      });
           
    },
    
    
    
	
}
