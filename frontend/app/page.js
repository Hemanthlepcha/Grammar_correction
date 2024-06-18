"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { IoCopyOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import ReactTyped from "react-typed";
import Iframe from "react-iframe";

export default function Home() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([]);

  const handleInput = (e) => {
    setArr([]);
    e.preventDefault();
    console.log(input);
    setLoading(true);
    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputf: input }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.output);
    
        setOutput(data.output); // This will log the corrected output received from the Flask API
        const value = data.output.split("་");
        const newArr = []; // Create a new array to store indices
        input.split("་").forEach((word, index) => { // Use forEach instead of map
            if (word !== value[index]) {
                newArr.push(index); // Push index to newArr
            }
        });
        setArr(newArr); // Update arr with the new array of indices
        setLoading(false);
    })
    .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
    });
  }

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err); // Log error for debugging
    }
  };
  function typeWriter(outputText) {
    var i = 0;
    var outputElement = document.getElementById("typing-effect");
    outputElement.innerHTML = ''; // Clear the output container before starting

    function addNextCharacter() {
        if (i < outputText.length) {
            const charSpan = createCharacterSpan(outputText.charAt(i), i);
            outputElement.appendChild(charSpan);
            i++;
            setTimeout(addNextCharacter, 50); // Adjust typing speed if necessary
        }
    }

    addNextCharacter();
}
  return (
    <div
      className="flex-1 min-h-screen justify-center items-center bg-[#e1dcff]  scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 pt-10">
        <div className="w-[90%] lg:w-[500px] min-h-[380px] rounded-xl shadow-lg flex flex-col gap-2 justify-center items-center bg-[#F2ECFF]">
          <p className="text-x   text-left w-full ml-12 mt-3">Input</p>
          <form
            method="POST"
            className="flex flex-col justify-center items-center w-full space-y-4"
            onSubmit={handleInput}
          >
            <textarea
              onChange={(e) => setInput(e.target.value)}
              className="w-[90%] h-[70%] min-h-[250px] rounded-2xl border-[1px] border-[#d9c2ff] bg-[#F2ECFF] p-6"
            ></textarea>

            <div className="flex flex-col justify-end items-end w-full px-5 p-2">
              <button
                className="bg-[#90d8b3] text-black w-[100px] h-10 rounded-md"
                type="submit"
              >
                Correct
              </button>
            </div>
          </form>
        </div>
        <div className="w-[90%] lg:w-[500px] min-h-[380px] rounded-xl shadow-lg flex flex-col gap-2 justify-start items-center bg-[#F2ECFF]">
          <p className="text-x text-left w-full ml-12 mt-3 ">Output</p>
          {loading ? (
            <div class="   relative w-[90%] h-[70%] min-h-[250px] rounded-2xl border-[1px] border-[#d9c2ff] bg-[#F2ECFF] p-6">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-[#CDAFFF] h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 bg-[#d0b4fd] rounded"></div>
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-[#d9c2ff] rounded col-span-2"></div>
                      <div class="h-2 bg-[#dcc6ff] rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-[#e5d4ff] rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              id="output"
              className="relative w-[90%] h-[70%] min-h-[250px] rounded-2xl border-[1px] border-[#d9c2ff] bg-[#F2ECFF] p-6"
            >
              {/* <ReactTyped strings={[output]} typeSpeed={100} loop /> */}
              {/* <HighlightedOutput input={input} output={output} /> */}
              <div id="typing-effect"></div>
              {output.split("་").map((word, index) => {
                if (input.split("་")[index] !== word) {
                  return (
                    <span
                      key={index}
                      className=" bg-[#43ff56a1]  "
                    >
                      {word + "་"}
                    </span>
                  );
                } else {
                  return <span key={index}>{word + "་"}</span>;
                }
              })}
              <button
                className="absolute right-2 bottom-2"
                onClick={handleCopyClick}
              >
                <IoCopyOutline />
              </button>
              <Toaster />
            </div>
          )}
        </div>
      </div>
      <div
        id="about-us"
        className="flex flex-col justify-center items-center gap-5 mt-[60px] scroll ease-in-out scroll-smooth"
      >
        <p className="text-3xl font-semibold text-center w-full p-4">
          བརྡ་ སྦྱོར : AI Based Grammar <span className="text-[#14c025a1]">Correction</span> Tool for Dzongkha
        </p>
        <div className="flex justify-center items-stretch">
          <Image
            src={require("../public/download.png")}
            alt="jhorwa"
            width={500}
            height={600}
            className="hidden lg:block "
          />
          <div className="w-[80%] lg:w-3/5 mx-auto space-y-5 bg-[#F2ECFF] text-[#474554] px-5 py-8 rounded-lg lg:rounded-r-lg lg:rounded-l-none border-[1px] flex flex-col justify-center">
            <p className="text-lg text-justify">
              This project relies on a deep-learning model we carefully selected
              after trying out different options. We&apos;ve teamed up with the
              Department of Culture and Dzongkha Development (DCDD) to make sure
              our web app supports Dzongkha language and culture. This
              partnership helps us stay true to our goal of promoting Dzongkha
              heritage and language.{" "}
            </p>
            <p className="text-lg text-justify">
              Our project aims to become the go-to tool, like Grammarly, but
              tailored for the Dzongkha language. Bhutanese students and
              Dzongkha scholars can use our system to enhance the grammar in
              their writing. Plus, future students can build on our work to
              expand the systems&apos; capabilities, such as adding spelling
              corrections to the existing grammar checks, which currently cover
              five aspects.
            </p>
          </div>
        </div>
      </div>
      <div
        id="about-team"
        className="flex flex-col justify-center items-center gap-5 mt-[60px]"
      >
        <p className="text-5xl font-semibold text-center w-full p-4 text-[#474554]">
          Meet the Team
        </p>
        <div className="flex flex-col w-full lg:flex-row justify-evenly items-center">
          <ProfileCard
            name={"Pema Galey"}
            role={"Project Guide"}
            path={require("../public/sir.JPG")}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center lg:justify-evenly">
          <div className="flex flex-col w-full md:w-1/2 lg:flex-row justify-center lg:justify-evenly items-center">
            <ProfileCard
              name={"Hemanth Lepcha"}
              role={"Project Lead"}
              path={require("../public/hemanthLepcha.jpeg")}
            />
            <ProfileCard
              name={"Tshering Jamtsho"}
              role={"Developer"}
              path={require("../public/j1.png")}
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:flex-row justify-center lg:justify-evenly items-center">
            <ProfileCard
              name={"Chimmi Wangmo"}
              role={"Developer"}
              path={require("../public/chi.png")}
            />
            <ProfileCard
              name={"Ugyen Penjor"}
              role={"Developer"}
              path={require("../public/up.png")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center w-full mt-[50px] bg-[#a486d3]">
      
       

        
        <div className="flex items-center bg-[#7970e1] w-[100%] justify-center">
          <p className="text-white text-md pb-2 pt-2 items-center">
            © 2024 College of Science and Technology. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
