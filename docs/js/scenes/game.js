var optionsData = {
	cards:2, dificulty:"hard"
}

var json = localStorage.getItem("config");
if (json) {
	optionsData = JSON.parse(json);
}


class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.numCartes = nCartes.numCartes();
		this.dificultat = dificultat.dificultat()
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
		var llistatCartes = [];
		while (llistatCartes.lenght < this.numCartes * 2) {
			var rand = Math.floor(Math.random() * this.numCartes * 2);
			if (llistatCartes.indexOf(rand) === -1) {
				llistatCartes.push(rand);
			}
		}

		this.limitCartes = this.numCartes;
		var arraycards = ['cb', 'co', 'sb', 'so', 'tb', 'to', 'cb', 'co', 'sb', 'so', 'tb', 'to'];
		console.log(llistatCartes);
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		var posX = 250
		for (var l=0; l<=this.numCartes*2; l++){
			this.add.image(posX, 300, arraycards[llistatCartes[l]]);
			posX += 100;
		}
		
		this.cards = this.physics.add.staticGroup();

		var posX = 250
		for (var j=0; j<=this.numCartes*2; j++){
			this.add.image(posX, 300, 'back');
			posX += 100;
		}
		
		this.cards.children.iterate((card)=> {
			card.setInteractive();
			card.disableBody(true,true);
		})

		setTimeout(()=> {
			this.cards.children.iterate((card)=> {
				card.enableBody(false, 0, 0, true, true);
			})
		})


		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						if (this.dificultat == "easy") {
							this.score -= 10
						}
						else if (this.dificultat == "normal") {
							this.score -= 20
						}
						else{
							this.score -= 30
						}

						//Mostrem totes les cartes durant 1 segon
						
						setTimeout(function(){
							this.firstClick.enableBody(false, 0, 0, true, true);
							card.enableBody(false, 0, 0, true, true);
						},1000);	
											
						
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= this.numCartes){
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

