import {Player} from './player.js';
import {Arena} from './arena.js';

export class Tetris{
	constructor(element){
		this.element = element;
		this.highscoreDiv = element.querySelector(".HighScoreList");
		this.canvas = element.querySelector("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.ctx.scale(20,20);

		this.arena = new Arena(12,20);
		this.player = new Player(this);

		this.highscores = [];
		for(let i=0;i<10;i++){
			this.highscores.push({
				score:0,
				element:this.initializeHighScore()
			});
		}

		this.colors = [
			null,
			"#ff0d72",
			"#0dc2ff",
			"#0dff72",
			"#f538ff",
			"#ff8e0d",
			"#ffe138",
			"#3877ff",
		];

		let lastTime = 0;
		const update = (time = 0) => {
			const dt = time - lastTime;
			lastTime = time;

			this.player.update(dt);

			this.draw();
			requestAnimationFrame(update);
		}

		update();
	}

	draw(){
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.drawMatrix(this.arena.matrix,{x:0,y:0});
		this.drawMatrix(this.player.matrix,this.player.pos);

		if(!window.focused) {
			this.ctx.fillStyle = "#efefef";
			this.ctx.font = "1px sans-serif";
			this.ctx.fillText("PAUSED",4.3,10);
		}
	}

	drawMatrix(matrix,offset){
		matrix.forEach((row,y) => {
			row.forEach((value,x) => {
				if (value !== 0) {
					this.ctx.fillStyle = this.colors[value];
					this.ctx.fillRect(x + offset.x,y + offset.y,1,1);
				}
			});
		});
	}

	initializeHighScore(){
		let element = document.createElement("span");
		this.highscoreDiv.appendChild(element);
		return element;
	}

	setHighscore(newScore){
		if(newScore > this.highscores[0].score){
			let _highscores = [];
			this.highscores.forEach(({element,score},i) => {
				_highscores.push({element:element,score:(i == 0 ? newScore : this.highscores[i-1].score)});
			});
			this.highscores = _highscores;
		}
	}

	updateHighscore(){
		if(this.highscores.length > 10){
			this.highscores.splice(10);
		}
		this.highscores.forEach(({element,score}) => {
			element.innerText = score == 0 ? "" : score;
		});
	}

	updateScore(){
		this.element.querySelector(".Score").innerText = "Score: " + this.player.score;
	}
}