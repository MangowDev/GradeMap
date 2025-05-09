import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import SocialFooter from "./SocialFooter";
import { PiFinnTheHuman } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 py-3 font-sansation text-lg text-white sm:grid-cols-3 w-full px-6 bg-cuaternary border-t border-primary">
      <div className="flex flex-col space-y-2 items-start justify-center">
        <div className="flex flex-row items-center space-x-3">
          <MdEmail className="text-primary"/>
          <p>
            MangoDev - 2025 | {" "}
            <span className="font-bold">mangodev03@gmail.com</span>
          </p>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <FaPhoneAlt className="text-primary"/>
          <p className="mt-1 font-bold">958 77 95 76</p>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <FaMapMarkerAlt className="text-primary"/>
          <p className="mt-1">C. Blas Infante, 28, 18650 Dúrcal, Granada</p>
        </div>
      </div>
      <div className="flex flex-row items-center text-xl justify-center">
        <p>
          I.E.S Alonso Cano{" "}
          <a
            className="text-primary hover:underline"
            href="https://iesalonsocano.es/"
          >
            <b>Visita la web</b>
          </a>
        </p>
      </div>
      <div className="flex flex-row space-x-3.5 items-center justify-end">
          <SocialFooter logo={FaTwitter} link="https://x.com/Angelniwe33"/>
          <SocialFooter logo={PiFinnTheHuman} link="https://angelrobles.netlify.app/"/>
          <SocialFooter logo={FaLinkedin} link="https://www.linkedin.com/in/ángel-robles-76784a313"/>
          <SocialFooter logo={FaGithub} link="https://github.com/MangowDev"/>
      </div>
    </footer>
  );
}
