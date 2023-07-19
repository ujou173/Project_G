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
      update: update,
  }
};

const game = new Phaser.Game(config);
let player;
let cursors;

function preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.image('player', 'assets/player.png');
}

function create() {
    let background = this.add.sprite(0, 0, 'background');

    // 배경 스프라이트 위치 설정
    background.setOrigin(0, 0);
    background.setScale(1);

    // 게임 요소를 배경보다 앞으로 가져옴
    this.children.bringToTop(background);

    player = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player');

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, '100%', '100%');
    this.cameras.main.startFollow(player, true, 0.5, 0.5);
}

function update() {
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