ABC.Preloader = function(game)
{
	ABC.GAME_WIDTH = 800;
	ABC.GAME_HEIGHT = 600;
};

ABC.Preloader.prototype = {

	preload: function()
	{
		this.stage.backgroundColor = '#B4D9E7';
                this.preloadStar = this.add.sprite((ABC.GAME_WIDTH-100)/2, (ABC.GAME_HEIGHT-100)/2, 'preloadStar');
                this.load.setPreloadSprite(this.preloadStar);
                this.load.image('start-background', 'assets/images/bg3.png');
                this.load.image('background1', 'assets/images/background1.png');
                this.load.image('button-pause', 'assets/images/pause_bttn.png');
                this.load.image('button-play', 'assets/images/play_bttn.png');
                this.load.image('levelBoard', 'assets/images/levelBoard.png');
                this.load.image('start', 'assets/images/ABC_click.png');
                this.load.image('next', 'assets/images/nxt.png');
                this.load.image('menu', 'assets/images/mnu.png');
                this.load.image('reload', 'assets/images/reload.png');
                this.load.image('game_finish', 'assets/images/game_finish.png');

                this.load.spritesheet('bonus', 'assets/images/bonusCandy.png', 100, 100);
                this.load.spritesheet('bonusMarks', 'assets/images/bonusMarks.png', 80, 80);
                this.load.spritesheet('button-start', 'assets/images/start_btn.png', 150, 50);
                this.load.spritesheet('button-ok', 'assets/images/ok.png', 150, 50);
                this.load.spritesheet('abcd', 'assets/images/alphabet.png', 100, 100);
                this.load.spritesheet('abcd1', 'assets/images/alphabet_letters1.png', 100, 100);
                this.load.spritesheet('levels', 'assets/images/levels.png', 64, 64);
                this.load.spritesheet('level_arrows', 'assets/images/level_arrows.png', 48, 48);
	},

	create: function()
	{
		this.state.start('MainMenu');
	}

};