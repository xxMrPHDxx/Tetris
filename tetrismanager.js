import {Tetris} from './tetris.js';

export class TetrisManager{
	constructor(document){
		this.document = document;

		this.template = document.querySelector('#player-template');

		this.instances = new Set;
	}

	createPlayer(){
		const element = this.document.importNode(this.template.content,true).children[0];
		const highscoreDiv = this.document.importNode(this.template.content,true).children[0];
		
		const tetris = new Tetris(element,highscoreDiv);
		this.instances.add(tetris);

		this.document.body.querySelector(".wrapper").appendChild(tetris.element);

		return tetris;
	}

	removePlayer(tetris){
		this.instances.delete(tetris);
		this.document.body.querySelector(".wrapper").removeChild(tetris.element);
	}
}