var config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

const game = new Phaser.Game(config);
let player;

function preload() {
  this.load.image('player', 'assets/player.png');
}

function create() {
  player = this.add.sprite(1000, 700, 'player');
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();

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
