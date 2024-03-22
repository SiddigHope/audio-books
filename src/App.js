import React, { useState, useLayoutEffect, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { vars } from './constants';
import Input from './components/Input';
import axios from 'axios';

function App() {

  const [grade, setGrade] = useState()
  const [book, setBook] = useState()
  const [language, setLanguage] = useState()
  const [keyword, setKeyword] = useState()
  const [page, setPage] = useState()
  const [audio, setAudio] = useState()

  useLayoutEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    apiRequest('grades', 'GET')
    apiRequest('books', 'GET')
    apiRequest('language', 'GET')
    apiRequest('keywords', 'GET')
  }

  const apiRequest = async (url, method, data) => {
    const options = {
      method,
      url: "http://127.0.0.1:8000/api/v1/" + url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data
    };

    const request = await axios(options)
      .then((response) => {
        // console.log(response.data)
        setVars(url, response.data)
      })
      .catch((error) => error.response);
    // console.log(request)
  }

  const setVars = (url, data) => {
    switch (url) {
      case "grades":
        setGrade(data.map(item => {
          item.name = item.LibArFiliere
          item.value = item.code_classe
          return item
        }))
        break;
      case "books":
        setBook(data.map(item => {
          item.name = item.arabic_name
          item.value = item.book_id
          return item
        }))
        break;
      case "language":
        setLanguage(data.map(item => {
          item.name = item.langue
          item.value = item.id
          return item
        }))
        break;
      case "keywords":
        setKeyword(data.map(item => {
          item.name = item.name_choix
          item.value = item.id
          return item
        }))
        break;
      default:
        setPage(2)
        break;
    }
  }

  const readFile = (input) => {
    input.preventDefault()
    const target = input.target
    console.log("check if target has files");
    if (target.files && target.files[0]) {
      console.log("target has files");
      const file = target.files[0];
      const reader = new FileReader();

      console.log(file.type.toString());
      if (
        file.type.toString() == "audio/mpeg" ||
        file.type.toString() == "audio/mp3"
      ) {
        console.log("target file is mp3");
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          setAudio(e.target.result);
          console.log(e.target.result);
        };
      }
    }
  };

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    formData.append("audio", audio)
    apiRequest('audio_save', 'POST', formData)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='container bg-white box-content'>
          <h1 className='text-lg text-black'> {vars.title} </h1>
          <form method="post" onSubmit={handleSubmit} >
            <div className='input-row'>
              <Input type={"select"} name={"grade"} options={grade} label={"اختار الكلاس"} />
              <Input type={"select"} name={"book"} options={book} label={"اختار الكتاب"} />
            </div>
            <div className='input-row'>
              <Input type={"select"} name={"language"} options={language} label={"اختار اللغة"} />
              <Input type={"select"} name={"keyword"} options={keyword} label={"الكلمة المفتاحية"} />
            </div>
            <Input type={"number"} name={"page"} onChangeHandler={readFile} label={"اختار رقم الصفحة"} />
            <Input type={"file"} name={"file"} label={"التسجيل الصوتي"} accept={".mp3"} onChangeHandler={readFile} />
            <Input type={"submit"} name={"submit"} value={"اكمال العملية"} className={" mt-5 bg-green-400"} />
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
