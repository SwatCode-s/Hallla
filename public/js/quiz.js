// بيانات الاختبار - أسئلة وإجابات
const quizData = [
    {
        question: "ما هو لوني المفضل؟",
        options: ["الأزرق", "الأحمر", "الأسود", "الأخضر"],
        correctAnswer: 2 // الأسود (الفهرس يبدأ من 0)
    },
    {
        question: "شو اكثر اشغله بحبها؟",
        options: ["البرمجة", "صحابي", "انتي"],
        correctAnswer: 2,
    },
    {
        question: "شو اكثر اشغله من بعدك؟",
        options: ["القراءة", "البرمجة", "الرياضة", "ضحكتك"],
        correctAnswer: 3
    },

    {
        question: "ما هي هوايتي",
        options: ["القراءة", "البرمجة", "الاكل", "اضحكك"],
        correctAnswer: 3
    },
    {
        question: "ايش اكثر حيوان بحبه",
        options: ["القطط", "الكلاب", "الأسود", "الطيور"],
        correctAnswer: 0 // القطط
    },
    {
        question: "ما هو فصلي المفضل من السنة؟",
        options: ["الربيع", "الصيف", "الخريف", "الشتاء"],
        correctAnswer: 3 
    },
    {
        question: "ما هو أكثر شيء أحبه فيكِ؟",
        options: ["عيونك", "ابتسامتك", "شخصيتك", "كل شيء فيكِ"],
        correctAnswer: 3 // كل شيء فيكِ
    },

    {
        question: "ما هو أكثر شيء ممكن يضايقني",
        options: ["الكذب", "التأخير", "الإهمال", "الضوضاء"],
        correctAnswer: 0 // الكذب
    },
    {
        question: "ما هو حلمي للمستقبل؟",
        options: ["أن نكون معاً دائماً", "متلاك شركة خاصة", "سكب مش عارف شو اكتب"],
        correctAnswer: 0 // أن نكون معاً دائماً
    }
];

const resultMessages = [
    { min: 0, max: 3, message: "ها" },
    { min: 4, max: 6, message: "بحبك بس يعني خص زعلت" },
    { min: 7, max: 8, message: "خص بحبككك" },
    { min: 9, max: 9, message: "خص دبلعككك وليي❤️❤️❤️" }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const startQuizBtn = document.getElementById('start-quiz-btn');
const quizQuestions = document.getElementById('quiz-questions');
const quizResult = document.getElementById('quiz-result');
const retryQuizBtn = document.getElementById('retry-quiz-btn');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const resultMessageElement = document.getElementById('result-message');

// بدء الاختبار
if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz);
}

// إعادة الاختبار
if (retryQuizBtn) {
    retryQuizBtn.addEventListener('click', resetQuiz);
}

// دالة بدء الاختبار
function startQuiz() {
    document.getElementById('quiz-start').classList.add('hidden');
    quizQuestions.classList.remove('hidden');
    
    // إعداد الأسئلة
    showQuestion();
}

// عرض السؤال الحالي
function showQuestion() {
    // تفريغ محتوى الأسئلة
    quizQuestions.innerHTML = '';
    
    if (currentQuestion < quizData.length) {
        const questionData = quizData[currentQuestion];
        
        // إنشاء عنصر السؤال
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');
        
        // نص السؤال
        const questionText = document.createElement('div');
        questionText.classList.add('question-text');
        questionText.textContent = `${currentQuestion + 1}. ${questionData.question}`;
        questionElement.appendChild(questionText);
        
        // خيارات الإجابة
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('question-options');
        
        // إضافة كل خيار
        questionData.options.forEach((option, index) => {
            const optionLabel = document.createElement('label');
            optionLabel.classList.add('option-label');
            
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question-${currentQuestion}`;
            optionInput.value = index;
            optionInput.classList.add('option-radio');
            optionInput.checked = userAnswers[currentQuestion] === index;
            
            optionInput.addEventListener('change', () => {
                userAnswers[currentQuestion] = index;
            });
            
            const optionText = document.createElement('span');
            optionText.classList.add('option-text');
            optionText.textContent = option;
            
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(optionText);
            optionsContainer.appendChild(optionLabel);
        });
        
        questionElement.appendChild(optionsContainer);
        
        // أزرار التنقل
        const navigationContainer = document.createElement('div');
        navigationContainer.classList.add('quiz-navigation');
        
        // زر السابق
        if (currentQuestion > 0) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('nav-btn', 'prev-btn');
            prevButton.textContent = 'السؤال السابق';
            prevButton.addEventListener('click', prevQuestion);
            navigationContainer.appendChild(prevButton);
        } else {
            // إضافة عنصر فارغ للمحافظة على التنسيق
            const emptyDiv = document.createElement('div');
            navigationContainer.appendChild(emptyDiv);
        }
        
        // زر التالي أو الإرسال
        const nextButton = document.createElement('button');
        nextButton.classList.add('nav-btn');
        
        if (currentQuestion === quizData.length - 1) {
            nextButton.textContent = 'إظهار النتيجة';
            nextButton.classList.add('submit-btn');
            nextButton.addEventListener('click', showResult);
        } else {
            nextButton.textContent = 'السؤال التالي';
            nextButton.classList.add('next-btn');
            nextButton.addEventListener('click', nextQuestion);
        }
        
        navigationContainer.appendChild(nextButton);
        questionElement.appendChild(navigationContainer);
        
        // إضافة السؤال إلى الصفحة
        quizQuestions.appendChild(questionElement);
    }
}

// الانتقال إلى السؤال التالي
function nextQuestion() {
    if (userAnswers[currentQuestion] === undefined) {
        alert('الرجاء اختيار إجابة قبل الانتقال للسؤال التالي');
        return;
    }
    
    currentQuestion++;
    showQuestion();
    
    // تمرير إلى أعلى الصفحة
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// العودة إلى السؤال السابق
function prevQuestion() {
    currentQuestion--;
    showQuestion();
    
    // تمرير إلى أعلى الصفحة
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// عرض النتيجة
function showResult() {
    if (userAnswers[currentQuestion] === undefined) {
        alert('الرجاء اختيار إجابة قبل إظهار النتيجة');
        return;
    }
    
    // حساب النتيجة
    score = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correctAnswer) {
            score++;
        }
    }
    
    // عرض النتيجة
    quizQuestions.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = quizData.length;
    
    // تحديد رسالة النتيجة
    for (const resultMessage of resultMessages) {
        if (score >= resultMessage.min && score <= resultMessage.max) {
            resultMessageElement.textContent = resultMessage.message;
            break;
        }
    }
    
    // إضافة قلوب متحركة للنتيجة
    addHearts();
}

// إضافة قلوب متحركة للنتيجة
function addHearts() {
    const resultContainer = document.querySelector('.quiz-result');
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'result-heart');
        
        // تحديد موقع وحجم عشوائي للقلب
        const size = Math.random() * 20 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const rotation = Math.random() * 360;
        
        heart.style.fontSize = `${size}px`;
        heart.style.color = `hsl(${340 + Math.random() * 20}, ${80 + Math.random() * 20}%, ${60 + Math.random() * 20}%)`;
        heart.style.position = 'absolute';
        heart.style.top = `${posY}%`;
        heart.style.left = `${posX}%`;
        heart.style.transform = `rotate(${rotation}deg)`;
        heart.style.opacity = '0.7';
        heart.style.animation = `float 10s ease-in infinite`;
        heart.style.animationDelay = `${delay}s`;
        
        resultContainer.appendChild(heart);
    }
}

// إعادة تعيين الاختبار
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    quizResult.classList.add('hidden');
    
    // إزالة القلوب المتحركة
    const hearts = document.querySelectorAll('.result-heart');
    hearts.forEach(heart => heart.remove());
    
    startQuiz();
}
