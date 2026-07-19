import React, { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "../../data/site";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.scss";

/**
 * Purpose: Sticky site navigation with theme toggle and compact mobile menu.
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#top" onClick={closeMenu}>
          <span className="site-header__monogram" aria-hidden="true">
            {SITE.monogram}
          </span>
          <span className="site-header__name">{SITE.name}</span>
        </a>

        <nav
          className={`site-header__nav ${menuOpen ? "site-header__nav--open" : ""}`}
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <ThemeToggle />
          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`site-header__drawer ${menuOpen ? "site-header__drawer--open" : ""}`}
      >
        <nav aria-label="Mobile">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
