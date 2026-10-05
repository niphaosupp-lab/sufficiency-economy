const questions = [
  {
    q: "ข้อใดเป็นหนึ่งใน 3 หลักสำคัญของเศรษฐกิจพอเพียง?",
    a: ["ความรวดเร็ว", "ความพอประมาณ", "การแข่งขัน", "การบริโภค"],
    correct: 1
  },
  {
    q: "การคิดถึงสาเหตุ ผลกระทบ และข้อมูลก่อนตัดสินใจ สอดคล้องกับหลักใด?",
    a: ["มีเหตุผล", "มีชื่อเสียง", "ความสะดวก", "ความทันสมัย"],
    correct: 0
  },
  {
    q: "ข้อใดเป็นตัวอย่างของการนำหลักพอเพียงมาใช้ด้านการเงิน?",
    a: ["ซื้อทุกอย่างที่อยากได้", "ใช้เงินโดยไม่วางแผน", "วางแผนรายรับรายจ่ายและออมเงิน", "กู้เงินเพื่อซื้อของที่ไม่จำเป็น"],
    correct: 2
  },
  {
    q: "เงื่อนไขสำคัญที่ควรใช้ควบคู่กับ 3 หลัก คือข้อใด?",
    a: ["ความรู้และคุณธรรม", "ความดังและความเร็ว", "การแข่งขันและกำไร", "เทคโนโลยีและโฆษณา"],
    correct: 0
  },
  {
    q: "การเตรียมพร้อมรับความเสี่ยงและการเปลี่ยนแปลง หมายถึงหลักใด?",
    a: ["พอประมาณ", "มีเหตุผล", "มีภูมิคุ้มกัน", "ความประหยัด"],
    correct: 2
  }
];

let current = 0;
let score = 0;
let selected = null;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const resultEl = document.getElementById("result");
const countEl = document.getElementById("questionCount");
const progressBar = document.getElementById("progressBar");

function renderQuestion() {
  selected = null;
  nextBtn.disabled = true;
  const item = questions[current];
  questionEl.textContent = item.q;
  countEl.textContent = `ข้อ ${current + 1} จาก ${questions.length}`;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
  answersEl.innerHTML = "";

  item.a.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    btn.addEventListener("click", () => chooseAnswer(index, btn));
    answersEl.appendChild(btn);
  });
}

function chooseAnswer(index, button) {
  if (selected !== null) return;
  selected = index;
  document.querySelectorAll(".answer").forEach(b => b.disabled = true);
  button.classList.add("selected");

  if (index === questions[current].correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    document.querySelectorAll(".answer")[questions[current].correct].classList.add("correct");
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
});

resetBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  resultEl.hidden = true;
  nextBtn.textContent = "ข้อต่อไป";
  renderQuestion();
});

function showResult() {
  questionEl.textContent = "ทำแบบทดสอบเสร็จแล้ว 🎉";
  countEl.textContent = "สรุปผลการเรียนรู้";
  answersEl.innerHTML = "";
  nextBtn.disabled = true;
  nextBtn.textContent = "เสร็จสิ้น";
  resultEl.hidden = false;

  let message = "ลองทบทวนเนื้อหาอีกครั้งแล้วทำใหม่ได้เลย";
  if (score === questions.length) message = "ยอดเยี่ยม! เข้าใจหลักเศรษฐกิจพอเพียงได้ครบถ้วน";
  else if (score >= 3) message = "ทำได้ดี! ทบทวนอีกเล็กน้อยเพื่อให้เข้าใจมากขึ้น";

  resultEl.innerHTML = `<strong>ได้ ${score} / ${questions.length} คะแนน</strong><br>${message}`;
}

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 450);
});
topBtn.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

renderQuestion();
