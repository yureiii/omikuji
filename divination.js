const omikuji = document.getElementById('omikuji');
var audio = new Audio("seund/tm2_can004.wav");
// カメラカーソルが物体を振れている状態でクリックをすると音を立てて回りだす
omikuji.addEventListener('mouseenter', (e) => {
  omikuji.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear;');
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
omikuji.addEventListener('mouseleave', (e) => {
  const enlargementTime = 2000;
  // 移動先の設定が 300 300 300 となっているが, これをうまいこと変数で表したい
  floor.setAttribute('animation', 'property: scale; dur: ' + enlargementTime + '; to: 300 300 300');
  audio.pause();
  timeout = window.setTimeout(showOmikujiResult, enlargementTime);
});

function showOmikujiResult() {
  const omikujiResults = ['大吉', '中吉', '小吉', '吉', '凶', '大凶'];
  var random = Math.floor(Math.random() * omikujiResults.length);
  document.getElementById('omikujiResult').innerHTML = omikujiResults[random];
}
