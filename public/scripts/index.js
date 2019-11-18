var name;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var balloons = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

$('.chat-head').hide();

function signIn() {
    name = $('.form-group')[0].children[0].value;
    var box = $('#flex-child');
    document.getElementsByClassName('chat-head')[0].innerHTML = "hello " + name;

    if (name != "") {

        box.addClass('animateFullScreen');

        $('#flex-element').fadeOut(500,
            function () {
                $(this).css({ "visibility": "hidden", display: 'none' });
            });

        $('#flex-child').on("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function (e) {
            $(this).css({ 'display': 'flex' });

            $('.chat-head').fadeIn(1000, function () {
                $(this).css({ 'visibility': 'show' });
            })
        })

        // fix later
        setTimeout(function () {
            $('.chat-head').fadeOut(2000, function () {
                $(this).css({ 'visibility': 'hidden', 'display': 'none' });
            })
        }, 3000);

        // fix later
        setTimeout(function () {
            $('#flex-child').css({ 'display': 'block' });
            $('#chat-message').css({ 'display': 'block' });
            $('#chat-form').css({ 'display': 'block' });
        }, 5000);

    }
    else {
        // TODO: CLAYTON
        // INPUT MODAL
        alert('Enter display name.');
    }
}

function enter(e) {
    console.log(e);
    if (e.key == 'Enter' && e.target.dataset.type == 'send-balloon')
    {
        pushBalloon();
    }
    if (e.key == 'Enter' && e.target.dataset.type == 'sign-in')
    {
        signIn();
    }
}

function voiceChat() {
    var type = document.getElementsByClassName('input-group')[0].children[1].children[1];
    var message;
    if (type.textContent == 'Join Voice') {
        type.textContent = 'Disconnect';
        message = 'Hello ' + name;
    }
    else {
        type.textContent = 'Join Voice';
        message = 'Later ' + name;
    }
    balloons.push(new Balloon(message));
}

function pushBalloon() {
    var input = document.getElementsByClassName('input-group')[0].children[0];
    balloons.push(new Balloon(input.value));
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
    this.update = function () {
        this.x += this.velocityX;
        this.y += this.velocityY;

        var overlapLeft = this.x - this.radius;
        var overlapRight = this.x + this.radius;

        if (this.y + 275 < 0) {
            for (var i = 0; i < balloons.length; i++) {
                if (balloons[i].y == this.y && balloons[i].x == this.x) {
                    balloons.splice(balloons[i], 1);
                    console.log(balloons.length);
                    return;
                }
            }
        }

        if (overlapLeft < 0) {
            this.velocityX = -this.velocityX + 1;
        }

        else if (overlapRight > canvas.width) {
            this.velocityX = -this.velocityX - 1;
        }

        var addVelX = this.movingDir === 'left' ? -Math.random() / 5 : Math.random() / 5;

        if (this.velocityX > 3) {
            this.movingDir = 'left';
        }
        else if (this.velocityX < -3) {
            this.movingDir = 'right';
        }

        this.velocityX += addVelX;
    }

    this.message = chunkSubstr(message, 6);
    this.radius = 50;
    this.movingDir = Math.round(Math.random()) ? "left" : "right";
    this.x = Math.random() * ((canvas.width - this.radius) - this.radius) + this.radius;
    this.y = canvas.height + 100;
    this.velocityX = 0;
    this.velocityY = -1;
    this.color = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
}

function drawBalloon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < balloons.length; i++) {
        balloons[i].update();
        if (balloons[i]) {
            var centerX = balloons[i].x;
            var centerY = balloons[i].y;
            var radius = balloons[i].radius;

            var handleLength = (4 * (Math.sqrt(2) - 1)) / 3 * radius;

            var widthDiff = (radius * 0.0333);
            var heightDiff = (radius * .4);

            var balloonBottomY = centerY + radius + heightDiff;

            // Begin balloon path

            ctx.beginPath();

            // Top Left Curve

            var topLeftCurveStartX = centerX - radius;
            var topLeftCurveStartY = centerY;

            var topLeftCurveEndX = centerX;
            var topLeftCurveEndY = centerY - radius;

            ctx.moveTo(topLeftCurveStartX, topLeftCurveStartY);
            ctx.bezierCurveTo(topLeftCurveStartX, topLeftCurveStartY - handleLength - widthDiff,
                topLeftCurveEndX - handleLength, topLeftCurveEndY,
                topLeftCurveEndX, topLeftCurveEndY);

            // Top Right Curve

            var topRightCurveStartX = centerX;
            var topRightCurveStartY = centerY - radius;

            var topRightCurveEndX = centerX + radius;
            var topRightCurveEndY = centerY;

            ctx.bezierCurveTo(topRightCurveStartX + handleLength + widthDiff, topRightCurveStartY,
                topRightCurveEndX, topRightCurveEndY - handleLength,
                topRightCurveEndX, topRightCurveEndY);

            // Bottom Right Curve

            var bottomRightCurveStartX = centerX + radius;
            var bottomRightCurveStartY = centerY;

            var bottomRightCurveEndX = centerX;
            var bottomRightCurveEndY = balloonBottomY;

            ctx.bezierCurveTo(bottomRightCurveStartX, bottomRightCurveStartY + handleLength,
                bottomRightCurveEndX + handleLength, bottomRightCurveEndY,
                bottomRightCurveEndX, bottomRightCurveEndY);

            // Bottom Left Curve

            var bottomLeftCurveStartX = centerX;
            var bottomLeftCurveStartY = balloonBottomY;

            var bottomLeftCurveEndX = centerX - radius;
            var bottomLeftCurveEndY = centerY;

            ctx.bezierCurveTo(bottomLeftCurveStartX - handleLength, bottomLeftCurveStartY,
                bottomLeftCurveEndX, bottomLeftCurveEndY + handleLength,
                bottomLeftCurveEndX, bottomLeftCurveEndY);

            // Create balloon color
            ctx.fillStyle = balloons[i].color;
            ctx.fill();

            // Create balloon tie

            var halfTieWidth = (radius * .12) / 2;
            var tieHeight = (radius * .12);
            var tieCurveHeight = (radius * .13);

            ctx.beginPath();
            ctx.moveTo(centerX - 1, balloonBottomY);
            ctx.lineTo(centerX - halfTieWidth, balloonBottomY + tieHeight);
            ctx.quadraticCurveTo(centerX, balloonBottomY + tieCurveHeight,
                centerX + halfTieWidth, balloonBottomY + tieHeight);
            ctx.lineTo(centerX + 1, balloonBottomY);
            ctx.fill();


            // Create balloon text color
            var letterSpacing = 25;
            var textHeight = 10;

            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";

            for (var j = 0; j < balloons[i].message.length; j++) {
                ctx.fillText(balloons[i].message[j], balloons[i].x, (balloons[i].y - textHeight) + j * letterSpacing);
            }

            // OLD DESIGN
            // ctx.ellipse(balloons[i].x, balloons[i].y, balloons[i].radius, 75, 0, 0, 2 * Math.PI);
            // ctx.moveTo(balloons[i].x, balloons[i].y + 75);
            // ctx.lineTo(balloons[i].x+Math.random()*40-20, balloons[i].y+100);
            // ctx.lineTo(balloons[i].x+Math.random()*60-30, balloons[i].y+125);
            // ctx.lineTo(balloons[i].x+Math.random()*80-40, balloons[i].y+150);
            // ctx.lineTo(balloons[i].x+Math.random()*100-50, balloons[i].y+175);
            // ctx.lineTo(balloons[i].x, balloons[i].y + 200);
            // ctx.stroke();
            // ctx.fillStyle = balloons[i].color;
            // ctx.fill();
            // ctx.fillStyle = "white";
        }
    }
    requestAnimationFrame(drawBalloon);
}

drawBalloon();