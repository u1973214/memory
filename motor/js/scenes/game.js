class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){	
<<<<<<< HEAD
=======
		
		let cartes = ['cb', 'co', 'sb', 'so', 'tb', 'to'];
		let arraycards = ['co', 'sb', 'co', 'sb'];
		var i, j;
		for (i=0; i<=4; i++) {
			j = Math.floor(Math.random() * i);
			arraycards[i] = cartes[j];
		}
		
		
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		
		var pos_horitzonal = 250;
		var pos_vertical = 300;
		for (i=0; i<=4; i++) {
			this.add.image(pos_horitzontal, pos_vertical, 'back');
			pos_horitzontal = pos_horitzontal + 100;
		}
		
>>>>>>> 4c7b48525bf76c996156b823acb51919d46d1c81
		
		let cartes = ['cb', 'co', 'sb', 'so', 'tb', 'to'];
		let arraycards = ['co', 'sb', 'co', 'sb'];
		var i, j;
		for (i=0; i<=4; i++) {
			j = Math.floor(Math.random() * i);
			arraycards[i] = cartes[j];
		}
		
		
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		
		var pos_horitzonal = 250;
		var pos_vertical = 300;
		for (i=0; i<=4; i++) {
			this.add.image(pos_horitzontal, pos_vertical, 'back');
			pos_horitzontal = pos_horitzontal + 100;
		}
		
		
		this.cards = this.physics.add.staticGroup();

<<<<<<< HEAD
		
=======
		
>>>>>>> 4c7b48525bf76c996156b823acb51919d46d1c81
		pos_horitzonal = 250;
		pos_vertical = 300;
		for (i=0; i<=4; i++) {
			this.cards.create(pos_horitzontal, pos_vertical, 'back');
			pos_horitzontal = pos_horitzontal + 100;
		}
<<<<<<< HEAD
		
		
=======
		
>>>>>>> 4c7b48525bf76c996156b823acb51919d46d1c81
		
		
		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= 20;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= 2){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}

