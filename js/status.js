app.status = {
	
	render : function ( ) {
		
		
		var players = app.players.items;
		
		var playersContent = "";
		for ( var i in players ) {
			var player = players[ i ];
			playersContent += `
				<tr class='player' id='player_${player.id}' style='color:${player.color.base}'>
				<td class='name'>${player.name}</td>
				<td style='width:24pt'><div class='direction'>&#10146;</div></td>
				<td class='position'></td>
				<td>&nbsp;</td>
				</tr>`
		}
		var html = "<table>"+playersContent+"</table>";
		
		$(html).css( {
			
			position : "absolute",
			left : app.units.status.left, 
			
			width : app.units.status.width,
			
			top  : app.units.status.top
		}).appendTo( "body" );
	},
	
	addPlayer : function ( player ) {
		var html = "<div id='player_" + player.id + "'></div>"
	},
	
	updatePlayer : function ( player ) {
		var node = $("#player_" + player.id );
		
		if ( player.removed ) 
			node.addClass( "player_removed" )
		else 
			node.removeClass( "player_removed" )
			
		$(".direction", node).css( "transform", "rotate("+this.degs[ player.direction ] +")" );
		
		$(".position", node ).text( "[" + player.x + " , " + player.y  + "]" );
	},
	
	degs : {
		
		"1__0" : "0deg",
		"1__1" : "45deg",
		"0__1" : "90deg",
		"-1__1" : "135deg",
		"-1__0" : "180deg",
		"-1__-1" : "225deg",
		"0__-1"  : "275deg",
		"1__-1"  : "320deg"
	}
}
