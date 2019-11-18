$(document).ready(function () {
    let params = new URLSearchParams(document.location.search.substring(1));
    let name = params.get("name")
    document.getElementsByClassName('app-head')[0].innerHTML = "hello " + name;

    $('.app-head').fadeIn(1000, function () {
        $(this).css({ "visibility": "show", display: 'block' });
    })

    // fix later
    setTimeout(function () {
        $('.app-head').fadeOut(2000, function () {
            $(this).css({ 'visibility': 'hidden', 'display': 'none' });
            $('#app-heading-container').css({ 'visibility': 'hidden', 'display': 'none' });
        })

    }, 100);

    // fix later
    setTimeout(function() {
        $("#chat-container").hide().slideDown(1000);
    }, 2500);
});


    
var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var balloons = [];

function pushBalloon() {
    var input = document.getElementsByClassName('input-group')[0].children[0];
    balloons.push(new Balloon(input.value));
    drawBalloon();
}

function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}



function Balloon(message) {
  this.update = function() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    
    var overlapLeft = this.x - this.radius;
    var overlapRight = this.x + this.radius;

    if (this.y + 275 < 0) {
      for (var i = 0; i < balloons.length; i++)
      {
        if (balloons[i].y == this.y && balloons[i].x == this.x)
        {
          balloons.splice(balloons[i], 1);
          return;
        }
      }
    }
    
       if (overlapLeft < 0) {
      this.velocityX = -this.velocityX+1;
    }
    
    else if (overlapRight > canvas.width) {
      this.velocityX = -this.velocityX-1;
    }
    
    var addVelX = this.movingDir === 'left' ? -Math.random() / 5 : Math.random() / 5;
    
    if (this.velocityX > 5) {
      this.movingDir = 'left';
    }
    else if (this.velocityX < -5) {
      this.movingDir = 'right';
    }

    
    this.velocityX += addVelX;
  }
  
  this.message = chunkSubstr(message,20);
  this.radius = 50;
  this.movingDir = Math.round(Math.random()) ? "left" : "right";
  this.x = Math.random() * ((canvas.width - this.radius) - this.radius) + this.radius;
  this.y = canvas.height + 100;
  this.velocityX = 0;
  this.velocityY = -5;
  this.color = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
}

function drawBalloon() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(0,0,0,.75)";
  
  for (var i=0; i<balloons.length; i++) {
    balloons[i].update();
    
    if (balloons[i]) {
      ctx.beginPath();
      ctx.ellipse(balloons[i].x, balloons[i].y, balloons[i].radius, 75, 0, 0, 2 * Math.PI);
      ctx.moveTo(balloons[i].x, balloons[i].y+75);
  //    ctx.lineTo(balloons[i].x+Math.random()*40-20, balloons[i].y+100);
  //    ctx.lineTo(balloons[i].x+Math.random()*60-30, balloons[i].y+125);
  //    ctx.lineTo(balloons[i].x+Math.random()*80-40, balloons[i].y+150);
  //    ctx.lineTo(balloons[i].x+Math.random()*100-50, balloons[i].y+175);

      ctx.lineTo(balloons[i].x, balloons[i].y+200);
      ctx.stroke();
      
      ctx.fillStyle = balloons[i].color;
      ctx.fill();

      ctx.textAlign = "center";
      ctx.fillStyle = "white";

      for (var j=0; j<balloons[i].message.length; j++) {
        ctx.fillText(balloons[i].message[j], balloons[i].x, (balloons[i].y - 25) + j*20);          
      }
    }
   }
  

  requestAnimationFrame(drawBalloon);
}


