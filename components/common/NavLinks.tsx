import Link from "next/link";
import { useEffect, useState } from "react";
import { NavLinksProps } from "../../types/MobileNavProps";

const sections = [
  { id: "home", label: "Home" },
  { id: "iuc", label: "Our council" },
  { id: "academic", label: "Academics" },
  { id: "news", label: "News" },
];

export const NavLinks = ({ className = "", onClick, isHomePage = true }: NavLinksProps & { isHomePage?: boolean }) => {
  const [active, setActive] = useState("home");
  useEffect(() => {
    if (!isHomePage) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -50% 0px", threshold: 0 });
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [isHomePage]);

  return <>{sections.map(({ id, label }) => (
    <Link key={id} href={isHomePage ? `#${id}` : id === "news" ? "/news" : `/#${id}`} className={`nav-link ${className} ${isHomePage && active === id ? "is-active" : ""}`} aria-current={isHomePage && active === id ? "location" : undefined} onClick={() => { setActive(id); onClick?.(); }}>
      {label}
    </Link>
  ))}</>;
};
