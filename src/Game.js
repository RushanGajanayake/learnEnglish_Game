
ABC.Game = function(game)
{
	this._player = null;
	this._ABCgroup = null;
	this.spawnTimer = 0;
	this.frontStyle = null;

	this.candyspeed = 450;
	this.letterSpeed = 325;
	this.bonusTimer = 0;

	ABC._scoreText = null;
	ABC._score = 0;
	ABC._health = 0;
	ABC.timeing = null;
	ABC.sec = 0;

	ABC.words= null;
	this.wrd = '';
	this.givenWord = 'APPLE';
	this.lengthOfWord = 0;
	this.lengthOfArray = 0;

	ABC.counter = 0;


	var abcdf = [];
	this.letterPos = [];
	

};


ABC.Game.prototype = {

	
	create: function()
	{
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = 150;


		this.add.sprite(0,0,'background1');
		this.add.button(500,5,'button-pause',this.managePause,this);
		this.add.sprite(0, ABC.GAME_HEIGHT-160, 'floor');

		var splitword = this.givenWord.split("");
		this.lengthOfWord = splitword.length;
		

		for (var i = 0; i < splitword.length; i++) {
					// alert(splitword[i]);
			switch(splitword[i])
				{
					case 'A': this.letterPos.push(0); break;
					case 'B': this.letterPos.push(1); break;
					case 'C': this.letterPos.push(2); break;
					case 'D': this.letterPos.push(3); break;
					case 'E': this.letterPos.push(4); break;
					case 'F': this.letterPos.push(5); break;
					case 'G': this.letterPos.push(6); break;
					case 'H': this.letterPos.push(7); break;
					case 'I': this.letterPos.push(8); break;
					case 'J': this.letterPos.push(9); break;
					case 'K': this.letterPos.push(10); break;
					case 'L': this.letterPos.push(11); break;
					case 'M': this.letterPos.push(12); break;
					case 'N': this.letterPos.push(13); break;
					case 'O': this.letterPos.push(14); break;
					case 'P': this.letterPos.push(15); break;
					case 'Q': this.letterPos.push(16); break;
					case 'R': this.letterPos.push(17); break;
					case 'S': this.letterPos.push(18); break;
					case 'T': this.letterPos.push(19); break;
					case 'U': this.letterPos.push(20); break;
					case 'V': this.letterPos.push(21); break;
					case 'W': this.letterPos.push(22); break;
					case 'X': this.letterPos.push(23); break;
					case 'Y': this.letterPos.push(24); break;
					case 'Z': this.letterPos.push(25); break;

				}

				var extraWord = Math.floor(Math.random()*26);
				this.letterPos.push(extraWord);
			};		
		// alert(this.lertterPos);


		this.lengthOfArray = this.letterPos.length;

		this.abcdf = ['A','B','C','D','E'];
		// this.abcdf = [

		// 	letterA = this.game.add.sprite(0,'abcd'),
		// 	letterB = this.game.add.sprite(1,'abcd'),
		// 	letterC = this.game.add.sprite(2,'abcd'),
		// 	letterD = this.game.add.sprite(3,'abcd'),
		// 	letterE = this.game.add.sprite(4,'abcd')

		// ];


		this.spawnTimer = 0;


		this.fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };

    	ABC._scoreText = this.add.text(120, 20, "0", this.fontStyle);
    	ABC.timeing = this.add.text(270, 20, "0", this.fontStyle);
    	ABC.words = this.add.text(270, 300, "", this.fontStyle);

    	this._ABCgroup = this.add.group();
    	this.spawnLetter(this);
	},

	managePause: function()
	{
		this.game.paused = true;
    	var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this.fontStyle);
    	this.input.onDown.add(function(){
        	pausedText.destroy();
        	this.game.paused = false;
    	}, this);
	},

	update: function()
	{
		this.spawnTimer += this.time.elapsed;
		this.bonusTimer += this.time.elapsed;
		// this.birdTime += this.time.elapsed;
		

		if(this.spawnTimer > 500)
		{
			this.spawnTimer = 0;
			this.spawnLetter(this);


			ABC.sec += 1;
			ABC.timeing.setText(ABC.sec);
		}

		if(this.bonusTimer >875)
		{
			this.bonusTimer = 0;
			this.spawnBonus(this);
		}
	},

	spawnLetter: function(game)
	{
		var dropPosX = Math.floor(Math.random()*ABC.GAME_WIDTH);
		var dropOffset = [300,200,150,250,150];
		var dropPosY = Math.floor(Math.random()*5);
		var candytype = Math.floor(Math.random()*this.lengthOfArray);
		var candy = game.add.sprite(-10,dropOffset[dropPosY],'abcd1');

		candy.animations.add('anim', [this.letterPos[candytype]], 10, true);
		candy.animations.play('anim');

		game.physics.enable(candy, Phaser.Physics.ARCADE);
		candy.inputEnabled = true;
		candy.events.onInputDown.add(function(){this.clickLetter(candy,this.letterPos[candytype]);},this);

		candy.checkWorldBounds = true;
		candy.events.onOutOfBounds.add(this.remover, this);


		candy.body.velocity.x = Math.cos(100) * game.letterSpeed;
    	candy.body.velocity.y = Math.sin(100) * game.letterSpeed;

    	// candy.finalPositionX = 0;

	},

	spawnBonus: function(game)
	{
		var dropPosX = Math.floor(Math.random()*ABC.GAME_WIDTH);
		var dropOffset = [140,250,175,225,150];
		var dropPosY = Math.floor(Math.random()*5);
		var bonus = game.add.sprite(-5,dropOffset[dropPosY],'bonus');

		bonus.animations.add('animation',[dropPosY],10, true);
		bonus.animations.play('animation');

		game.physics.enable(bonus, Phaser.Physics.ARCADE);
		bonus.inputEnabled = true;

		bonus.checkWorldBounds = true;
		bonus.events.onOutOfBounds.add(this.remover, this);

		bonus.body.velocity.x = Math.cos(100) * game.candyspeed;
    	bonus.body.velocity.y = Math.sin(100) * game.candyspeed;

	},

	clickLetter: function(candy,candytype)
	{

		// alert(ev);
		//this.candy.create(candytype);
		// var s = this.game;
		this.game.add.tween(candy).to( { x: 50 }, 5000, Phaser.Easing.Linear.None, true);
		candy.kill();

		switch(candytype)
		{
			case 0: this.wrd = this.wrd + 'A'; break;
			case 1: this.wrd = this.wrd + 'B'; break;
			case 2: this.wrd = this.wrd + 'C'; break;
			case 3: this.wrd = this.wrd + 'D'; break;
			case 4: this.wrd = this.wrd + 'E'; break;
			case 5: this.wrd = this.wrd + 'F'; break;
			case 6: this.wrd = this.wrd + 'G'; break;
			case 7: this.wrd = this.wrd + 'H'; break;
			case 8: this.wrd = this.wrd + 'I'; break;
			case 9: this.wrd = this.wrd + 'J'; break;
			case 10: this.wrd = this.wrd + 'K'; break;
			case 11: this.wrd = this.wrd + 'L'; break;
			case 12: this.wrd = this.wrd + 'M'; break;
			case 13: this.wrd = this.wrd + 'N'; break;
			case 14: this.wrd = this.wrd + 'O'; break;
			case 15: this.wrd = this.wrd + 'P'; break;
			case 16: this.wrd = this.wrd + 'Q'; break;
			case 17: this.wrd = this.wrd + 'R'; break;
			case 18: this.wrd = this.wrd + 'S'; break;
			case 19: this.wrd = this.wrd + 'T'; break;
			case 20: this.wrd = this.wrd + 'U'; break;
			case 21: this.wrd = this.wrd + 'V'; break;
			case 22: this.wrd = this.wrd + 'W'; break;
			case 23: this.wrd = this.wrd + 'X'; break;
			case 24: this.wrd = this.wrd + 'Y'; break;
			case 25: this.wrd = this.wrd + 'Z'; break;

		}
		// alert(ABC.counter);


		// ABC.words.setText(this.wrd);
		var letters = this.add.sprite(((ABC.GAME_WIDTH-(this.lengthOfWord*80))/2)+ABC.counter, ABC.GAME_HEIGHT-130,'abcd1');
		letters.frame = candytype;



		ABC.counter += 80 ;

		// this.add.text(100, 250, thi, this.fontStyle);
		// alert(p1);
		if(this.wrd===this.givenWord)
		{
			ABC.words.setText("You Win");
			this.game.paused = true;

		}
	},


	remover: function(item)
	{
		item.kill();
	}

};

