/**
 * Approved copyright / educational disclaimer. Wording is fixed by the
 * project owner: do not paraphrase or shorten without approval.
 */
export function Disclaimer({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <section id="disclaimer" className="disclaimer" aria-labelledby="disclaimer-title">
      <H id="disclaimer-title">Educational Content &amp; Copyright Notice</H>
      <p>
        <strong>Educational Disclaimer:</strong> BoardPrep is an independent educational platform created to help
        students understand and revise academic subjects through summaries, explanations, practice material, and other
        learning resources.
      </p>
      <p>
        BoardPrep does not claim ownership of third-party textbooks, literary works, trademarks, syllabus documents, or
        other copyrighted materials referenced on the platform. The respective copyrights, trademarks, and
        intellectual-property rights remain with their respective owners.
      </p>
      <p>
        Where third-party works or prescribed texts are referenced, the platform aims to provide original educational
        summaries, explanations, analysis, and learning support rather than reproduce substantial portions of
        copyrighted material.
      </p>
      <p>
        Any third-party names, titles, trademarks, or references are used for identification, educational reference,
        and informational purposes and do not imply affiliation, sponsorship, endorsement, or ownership unless
        explicitly stated.
      </p>
      <p>
        <strong>
          BoardPrep does not represent itself as an official website of CISCE or any other educational board,
          publisher, author, or copyright holder.
        </strong>
      </p>
      <p>
        If any rights holder believes that specific material on the platform requires correction, attribution,
        modification, or removal, they may contact the platform administrator for review.
      </p>
      <h3 className="disclaimer-sub">Who owns what</h3>
      <ul>
        <li>
          <strong>Third-party material</strong> (prescribed texts, syllabus documents, names and titles) is owned by its
          respective copyright holder.
        </li>
        <li>
          <strong>BoardPrep-created material</strong> (original summaries, explanations, questions, answers, the way
          the content is organised, the interface and other learning resources) was created for students by BoardPrep.
        </li>
      </ul>
    </section>
  );
}
