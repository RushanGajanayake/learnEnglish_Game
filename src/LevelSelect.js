ABC.LevelSelect = function(game)
{
	this.pages;
	this.levelThumbsGroups;
	this.currentpage;
	this.previousPage;
	this.nextPage;

};

ABC.LevelSelect.prototype = {

	create: function(){

		this.add.sprite(0,0,'background1');
		this.pages = ABC.global.starsArray.length/(5*4);
		this.currentpage = Math.floor(ABC.global.levels/(5*4));

		if(this.currentpage>(this.pages-1))
		{
			this.currentpage = this.pages-1;
		}

		this.previousPage = this.add.button(100,550,"level_arrows",this.arrowclicked,this);
		this.previousPage.anchor.setTo(0.5);
		this.previousPage.frame = 0;

		this.nextPage = this.add.button(700,550,"level_arrows",this.arrowclicked,this);
		this.nextPage.anchor.setTo(0.5);
		this.nextPage.frame = 1;



		this.levelThumbsGroups = this.add.group();

		var levelwidth = (ABC.global.thumbWidth* 4)+(ABC.global.space*3) ;
		var levelheight =  (ABC.global.thumbHeight* 5) + (ABC.global.space*4) ;

		for(var i=0; i<this.pages; i++){

			var offsetx = ((ABC.GAME_WIDTH-levelwidth)/2); 
			var offsety = 60 ;

			for(var p=0; p<5 ; p++){
				for(var q=0; q<4; q++ ){

					var levelNumber = (p*4)+q+(i*20) ;
					var levelThumb = this.add.button(offsetx+(q*69),offsety+(p*69),"levels",this.levelClicked,this);

					levelThumb.frame = ABC.global.starsArray[levelNumber];
					levelThumb.levelNumber = levelNumber+1;

					this.levelThumbsGroups.add(levelThumb);

					if(ABC.global.starsArray[levelNumber]<4){
						var style = {
							font: "18px Arial",
							fill: "#ffffff"
						};
						var levelText = this.add.text(levelThumb.x+5,levelThumb.y+5,levelNumber+1,style);
						levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);
						this.levelThumbsGroups.add(levelText);
					}
				};
			};


		};
	},

	levelClicked:function(button){
		// alert(button.levelNumber);
		if(button.frame < 4){
			ABC.global.level = button.levelNumber;
			this.state.start("Word");
		}
	}

};