
ABC.Game = function(game)
{
	this._player = null;
	this._ABCgroup = null;
	this.spawnTimer = 0;
	this.frontStyle = null;

	this.candyspeed = 350;
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


	this.letterPos = [];
	this.shuffleLetter = [];
	

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

				// var extraWord = Math.floor(Math.random()*26);
				// this.letterPos.push(extraWord);
			};		

		this.shuffle(this);

		this.lengthOfArray = this.shuffleLetter.length;


		this.spawnTimer = 0;
		ABC._health = 3;


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
		

		if(this.spawnTimer > 800)
		{
			this.spawnTimer = 0;
			this.spawnLetter(this);


			ABC.sec += 1;
			ABC.timeing.setText(ABC.sec);
		}

		if(this.bonusTimer > 5175)
		{
			this.bonusTimer = 0;
			this.spawnBonus(this);
		}

		if (ABC._health==0)
		{
			ABC.words.setText("Game Over");
			this.game.paused = true;

		}

	},

	spawnLetter: function(game)
	{
		var dropPosX = Math.floor(Math.random()*ABC.GAME_WIDTH);
		var dropOffset = [300,200,150,250,150];
		var dropPosY = Math.floor(Math.random()*5);
		var lettertype = Math.floor(Math.random()*this.lengthOfArray);
		var letter = game.add.sprite(-10,dropOffset[dropPosY],'abcd1');

		letter.animations.add('anim', [this.shuffleLetter[lettertype]], 10, true);
		letter.animations.play('anim');

		game.physics.enable(letter, Phaser.Physics.ARCADE);
		letter.inputEnabled = true;
		letter.events.onInputDown.add(function(){this.clickLetter(letter,this.shuffleLetter[lettertype]);},this);

		letter.checkWorldBounds = true;
		letter.events.onOutOfBounds.add(this.remover, this);


		letter.body.velocity.x = Math.cos(100) * game.letterSpeed;
    	letter.body.velocity.y = Math.sin(100) * game.letterSpeed;


	},

	spawnBonus: function(game)
	{
		var dropPosX = Math.floor(Math.random()*ABC.GAME_WIDTH);
		var dropOffset = [140,130,175,115,150];
		var dropPosY = Math.floor(Math.random()*5);
		var bonus = game.add.sprite(-5,dropOffset[dropPosY],'bonus');

		bonus.animations.add('animation',[dropPosY],10, true);
		bonus.animations.play('animation');

		game.physics.enable(bonus, Phaser.Physics.ARCADE);
		bonus.inputEnabled = true;
		bonus.events.onInputDown.add(function(){this.clickBonus(bonus,dropPosY);},this);

		bonus.checkWorldBounds = true;
		bonus.events.onOutOfBounds.add(this.remover, this);

		bonus.body.velocity.x = Math.cos(0) * game.candyspeed;
    	bonus.body.velocity.y = Math.sin(270) * game.candyspeed;

	},

	clickLetter: function(letter,lettertype)
	{

		this.game.add.tween(letter).to( { x: 50 }, 5000, Phaser.Easing.Linear.None, true);
		letter.kill();

		switch(lettertype)
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

		var letters = this.add.sprite(((ABC.GAME_WIDTH-(this.lengthOfWord*80))/2)+ABC.counter, ABC.GAME_HEIGHT-130,'abcd1');
		letters.frame = lettertype;


		if(this.letterPos.indexOf(lettertype) < 0)
		{
			ABC.words.setText("Wrong Letter");
			ABC._health -= 1 ;
		}



		ABC.counter += 80 ;

		if(this.wrd===this.givenWord)
		{
			ABC.words.setText("You Win");
			this.game.paused = true;

		}
	},

	clickBonus: function(candy,candytype)
	{
		candy.kill();
		// alert(candytype);
		switch(candytype)
		{
			case 0: ABC._score += 5; break;
			case 1: ABC._score -= 2; break;
			case 2: ABC._score += 2; break;
			case 3: ABC._score += 10; break;
			case 4: ABC._score += 5; break;
		}

		ABC._scoreText.setText(ABC._score);

	},

	shuffle: function(game)
	{
		this.shuffleLetter = this.shuffleLetter.concat(this.letterPos);

		for (var i = 0; i < this.letterPos.length; i++) {
				var extraWord = Math.floor(Math.random()*26);
				this.shuffleLetter.push(extraWord);
		};

		for(var j, x, i = this.shuffleLetter.length; i; j = Math.floor(Math.random() * i), x = this.shuffleLetter[--i], this.shuffleLetter[i] = this.shuffleLetter[j], this.shuffleLetter[j] = x);

		// alert(this.shuffleLetter);
	},

	remover: function(item)
	{
		item.kill();
	}

};

