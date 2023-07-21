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
  const mapWidth = 1500;
  const mapHeight = 1000;

  let background = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
  background.displayWidth = mapWidth;
  background.displayHeight = mapHeight;
  background.setOrigin(0.5);

  // 게임 요소를 배경보다 앞으로 가져옴
  this.children.bringToTop(background);

  player = this.add.sprite(mapWidth / 2, mapHeight / 2, 'player'); // 캐릭터의 초기 위치를 맵의 중앙으로 설정
  player.setScale(0.5);
  player.setCollideWorldBounds(true, 0.1, 0.1); // 충돌 경계와 캐릭터 사이에 마진 추가

  cursors = this.input.keyboard.createCursorKeys();

  // this.cameras.main.setBounds(0, 0, mapWidth, mapHeight); // 카메라 영역을 맵 크기로 설정
  // this.cameras.main.startFollow(player, true, 0.5, 0.5);
}

function update() {
  // 스크롤 방지
  this.input.keyboard.on('keydown', function (event) {
    event.preventDefault();
  });

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