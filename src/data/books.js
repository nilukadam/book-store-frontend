// Centralized mock database for books
// Frontend-only, no API, no backend

import atomicHabits from "../assets/books/atomic-habits.jpg";
import deepWork from "../assets/books/deep-work.jpg";
import psychologyOfMoney from "../assets/books/psychology-of-money.jpg";
import theAlchemist from "../assets/books/the-alchemist.jpg";

import feelGoodProductivity from "../assets/books/feel-good-productivity.jpg";
import mindfulProductivity from "../assets/books/mindful-productivity.jpg";
import hackingProductivity from "../assets/books/hacking-productivity.jpg";
import masterFocus from "../assets/books/master-focus.jpg";
import toxicProductivity from "../assets/books/toxic-productivity.jpg";
import dopamineDetox from "../assets/books/dopamine-detox.jpg";
import career3 from "../assets/books/career-3.jpg";
import solveProcrastination from "../assets/books/solve-procrastination.jpg";

const books = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    price: 399,
    rating: 4.6,
    description:
      "Atomic Habits shows how small daily improvements compound into remarkable results. It focuses on systems over goals and offers practical strategies to build good habits and break bad ones.",
    image: atomicHabits,
  },
  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    price: 449,
    rating: 4.5,
    description:
      "Deep Work explores the value of focused, distraction-free work in a noisy world. It explains how concentration leads to higher-quality output and meaningful productivity.",
    image: deepWork,
  },
  {
    id: "3",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 399,
    rating: 4.7,
    description:
      "This book explains how behavior and emotions shape financial decisions more than numbers do. It uses simple stories to teach timeless lessons about money and life.",
    image: psychologyOfMoney,
  },
  {
    id: "4",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 279,
    rating: 4.5,
    description:
      "A philosophical tale about following dreams and listening to the heart. The Alchemist blends simplicity, symbolism, and inspiration into a timeless story.",
    image: theAlchemist,
  },
  {
    id: "5",
    title: "Feel-Good Productivity",
    author: "Ali Abdaal",
    price: 499,
    rating: 4.4,
    description:
      "Focuses on joyful and sustainable productivity without burnout. The book emphasizes energy, curiosity, and balance over hustle culture.",
    image: feelGoodProductivity,
  },
  {
    id: "6",
    title: "Mindful Productivity for Entrepreneurs",
    author: "Alessio Rocchi",
    price: 399,
    rating: 4.2,
    description:
      "Blends mindfulness with practical routines for solo founders and creators. Ideal for building consistent habits without stress.",
    image: mindfulProductivity,
  },
  {
    id: "7",
    title: "Hacking Productivity",
    author: "Various",
    price: 349,
    rating: 4.3,
    description:
      "Actionable strategies for remote work and modern workflows. Designed for professionals optimizing focus and efficiency.",
    image: hackingProductivity,
  },
  {
    id: "8",
    title: "Master Focus",
    author: "Various",
    price: 450,
    rating: 4.3,
    description:
      "Helps build distraction-free routines for deep work sessions. Particularly useful for developers and knowledge workers.",
    image: masterFocus,
  },
  {
    id: "9",
    title: "Toxic Productivity",
    author: "Various",
    price: 299,
    rating: 4.5,
    description:
      "Challenges the hustle mindset and promotes emotional balance. Encourages healthier productivity habits over constant pressure.",
    image: toxicProductivity,
  },
  {
    id: "10",
    title: "Dopamine Detox",
    author: "Various",
    price: 249,
    rating: 4.1,
    description:
      "A short, practical guide to overcoming distractions and procrastination. Focuses on reducing instant gratification loops.",
    image: dopamineDetox,
  },
  {
    id: "11",
    title: "Career 3.0",
    author: "Abhijit Bhaduri",
    price: 450,
    rating: 4.5,
    description:
      "Explores future-ready skills for modern careers. A practical guide for navigating change in the tech-driven workplace.",
    image: career3,
  },
  {
    id: "12",
    title: "Solve Procrastination",
    author: "Various",
    price: 299,
    rating: 4.4,
    description:
      "Targets common delay patterns with simple, actionable tactics. Designed for quick wins and consistent progress.",
    image: solveProcrastination,
  },
];

export default books;
