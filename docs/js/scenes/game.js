var options_data = {
    cards:2, dificulty:"hard"
};
 
var json = localStorage.getItem("config");
    if(json)
        options_data = JSON.parse(json);
 
class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.correct = 0;
        this.temps = 1300; //dificultat normal per defecte
        this.arraycards = [];
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

		//Segons la dificultat, varien el temps i el nivell de dificultat
		if (options_data.dificulty == 'easy') {
			this.temps = 2000;
		}
		else if (options_data.dificulty == 'normal') {
			this.temps = 1300;
		}
		else {
			this.temps = 700;
		}
 
		
        this.arraycards = ['cb','co','sb','so','tb','to'];
        this.cards = options_data.cards;
        this.arraycards = this.arraycards.slice(0, this.cards);
        this.arraycards = this.arraycards.concat(this.arraycards); // Es dupliquen
        this.arraycards.sort(function(){return Math.random() - 0.5});
		
 
        this.cameras.main.setBackgroundColor(0xBFFCFF);
        
		var posx = 200;
		for (let j = 0; j < this.arraycards.length; j++) {
			if (j < 4) {
				this.add.image(posx, 300, this.arraycards[j]);
			}
			else {
				posx = 200;
				this.add.image(posx, 450, this.arraycards[j]);
			}
			posx += 100;
		}
        this.cards = this.physics.add.staticGroup();
        
		var posx = 200;
		for (let j = 0; j < this.arraycards.length; j++) {
			if (j < 4) {
				this.cards.create(posx, 300, 'back');
			}
			else {
				posx = 200;
				this.cards.create(posx, 450, 'back');
			}
			posx += 100;
		}

        this.cards.children.iterate((card)=>{
			card.setInteractive();
			card.disableBody(true,true);

		})
		//Es tornen a tapar
		setTimeout(() =>{
			this.cards.children.iterate((card)=>{
				card.enableBody(false, 0, 0, true, true);
			})
		},this.temps);
       
 
        let i = 0;
        this.cards.children.iterate((card)=>{
            card.card_id = this.arraycards[i];
            i++;
            card.on('pointerup', () => {
                card.disableBody(true,true);
                if (this.firstClick){
                    if (this.firstClick.card_id !== card.card_id){

                        if (options_data.dificulty == 'easy') {
							this.score -= 10;
						}
						else if (options_data.dificulty == 'normal') {
							this.score -= 20;
						}
						else {
							this.score -= 30;
						}

						this.cards.children.iterate((card)=>{
							card.disableBody(true,true);
						})
						
						setTimeout(() =>{
							this.cards.children.iterate((card)=>{
								card.enableBody(false, 0, 0, true, true);
							})
						},this.temps);
                     

                        if (this.score <= 0){
                            alert("Game Over");
                            loadpage("../");
                        }
                    }
                    else{
                        this.correct++;
                        if (this.correct >= options_data.cards){
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
   
    update (){  }
}
