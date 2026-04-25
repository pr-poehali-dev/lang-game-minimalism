export interface Question {
  id: number;
  question: string;
  hint?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface LessonData {
  id: number;
  title: string;
  emoji: string;
  gradient: string;
  intro: string;
  rule: string;
  questions: Question[];
}

export const lessonsData: LessonData[] = [
  {
    id: 0,
    title: "Глагол TO BE",
    emoji: "🌱",
    gradient: "linear-gradient(135deg,#22C55E,#14B8A6)",
    intro: "Глагол TO BE — самый важный в английском! Он означает «быть/является».",
    rule: "I am • He/She/It is • We/You/They are",
    questions: [
      {
        id: 0,
        question: "I ___ a student.",
        hint: "Подсказка: говорим про себя (I)",
        options: ["am", "is", "are", "be"],
        correct: 0,
        explanation: "С «I» (я) всегда используем «am» → I am",
      },
      {
        id: 1,
        question: "She ___ happy.",
        hint: "Подсказка: говорим про неё (She)",
        options: ["am", "are", "is", "be"],
        correct: 2,
        explanation: "С «She/He/It» используем «is» → She is happy",
      },
      {
        id: 2,
        question: "They ___ friends.",
        hint: "Подсказка: говорим про нескольких (They)",
        options: ["is", "am", "be", "are"],
        correct: 3,
        explanation: "С «They/We/You» используем «are» → They are friends",
      },
      {
        id: 3,
        question: "We ___ at school.",
        options: ["is", "am", "are", "be"],
        correct: 2,
        explanation: "С «We» используем «are» → We are at school",
      },
      {
        id: 4,
        question: "He ___ a teacher.",
        options: ["am", "are", "be", "is"],
        correct: 3,
        explanation: "С «He» используем «is» → He is a teacher",
      },
    ],
  },
  {
    id: 1,
    title: "Артикли",
    emoji: "📖",
    gradient: "linear-gradient(135deg,#3B82F6,#6366F1)",
    intro: "Артикли «a/an» и «the» указывают, о каком предмете идёт речь.",
    rule: "A/AN — впервые • THE — конкретный предмет",
    questions: [
      {
        id: 0,
        question: "___ apple is on the table.",
        hint: "Подсказка: «apple» начинается с гласной",
        options: ["A", "An", "The", "—"],
        correct: 1,
        explanation: "«An» используем перед словами, начинающимися с гласных: an apple",
      },
      {
        id: 1,
        question: "I have ___ cat.",
        hint: "Подсказка: впервые упоминаем кошку",
        options: ["the", "an", "a", "—"],
        correct: 2,
        explanation: "«A» — неопределённый артикль перед согласной: a cat",
      },
      {
        id: 2,
        question: "___ sun is very bright today.",
        options: ["A", "An", "The", "—"],
        correct: 2,
        explanation: "«The» — единственный предмет в мире: the sun",
      },
      {
        id: 3,
        question: "She is ___ engineer.",
        options: ["a", "an", "the", "—"],
        correct: 1,
        explanation: "«Engineer» начинается с гласной «e», поэтому «an engineer»",
      },
      {
        id: 4,
        question: "I saw ___ dog and ___ cat.",
        options: ["the/the", "a/a", "an/the", "a/the"],
        correct: 1,
        explanation: "Первое упоминание: a dog, a cat — не конкретные",
      },
    ],
  },
  {
    id: 2,
    title: "Местоимения",
    emoji: "👥",
    gradient: "linear-gradient(135deg,#8B5CF6,#EC4899)",
    intro: "Местоимения заменяют имена — вместо «Tom» говорим «he»!",
    rule: "I • You • He • She • It • We • They",
    questions: [
      {
        id: 0,
        question: "Tom is my friend. ___ is funny.",
        hint: "Подсказка: Tom — мальчик",
        options: ["She", "It", "He", "They"],
        correct: 2,
        explanation: "Tom — мужского рода, заменяем на «He»",
      },
      {
        id: 1,
        question: "Anna is a doctor. ___ works in a hospital.",
        options: ["He", "She", "It", "They"],
        correct: 1,
        explanation: "Anna — женского рода, заменяем на «She»",
      },
      {
        id: 2,
        question: "Tom and Anna are students. ___ study English.",
        options: ["He", "She", "It", "They"],
        correct: 3,
        explanation: "Двое людей = «They» (они)",
      },
      {
        id: 3,
        question: "This is my dog. ___ is very cute.",
        options: ["He", "She", "It", "They"],
        correct: 2,
        explanation: "Про животное (без пола) — «It»",
      },
      {
        id: 4,
        question: "My name is Alex. ___ am from Russia.",
        options: ["He", "She", "You", "I"],
        correct: 3,
        explanation: "Говорим про себя → «I»",
      },
    ],
  },
];
