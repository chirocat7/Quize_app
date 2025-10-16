//HTML上から情報をもってこれれるようにする
// DOMができるまで待ってから要素を参照する（scriptがheadにある場合に必要）
document.addEventListener('DOMContentLoaded', () => {
  const questionText = document.getElementById('question-text');
  const options = document.getElementById('options');
  const nextButton = document.getElementById('next-button');
  const result = document.getElementById('result');

  // 配列（キー名を統一して使いやすくする）
  const questionData = [
    {
      question: '日本の首都はどこ？',
      options: ['名古屋', '東京', '大阪'],
      correct: 1,
    },
    {
      question: 'プログラミング言語ではないものは？',
      options: ['Java', 'Python', 'HTML'],
      correct: 2,
    },
    {
      question: '哺乳類ではないものはどれ？',
      options: ['カピバラ', 'ペンギン', 'くじら'],
      correct: 1,
    },
    {
      question: 'くしゃみが出そうな時にある場所を抑えると止めることができます。それはどこでしょうか？',
      options: ['鼻の下', 'つむじ', '足の裏'],
      correct: 0,
    },
    {
      question: '油性マジックが手についてしまった場合、綺麗に落とすのに役立つものはなんでしょうか？',
      options: ['サラダ油', '寒天', '昆布だし'],
      correct: 0,
    },
  ];

let currentQuestionIndex = 0;
let score = 0;
  let answered = false; // 回答済みフラグ

  // 関数宣言(矢印関数は関数宣言した後じゃないと使えない)
  function displayQuestion() {
    const currentQuestion = questionData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

  //HTML上をクリアにする
  options.innerHTML = '';
    // 前の問題の結果表示をクリア
    result.textContent = '';
    result.style.color = '';
    // 次へボタンは非表示にしておく
    nextButton.style.display = 'none';
    answered = false;

    // 選択肢ごとにボタン作成
    currentQuestion.options.forEach((option, index) => {
      // ボタン作成
      const chooseButton = document.createElement('button');
      chooseButton.textContent = option;
      chooseButton.id = 'choose-button-' + index;
      chooseButton.dataset.index = index; // index を保持
      options.appendChild(chooseButton);

      chooseButton.addEventListener('click', function (event) {
        if (answered) return;
        answered = true;

        const idx = Number(event.currentTarget.dataset.index);
        if (idx === currentQuestion.correct) {
          result.textContent = '正解！';
          result.style.color = 'green';
          score++; // 正解数をカウントアップ
        } else {
          result.textContent = '不正解...';
          result.style.color = 'red';
        }

        nextButton.style.display = 'inline-block';
      });
    });
  }

  // nextButton は一度だけ登録
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionData.length) {
      displayQuestion();
    } else {
      questionText.textContent = `クイズ終了！スコア: ${score}/${questionData.length}`;
      options.innerHTML = '';
      nextButton.style.display = 'none';
      result.textContent = '';
    }
  });

  // 初期表示
  displayQuestion();
});

