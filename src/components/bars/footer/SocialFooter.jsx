import React from "react";

export default function SocialFooter({ logo: Logo, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex bg-secondary p-3.5 rounded-xl items-center justify-center transition-transform duration-200 hover:scale-108">
        <Logo size={26} />
      </div>
    </a>
  );
}
