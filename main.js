import {TetrisManager} from './tetrismanager.js';

export const canvas = document.querySelector("canvas");

window.focused = true;

const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();

const keyListener = (e) => {
	if(!window.focused) return;

	[
		['a','d','n','m','s']
	].forEach((key,i) => {
		const player = localTetris.player;

		if(e.type === 'keydown'){
			if(e.key === key[0]){
				player.move(-1);
			}else if(e.key === key[1]){
				player.move(1);
			}else if(e.key === key[2]){
				player.rotate(-1);
			}else if(e.key === key[3]){
				player.rotate(1);
			}
		}

		if(e.key === key[4]){
			if(e.type == 'keydown'){
				if(player.dropInterval === player.DROP_FAST) return;
				player.drop();
				player.dropInterval = player.DROP_FAST;	
			} else {
				player.dropInterval = player.DROP_SLOW;	
			}
		}
	});
}

window.onkeydown = keyListener;
window.onkeyup = keyListener;

document.addEventListener('keydown',(e) => {
	if(e.key === 'Escape'){
		window.focused = !window.focused;
	}
});