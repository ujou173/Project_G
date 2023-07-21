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
  // 맵 크기 설정
  const mapWidth = 2000;
  const mapHeight = 1600;

  let background = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
  background.displayWidth = this.cameras.main.width;
  background.displayHeight = this.cameras.main.height;
  background.setOrigin(0.5);

  // 게임 요소를 배경보다 앞으로 가져옴
  this.children.bringToTop(background);

  player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'player');
  player.setScale(0.5);
  player.setCollideWorldBounds(true); // 맵 경계와 충돌하도록 설정

  cursors = this.input.keyboard.createCursorKeys();

  this.cameras.main.setBounds(0, 0, '100%', '100%');
  this.cameras.main.startFollow(player, true, 0.5, 0.5);

  // 캐릭터의 초기 위치 설정 (화면 중앙)
  player.x = this.cameras.main.width / 2;
  player.y = this.cameras.main.height / 2;
}

function update() {
  if (cursors.up.isDown) {
    player.setVelocityY(-160); // setVelocityY() => 물리엔진이 적용된 움직임. 플레이어를 Y축을 기준으로 160의 속도로 -방향으로 움직인다는 뜻
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
  } else {
    player.setVelocityY(0);
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  // 맵의 크기 제한 설정
  const halfPlayerWidth = player.displayWidth / 2;
  const halfPlayerHeight = player.displayHeight / 2;
  const minX = halfPlayerWidth;
  const maxX = mapWidth - halfPlayerWidth;
  const minY = halfPlayerHeight;
  const maxY = mapHeight - halfPlayerHeight;
  
  player.x = Phaser.Math.Clamp(player.x, minX, maxX);
  player.y = Phaser.Math.Clamp(player.y, minY, maxY);
}