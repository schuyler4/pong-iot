import pubnub from 'pubnub'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Ball {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xDirection = 'right';
    this.yDirection = '';
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'red'
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
    this.move();
  }

  move() {
    if(this.xDirection === 'right')
      this.x += 1;
    else if(this.xDirection === 'left')
      this.x -= 1;

    if(this.xDirection === 'up')
      this.y -= 1;
    else if(this.yDirection == 'down')
      this.y += 1;
  }
}

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'green'
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }
}

const ball = new Ball(canvas.width / 2 - 30, canvas.height / 2 - 30, 30, 30);
const player = new Paddle(0, canvas.width / 2 - 150, 20, 100);
const enemy = new Paddle(canvas.width - 20, canvas.width / 2 - 150, 20, 100);

function collide() {
  if(ball.x + 30 > enemy.x) {
    ball.xDirection = 'left';
    if(this.y - 15 > 100 / 2) {
      ball.yDirection = 'up';
    } else {
      ball.yDirection = 'down';
    }
  }

  if(ball.x - 20 < player.x) {
    ball.xDirection = 'right';
    if(this.y - 30 > 100 / 2) {
      ball.yDirection = 'up';
    } else {
      ball.yDirection = 'down';
    }
  }

  if(ball.y < 0) {
    ball.yDirection = 'down';
  }

  if(ball.y + 30 > canvas.height) {
    console.log(ball.yDirection);
    ball.yDirection = 'up';
  }
}

function movePlayer() {

}

pubnub = new PubNub({
  publishKey : 'pub-c-0107042d-cac3-4854-9323-b2fd0badf295',
  subscribeKey : 'sub-c-cfaa271a-119f-11e7-b568-0619f8945a4f'
})

pubnub.addListener({
  status: function(statusEvent) {
    if (statusEvent.category === "PNConnectedCategory") {
      publishSampleMessage();
    }
  },
  message: function(message) {
    console.log("New Message!!", message);
  },
});
pubnub.subscribe({
  channels: ['pong']
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  player.draw();
  enemy.draw();
  collide();
}

setInterval(draw, 10);
