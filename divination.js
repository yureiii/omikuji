const omikuji = document.getElementById('omikuji');
const omikujiCollision = document.getElementById('omikujiCollision');
var isExecuted = false;
var audio = new Audio("seund/tm2_can004.wav");
// カメラカーソルが物体を振れている状態でクリックをすると音を立てて回りだす
omikujiCollision.addEventListener('mouseenter', (e) => {
  if(isExecuted) {
    return;
  }
  omikuji.setAttribute('animation', 'property: rotation; to: 0 0 360; loop: true; dur: 3000; easing: linear;');
  audio = new Audio();
  audio.src = "sound/tm2_can004.wav";
  audio.play();
  audio.addEventListener('ended', (e) => {
    audio.currentTime = 0;
    audio.play();
  });
});

var timeout;
const floor = document.getElementById('floor');
// カメラカーソルが床から離れると床が前方に出ながら大きくなり, 時間がたつと showOmikujiResult 関数を呼び出す
omikujiCollision.addEventListener('mouseleave', (e) => {
  if(isExecuted) {
    return;
  }
  var omikujiRotation = omikuji.getAttribute('rotation');
  console.log(omikujiRotation);
  omikuji.setAttribute('animation', 'property: rotation; to: ' + omikujiRotation.x + omikujiRotation.y + omikujiRotation.z + '; loop: 1; dur: 3000; easing: linear;');
  const enlargementTime = 1700;
  // 移動先の設定が 300 300 300 となっているが, これをうまいこと変数で表したい
  floor.setAttribute('animation__increasingInSize', 'property: scale; dur: ' + enlargementTime + '; to: 300 300 300');
  floor.setAttribute('animation__moveUpward', 'property: position; dur: ' + enlargementTime + '; to: 0 3 0');
  audio.pause();
  timeout = window.setTimeout(showOmikujiResult, enlargementTime);
  isExecuted = true;
});

function showOmikujiResult() {
  const omikujiResults = ['大吉', '中吉', '小吉', '吉', '凶', '大凶'];
  var random = Math.floor(Math.random() * omikujiResults.length);
  document.getElementById('omikujiResult').innerHTML = omikujiResults[random];
}
