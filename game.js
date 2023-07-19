var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);
var player;

function preload() {
  this.load.image('player', 'assets/player.png');
}

function create() {
  player = this.add.sprite(500, 500, 'player');
}

function update() {
  var cursors = this.input.keyboard.createCursorKeys();

  if (cursors.up.isDown) {
      player.y -= 5;
  } else if (cursors.down.isDown) {
      player.y += 5;
  }

  if (cursors.left.isDown) {
      player.x -= 5;
  } else if (cursors.right.isDown) {
      player.x += 5;
  }
}
