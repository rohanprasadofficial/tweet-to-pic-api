import styled from "styled-components";
import "./App.css";
import Navbar from "./components/navbar";
import axios from "axios";
import { useState } from "react";
import Loader from "react-loader-spinner";

const App = () => {
  const [res, setRes] = useState(false);
  const [resURL, setResURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const downloadImage = () => {
    let tempLink = document.createElement("a");
    tempLink.href = resURL;
    tempLink.setAttribute("download", "tweet.png");
    tempLink.click();
  };

  const getURL = () => {
    let DTcheckBox = document.getElementById("dtcb");
    let STcheckBox = document.getElementById("stcb");
    let ACcheckBox = document.getElementById("accb");

    const linkInput = document.querySelector(".link-input");
    console.log(linkInput.value);
    if (linkInput.value === "") {
      alert("please enter the link ");
    } else {
      let dtChecked = false,
        stChecked = false,
        acChecked = false;

      if (DTcheckBox.checked) dtChecked = true;
      if (STcheckBox.checked) stChecked = true;
      if (ACcheckBox.checked) acChecked = true;

      let url = `http://localhost:5500/image?link=${linkInput.value}&timeline=${dtChecked}&stats=${stChecked}&actions=${acChecked}`;
      console.log(url);
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios
        .get(url, {
          responseType: "blob",
        })
        .then((response) => {
          // handle success
          if (response.status === 200) {
            var imageURL = window.URL.createObjectURL(response.data);

            let resimg = document.getElementById("resimg");
            resimg.style.display = "block";
            resimg.setAttribute("src", imageURL);
            setResURL(imageURL);
            setRes(true);
          } else {
            alert(
              "something went wrong , please ensure link is correct & public"
            );
          }
          setIsLoading(false);
        })

        .catch((error) => {
          // handle error
          setIsLoading(false);

          console.log(error);
          alert(
            "something went wrong , please ensure link is correct & public"
          );
        });
    }
  };

  const getImage = () => {
    setIsLoading(true);
    getURL();
  };

  const checkChecker = () => {
    let DTcheckBox = document.getElementById("dtcb");
    let STcheckBox = document.getElementById("stcb");

    let STconstcb = document.getElementById("con-stcb");
    let ACconstcb = document.getElementById("con-accb");
    if (DTcheckBox.checked === true) {
      STconstcb.style.display = "block";
    } else {
      STconstcb.style.display = "none";
    }

    if (STcheckBox.checked === true) {
      ACconstcb.style.display = "block";
    } else {
      ACconstcb.style.display = "none";
    }
  };

  return (
    <StyledApp>
      <Navbar />
      <div className="main">
        <input
          placeholder="https://twitter.com/rohanpdofficial/status/1337753355741892609"
          type="text"
          className="link-input"
        />

        <div className="checkboxs">
          <span>
            <input type="checkbox" onClick={checkChecker} id="dtcb" />
            <small title="Include Datetime">Include Datetime</small>
          </span>
          <span id="con-stcb">
            <input type="checkbox" onClick={checkChecker} id="stcb" />
            <small title="Include Stats">Include Stats</small>
          </span>
          <span id="con-accb">
            <input type="checkbox" onClick={checkChecker} id="accb" />
            <small title="Include Actions">Include Actions</small>
          </span>
        </div>
        {isLoading && (
          <Loader
            className="loader"
            type="Puff"
            color="black"
            height={100}
            width={100}
          />
        )}

        <img id="resimg" height="450" width="450" alt="resimage" />
        <small style={{ margin: "1rem auto" }}>
          Image may look distorted in preview , but will be available in good
          quality after download.
        </small>
        {res ? (
          <button onClick={downloadImage}>Download Tweet Image</button>
        ) : (
          <button onClick={getImage}>Get Tweet Image</button>
        )}
      </div>
      <StyledFooter>
        creative apps by{" "}
        <a href="https://www.rohanprasad.dev" target="blank">
          Ro.
        </a>
      </StyledFooter>
    </StyledApp>
  );
};

export default App;

const StyledFooter = styled.footer`
  padding: 0.5rem 0;
  margin: 0 auto;
  bottom: 0;
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
`;

const StyledApp = styled.div`
  font-family: "Inter", sans-serif;
  #resimg {
    margin: 1rem auto;
    display: none;
  }
  .loader {
    margin: 1rem auto;
  }

  .main {
    display: flex;
    flex-direction: column;
    .link-input {
      width: 50%;
      height: 40px;
      padding-left: 1rem;
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
      border: 0;
      outline: 0;
      margin: 1rem auto;
    }

    .checkboxs {
      display: flex;
      margin: 0 auto;
      flex-wrap: wrap;
      #con-stcb,
      #con-accb {
        display: none;
      }

      span {
        margin: 1rem;
      }
    }

    button {
      padding: 0.8rem 1rem;
      margin: 1rem auto;
      background-color: black;
      color: white;
      border: none;
      border-radius: 0.2rem;
    }
  }
`;
