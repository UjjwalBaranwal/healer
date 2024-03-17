import React from "react";
import img from "../assets/img/doctors1.jpg";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className=" text-justify lg:text-start">
        The medical website serves as a comprehensive resource for individuals seeking reliable health information and resources. With user-friendly navigation, visitors can easily access articles, guides, and videos covering various medical topics. 
        </p>
        <p className="text-justify lg:text-start">
        The website offers insights on symptoms, conditions, treatments, and preventive care, catering to diverse healthcare needs. Additionally, it provides a platform for users to interact with healthcare professionals through forums or virtual consultations. 
        </p>
        <p className="text-justify lg:text-start">
        The site prioritizes accuracy and credibility by sourcing information from reputable medical professionals and institutions. Overall, the medical website strives to empower users with knowledge, support informed decision-making, and promote overall well-being.
        </p>
      </div>
      <div className=" w-full lg:w-3/4">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
