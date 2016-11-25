
var test = {};


test.ui_z_movesMatrix = {
	isRelaiableAlloc : function ( ) {
		ui.z.movesMatrix.init();

		for ( var i = 0; i< 10000; i++ )

			var count = 0;
		var ian = window.setInterval( function ( ) {
			count++;
			if ( count > 10 ) window.clearInterval( ian )
				ui.z.movesMatrix.init(cfg.maxCol, cfg.maxRow, count + " asdfasd fasd fas fasd"+ " asdfasd fasd fas fasd"+ " asdfasd fasd fas fasd"+ " asdfasd fasd fas fasd"+ " asdfasd fasd fas fasd"+ " asdfasd fasd fas fasd"+ " asdfasd fasd fas fasd"+ " asdfasd fasd fas fasd"+ " asdfasd fasd fas fasd" + count );
		}, 3000 );
	},

	isGoodCluster : function ( ) {
		ui.z.movesMatrix.init();

		ui.z.movesMatrix.addMove( 1, 2,2,3,3 );

		ui.z.movesMatrix.addMove( 1, 2,2,2,3 );

		ui.z.movesMatrix.addMove( 1, 2,2,3,2 );


		ui.z.movesMatrix.addMove( 1, 2,3,3,2 );


		ui.z.movesMatrix.addMove( 1, 5,3,5,2 );


		var path = ui.z.movesMatrix.getPath( 1, 0, 0, 3, 3 );
		console.log( path );

		var path = ui.z.movesMatrix.getPath( 1, 0, 0, 5, 5 );
		console.log( path );


	},
}

test.ui_z_moves = {
	multipleLines : function ( ) {
		ui.z.main.init();
		ui.z.main.render()

		for ( var i = 0; i< 30; i++ ) {
			for ( var j = 0; j<30; j++ ) {

				this.addLine( i, j ) ;
			}
		}

	},

	addLine : function ( i, j ) {

		window.setTimeout( function( )  {

			ui.z.main.addMove( (i+j) %2 , i, j, i+1, j+1 );

		}, (i *20 + j) * 1000 );
	},
}

test.dt = {
	getRandomPoint: function(point) {
		var x = 1 - Math.floor(3 * Math.random());
		var y = 1 - Math.floor(3 * Math.random());
		return [point[0] + x, point[1] + y];
	},

	color : 0,
	start : [10,10],
	simulate: function() {
		do {
			var point = this.getRandomPoint(this.start);
		} while (
			((point[0] == this.start[0]) && (point[1] == this.start[1])) || (point[0] < 0 || point[0] > cfg.colCount) || (point[1] < 0 || point[1] > cfg.rowCount)
		);

		this.color = 1 - this.color

		ui.z.main.addMove(this.color, this.start[0], this.start[1], point[0], point[1]);

		this.start = point;

	},

	stop_start : false,
	go: function() {
		this.simulate();
		if ( !this.stop_start )
			window.setTimeout( function (  ) {
				test.dt.go();
			}, cfg.animationStep)

	},

	run : function ( ) {
		ui.z.main.init();
		ui.z.main.render();


		ui.f.main.init();
		ui.f.main.render();

		console.log( "yt") ;
		this.go();


var xxx = 0;

setInterval ( function ( ) {
	cfg.animationStep = xxx;
	xxx = 200 - xxx;
	}, 35000 );



	},

}



test.dt2 = {
	getRandomPoint: function(point) {
		var x = 1 - Math.floor(3 * Math.random());
		var y = 1 - Math.floor(3 * Math.random());
		return [point[0] + x, point[1] + y];
	},

	color : 0,
	start : [10,10],
	simulate: function() {
		do {
			var point = this.getRandomPoint(this.start);
		} while (
			((point[0] == this.start[0]) && (point[1] == this.start[1])) || (point[0] < 0 || point[0] > cfg.colCount) || (point[1] < 0 || point[1] > cfg.rowCount)
		);

		this.color = 1 - this.color

		ui.z.main.addMove(this.color, this.start[0], this.start[1], point[0], point[1]);
		ui.f.main.addMove(this.color, this.start[0], this.start[1], point[0], point[1]);

		this.start = point;

	},

	stop_start : false,
	go: function() {
		this.simulate();
		if ( !this.stop_start )
			window.setTimeout( function (  ) {
				test.dt2.go();
			}, cfg.animationStep)

	},

	run : function ( ) {

		arena.init();
		ui.z.main.init();
		ui.z.main.render();

		ui.clock.update();

		ui.rank.update();
	},

}



test.dt2.run()


