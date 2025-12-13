"use strict";
var is_fullscreen = false;
function openFullscreen() {
  let game = document.getElementById("game-frame-i");
  if(is_fullscreen){
    // Exit fullscreen
    is_fullscreen = false;
      if (game.requestFullscreen) {
        game.requestFullscreen();
      } else if (game.mozRequestFullScreen) { /* Firefox */
        game.mozRequestFullScreen();
      } else if (game.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        game.webkitRequestFullscreen();
      } else if (game.msRequestFullscreen) { /* IE/Edge */
        game.msRequestFullscreen();
      }
  } else {
    // Enter fullscreen
    is_fullscreen = true;
   
      if (game.requestFullscreen) {
        game.requestFullscreen();
      } else if (game.mozRequestFullScreen) { /* Firefox */
        game.mozRequestFullScreen();
      } else if (game.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        game.webkitRequestFullscreen();
      } else if (game.msRequestFullscreen) { /* IE/Edge */
        game.msRequestFullscreen();
      }
  }
};
document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.querySelector('.menu-toggle');
  const dropdown = document.querySelector('.dropdown');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
  }
});
