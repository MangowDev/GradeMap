import React from "react";
import Navbar from "../components/bars/Navbar/Navbar";
import Footer from "../components/bars/footer/Footer";
import GradeMapLogo from "../assets/logo/GradeMapLogo.png";
import HomeLinks from "../components/home/HomeLinks";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <main className="flex-grow mb-8">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-5 items-center justify-center py-6 border-b-2 border-tertiary w-[50%]">
            <img className="w-45 h-45" src={GradeMapLogo}></img>
            <h1 className="text-details2 text-4xl font-josefin">Controla tus clases de manera sencilla.</h1>
          </div>
          <div className="flex w-[50%] flex-row items-stretch justify-center">
            <div className="flex flex-col w-full">
              <HomeLinks
                link="/users"
                text="Usuarios"
                side="left"
                icon="FaUsers"
              />
              <HomeLinks
                link="/computers"
                text="Ordenadores"
                side="left"
                icon="FaComputer"
              />
              <HomeLinks
                link="/grades"
                text="Notas"
                side="left"
                icon="MdGrade"
              />
            </div>
            <div className="w-1 bg-tertiary self-stretch"></div>
            <div className="flex flex-col w-full">
              <HomeLinks
                link="/classrooms"
                text="Aulas"
                side="right"
                icon="SiGoogleclassroom"
              />
              <HomeLinks
                link="/boards"
                text="Mesas"
                side="right"
                icon="SiAirtable"
              />
              <HomeLinks
                link="/subjects"
                text="Asignaturas"
                side="right"
                icon="MdOutlineSubject"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
