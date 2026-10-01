import Link from "next/link";
import { routes } from "@/lib/content/routes";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          BoardPrep is an independent educational platform. It is not the official website of CISCE or any other
          board, publisher or author. Third-party works remain the property of their owners; summaries, explanations
          and questions are original BoardPrep study material.{" "}
          <Link className="text-link" href={routes.aboutDisclaimer}>Read the full educational and copyright notice</Link>.
        </p>
      </div>
    </footer>
  );
}
