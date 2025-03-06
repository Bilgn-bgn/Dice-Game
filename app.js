// Тоглоомын бүх газар ашигладах глобал хувьсагчдыг энд зарлая
// Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч
var isNewGame;

// Аль тоглогч шоо шидэх вэ гэдгийг энд хадгалана.
var activePlayer;

// Хоёр тоглогчийн цуглуулсан оноонууд
var scores;

// Идэвхтэй тоглогчийн цуглуулж байгаа ээлжийн оноо.
var roundScore;

// Шооны зургийг үзүүлэх элемэнтийг DOM-оос хайж олоод энд хадгалъя
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүнэ.
initGame();
// Тоглоом эхэллээ гэдэг төлөвт оруулна.
isNewGame = true;

// Тоглоомыг шинээр эхлэхэд бэлтгэнэ.
function initGame() {
// Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;

// Тоглогчийн цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

// Тоглогчийн ээлжиндээ цуглуулсан байгаа оноог хадгалах хувьсагч
  roundScore = 0;

// Програм эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Тоглогчийн нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";

   // Тоглоом шинэчлэгдсэн учир isNewGame-г true болгоно
   isNewGame = true;
}

// Шоог шидих эвэнт листенер
document.querySelector(".btn-roll").addEventListener("click", function() {
  if(isNewGame === true){
    // 1 - 6 доторх санамсаргүй нэг тоог гаргаж авна
  var diceNumber = Math.floor(Math.random() * 6) + 1;

  // Шооны зургийг вэб дээр гаргаж ирнэ.
  diceDom.style.display = "block";

  // Буусан санамсаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ.
  diceDom.src = "dice-" + diceNumber + ".png";

  // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
  if (diceNumber !== 1) {
      // 1-ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө
      roundScore = roundScore + diceNumber;
      document.getElementById("current-" + activePlayer).textContent = roundScore;
    } else {
      // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
      // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
      roundScore = 0;
      document.getElementById("current-" + activePlayer).textContent = 0;

      // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
      activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

      // Улаан цэгийг шилжүүлэх
      document.querySelector(".player-0-panel").classList.toggle("active");
      document.querySelector(".player-1-panel").classList.toggle("active");

      // Шоог түр алга болгоно.
      diceDom.style.display = "none";
    }
  } else {
    alert('Тоглоом дууссан байна. NEW GAME товчыг дарж шинээр эхэлнэ үү');
  }
});

// HOLD товчны эвент листенер
document.querySelector(".btn-hold").addEventListener("click", function() {
  if(isNewGame)
  {

  // Уг тоглогчийн цуглуулсан ээлжний оноог глобал оноон дээр нь нэмж өгнө.

  //   if (activePlayer === 0) {
  //     scores[0] = scores[0] + roundScore;
  //   } else {
  //     scores[1] = scores[1] + roundScore;
  //   }

  scores[activePlayer] = scores[activePlayer] + roundScore;

  // Дэлгэц дээр оноог нь өөрчлөнө
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];

  // Уг тоглогчийн хожсон эсэхийг (оноо нь 100-аас их эсэх) шалгах
  if (scores[activePlayer] >= 100) {
    // Тоглоомыг дууссан төлөвт оруулна
    isNewGame = false;

    // Ялагч гэсэн тэкстийг нэрнийх нь оронд гаргана
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Тоглогчийн ээлжийг солино.
    switchToNextPlayer();
  }
  }else{
    alert('Тоглоом дууссан байна. NEW GAME товчыг дарж шинээр эхэлнэ үү');
  }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогчруу шилжүүлдэг.
function switchToNextPlayer() {
  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгонго.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгоно.
  diceDom.style.display = "none";
}

// New Game буюу Шинэ тоглоом эхлүүлэх товчний эвэнт листенер
document.querySelector(".btn-new").addEventListener("click", initGame);
