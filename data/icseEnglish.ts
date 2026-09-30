export type LiteratureItem = {
  type: "Drama" | "Prose" | "Poetry";
  title: string;
  author: string;
};

export const icseEnglish = {
  class9: {
    language: [
      "Composition",
      "Comprehension",
      "Grammar, structure and usage",
      "Board-style writing practice"
    ],
    literature: [
      { type: "Drama", title: "Julius Caesar (Acts I & II)", author: "William Shakespeare" },
      { type: "Prose", title: "With the Photographer", author: "Stephen Leacock" },
      { type: "Prose", title: "The Elevator", author: "William Sleator" },
      { type: "Prose", title: "The Girl Who Can", author: "Ama Ata Aidoo" },
      { type: "Prose", title: "The Pedestrian", author: "Ray Bradbury" },
      { type: "Prose", title: "The Last Lesson", author: "Alphonse Daudet" },
      { type: "Poetry", title: "Haunted Houses", author: "H.W. Longfellow" },
      { type: "Poetry", title: "The Glove and the Lions", author: "Leigh Hunt" },
      { type: "Poetry", title: "When Great Trees fall", author: "Maya Angelou" },
      { type: "Poetry", title: "A Considerable Speck", author: "Robert Frost" },
      { type: "Poetry", title: "The Power of Music", author: "Sukumar Ray" }
    ] as LiteratureItem[]
  },
  class10: {
    language: [
      "Composition",
      "Comprehension",
      "Grammar, structure and usage",
      "Board-style writing practice"
    ],
    literature: [
      { type: "Drama", title: "Julius Caesar (Acts III, IV & V)", author: "William Shakespeare" },
      { type: "Prose", title: "Bonku Babu's Friend", author: "Satyajit Ray" },
      { type: "Prose", title: "Oliver Asks for More", author: "Charles Dickens" },
      { type: "Prose", title: "The Model Millionaire", author: "Oscar Wilde" },
      { type: "Prose", title: "Home-coming", author: "Rabindranath Tagore" },
      { type: "Prose", title: "The Boy who Broke the Bank", author: "Ruskin Bond" },
      { type: "Poetry", title: "The Night Mail", author: "W.H. Auden" },
      { type: "Poetry", title: "Skimbleshanks: The Railway Cat", author: "T.S. Eliot" },
      { type: "Poetry", title: "I Remember, I Remember", author: "Thomas Hood" },
      { type: "Poetry", title: "A Doctor's Journal Entry for August 6, 1945", author: "Vikram Seth" },
      { type: "Poetry", title: "A Work of Artifice", author: "Marge Piercy" }
    ] as LiteratureItem[]
  }
};