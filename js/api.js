app.api = {
    resetAll : function ( ) {
        //delete players 
        //remove all Bombs
        //
        
    },
    
    initMap : function ( ) {
        
    },
    
    
    players : {},
    
    addPlayer : function ( p, x, z, color ) {

        var pos = pos3d( x, z );
            
        this.players.initialPosition = pos;
        
        app.objects.addPlayer( "player_" + p, x, z, color );
    },
    
    addFrame : function ( ) {
      app.timeline.addScene();        
    },
    
    movePlayer : function ( p,  x, z, animationType ) {
        pos = pos3d( x, z );
        
        app.timeline.addToScene( p, { x: pos.x, y : pos.y, z : pos.z, point : { x , z }, animation : animationType || "walk" } )
    }, 
    
    killPlayer : function ( p, killMethod ) { 
        pos = this.initialPosition[ p ];
        
        app.timeline.addToScene( p, { x : pos.x, y : pos.y, z : pos.z, animation : "jump" } ); 
    },
    
    
    addBomb : function ( ) {
        
    },
    
    explodeBomb : function ( ) {
        
    },
    
    useSonar : function(){

    },

    playerWin : function(){

    },

}
