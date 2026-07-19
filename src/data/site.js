/**
 * Purpose: Central site config — links, media paths, and brand copy.
 * Special Conditions: Swap video/poster/resume paths here when replacing assets.
 * Context: Imported by Hero, Contact, Footer, and IntroVideo.
 */

export const SITE = {
  name: "Vikas Mishra",
  monogram: "VM",
  role: "Forward Deployed & Full-Stack Engineer",
  title:
    "Software engineer building reliable products, integrations, and data-intensive systems.",
  support:
    "Full-stack product engineering, production integrations, and customer-facing technical delivery.",
  email: "vikas.mishra0796@gmail.com",
  calendarUrl: "https://cal.com/vikas-mshra/15min",
  githubUrl: "https://github.com/vikas-mshra",
  linkedinUrl: "https://linkedin.com/in/vikas-mshra",
  /**
   * Replace these files under public/resources/ to update media.
   * Video: intro-video.mp4
   * Poster: intro-poster.png
   * Résumé: VikasMishraResume.pdf
   * Note: put files in public/resources (not build/resources). npm start serves public/.
   */
  media: {
    videoSrc: `${process.env.PUBLIC_URL}/resources/intro-video.mp4`,
    posterSrc: `${process.env.PUBLIC_URL}/resources/intro-poster.png`,
    videoLabel: "A short personal introduction from Vikas Mishra",
  },
  resume: {
    label: "Download résumé (PDF)",
    href: `${process.env.PUBLIC_URL}/resources/VikasMishraResume.pdf`,
    downloadName: "VikasMishraResume.pdf",
  },
};

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
