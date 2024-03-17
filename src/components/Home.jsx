import React from "react";
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 text-white bg-[url('assets/img/home1.jpg')] bg-no-repeat bg-cover opacity-90">
      <div className=" w-full text-black lg:w-4/5 space-y-5 mt-10">
        <h1 className="text-5xl  font-bold leading-tight">
          Empowering Health, One Tap at a Time.
        </h1>
        <p>
        The medical website serves as a comprehensive resource for individuals seeking reliable health information and resources. With user-friendly navigation, visitors can easily access articles, guides, and videos covering various medical topics. The website offers insights on symptoms, conditions, treatments, and preventive care, catering to diverse healthcare needs. 
        </p>

        <Button title="See Services" />
      </div>
    </div>
  );
};

export default Home;
