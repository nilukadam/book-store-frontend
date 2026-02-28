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

// Centralized mock database for books
// Production-ready mock catalog (frontend only)

const books = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    price: 399,
    originalPrice: 599,
    rating: 4.6,
    description:
      "Atomic Habits reveals how small daily improvements compound into remarkable long-term results. It focuses on building systems instead of chasing goals and provides practical frameworks for habit formation and behavior change.",

    format: "Paperback",
    language: "English",
    pages: 320,
    publisher: "Penguin Random House",
    isbn: "9780735211292",
    bestseller: true,
    inStock: true,
    deliveryDays: 3,

    cover: atomicHabits,
  },

  {
    id: "2",
    title: "Deep Work",
    author: "Cal Newport",
    price: 449,
    rating: 4.5,
    description:
      "Deep Work explores the power of focused, distraction-free concentration in a noisy world. It argues that the ability to perform deep work is becoming increasingly rare and valuable in the modern knowledge economy.",

    format: "Paperback",
    language: "English",
    pages: 296,
    publisher: "Grand Central Publishing",
    isbn: "9781455586691",
    bestseller: false,
    inStock: true,
    deliveryDays: 4,

    cover: deepWork,
  },

  {
    id: "3",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 399,
    originalPrice: 499,
    rating: 4.7,
    description:
      "This book explains how emotions and personal behavior shape financial decisions more than pure mathematics. Through engaging stories, it delivers timeless lessons about wealth, greed, and happiness.",

    format: "Paperback",
    language: "English",
    pages: 256,
    publisher: "Jaico Publishing House",
    isbn: "9789390166268",
    bestseller: true,
    inStock: true,
    deliveryDays: 3,

    cover: psychologyOfMoney,
  },

  {
    id: "4",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 279,
    rating: 4.5,
    description:
      "The Alchemist is a philosophical novel about following one's dreams and listening to the heart. Through Santiago’s journey, it conveys powerful messages about destiny, faith, and self-discovery.",

    format: "Paperback",
    language: "English",
    pages: 208,
    publisher: "HarperCollins",
    isbn: "9780062315007",
    bestseller: true,
    inStock: true,
    deliveryDays: 5,

    cover: theAlchemist,
  },

  {
    id: "5",
    title: "Feel-Good Productivity",
    author: "Ali Abdaal",
    price: 499,
    originalPrice: 699,
    rating: 4.4,
    description:
      "Feel-Good Productivity challenges hustle culture by promoting joy-driven performance. It focuses on building sustainable productivity systems without burnout or emotional exhaustion.",

    format: "Hardcover",
    language: "English",
    pages: 304,
    publisher: "Celadon Books",
    isbn: "9781250865038",
    bestseller: false,
    inStock: true,
    deliveryDays: 4,

    cover: feelGoodProductivity,
  },

  {
    id: "6",
    title: "Mindful Productivity for Entrepreneurs",
    author: "Alessio Rocchi",
    price: 399,
    rating: 4.2,
    description:
      "This book blends mindfulness principles with practical routines for founders and creators. It helps entrepreneurs build consistent habits while maintaining clarity and balance.",

    format: "Paperback",
    language: "English",
    pages: 230,
    publisher: "Indie Press",
    isbn: "9781838249102",
    bestseller: false,
    inStock: true,
    deliveryDays: 6,

    cover: mindfulProductivity,
  },

  {
    id: "7",
    title: "Hacking Productivity",
    author: "Daniel Reed",
    price: 349,
    originalPrice: 449,
    rating: 4.3,
    description:
      "Hacking Productivity offers actionable strategies for modern professionals navigating remote work and digital distractions. It focuses on optimizing energy, focus, and workflow efficiency.",

    format: "Paperback",
    language: "English",
    pages: 275,
    publisher: "TechMind Publications",
    isbn: "9781647823122",
    bestseller: false,
    inStock: true,
    deliveryDays: 3,

    cover: hackingProductivity,
  },

  {
    id: "8",
    title: "Master Focus",
    author: "Sophia Clarke",
    price: 450,
    rating: 4.3,
    description:
      "Master Focus helps readers develop distraction-free routines for deep work sessions. It is particularly valuable for developers, students, and knowledge workers seeking sustained concentration.",

    format: "Paperback",
    language: "English",
    pages: 310,
    publisher: "FocusWorks Media",
    isbn: "9781984829912",
    bestseller: false,
    inStock: true,
    deliveryDays: 4,

    cover: masterFocus,
  },

  {
    id: "9",
    title: "Toxic Productivity",
    author: "Ryan Foster",
    price: 299,
    rating: 4.5,
    description:
      "Toxic Productivity challenges the obsession with constant output and hustle. It promotes emotional well-being, realistic goal-setting, and healthier work-life integration.",

    format: "Paperback",
    language: "English",
    pages: 240,
    publisher: "Balance Press",
    isbn: "9781398701120",
    bestseller: false,
    inStock: false,
    deliveryDays: 5,

    cover: toxicProductivity,
  },

  {
    id: "10",
    title: "Dopamine Detox",
    author: "Maya Bennett",
    price: 249,
    originalPrice: 349,
    rating: 4.1,
    description:
      "Dopamine Detox is a concise guide to overcoming distractions and breaking instant gratification loops. It offers simple exercises to reset focus and build healthier attention habits.",

    format: "Paperback",
    language: "English",
    pages: 190,
    publisher: "Clarity House",
    isbn: "9781919614502",
    bestseller: false,
    inStock: true,
    deliveryDays: 2,

    cover: dopamineDetox,
  },

  {
    id: "11",
    title: "Career 3.0",
    author: "Abhijit Bhaduri",
    price: 450,
    rating: 4.5,
    description:
      "Career 3.0 explores future-ready skills and adaptability in the digital era. It offers practical advice for navigating career transitions in an evolving technology-driven world.",

    format: "Paperback",
    language: "English",
    pages: 280,
    publisher: "Bloomsbury India",
    isbn: "9789354352378",
    bestseller: false,
    inStock: true,
    deliveryDays: 4,

    cover: career3,
  },

  {
    id: "12",
    title: "Solve Procrastination",
    author: "Alex Morgan",
    price: 299,
    rating: 4.4,
    description:
      "Solve Procrastination addresses common delay patterns and provides actionable techniques for building consistent progress. It is designed for readers seeking quick wins and sustainable discipline.",

    format: "Paperback",
    language: "English",
    pages: 210,
    publisher: "Momentum Books",
    isbn: "9781626349124",
    bestseller: false,
    inStock: true,
    deliveryDays: 3,

    cover: solveProcrastination,
  },
];

export default books;
