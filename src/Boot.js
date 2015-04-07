var ABC = {};

ABC.global = {
    thumbWidth : 64,
    thumbHeight : 64,
    space : 8,
    starsArray : [0,4,4,4,
                  4,4,4,4,
                  4,4,4,4,
                  4,4,4,4,
                  4,4,4,4],
    level :0 
};

ABC.Boot = function(game) {};

ABC.Boot.prototype = {

    preload: function()
    {
        this.load.image('preloadStar', 'assets/images/newStar.png');
    },

    create: function()
    {
        
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);

        this.state.start('Preloader');
    }
};