# Review of the legacy `icse.zip` content (not published)

`icse.zip` (left untouched in the repo root) holds a Class "9" English content tree. It was reviewed and NOT used:

1. **Wrong class.** Its prose and poetry (Home-coming, Bonku Babu's Friend, Oliver Asks for More, The Model
   Millionaire, The Boy who Broke the Bank, The Night Mail, Skimbleshanks, I Remember I Remember, A Doctor's Journal
   Entry, A Work of Artifice) are the Class 10 list in `data/icseEnglish.ts`. None of the Class 9 texts are present.
2. **Doubtful facts and quotes.** For example Phatik's deathbed line and parts of the "Home-coming" plot do not match
   the story as commonly read, and the quotations cannot be verified.
3. **Unverified exam claims.** Paper structure and mark splits ("Q2 is 10 marks", 20/30/30) are asserted without a source.
4. **Thin scaffolding.** Many answers and explanations are placeholders ("Format requirement.", "Student's own phrasing...").
5. `questionBankMeta.totalQuestions: 50` does not match the actual count.

Recommendation: write Class 10 fresh under `content/cisce/class-10/english/` using the same process as Class 9.
