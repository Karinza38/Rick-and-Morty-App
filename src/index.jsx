import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CharacterProvider } from "./store/filter-context";
import CharacterDetail from "./pages/CharacterDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from 'antd';
import Header from './components/Header';

let year = new Date().getFullYear();

const ApplyLayout = (page, pagename) => <Layout>
  <Header filter={pagename == 'app' ? '' : 'hidden'} goback={pagename == 'app' ? 'hidden' : ''} />

  {page}
  <footer style={{ textAlign: 'center', position: 'sticky', top: '95vh', fontSize: '16px', marginTop: "30px", marginBottom: "20px" }}>
    <hr/>
    <span>
      ©RickandMortyCharacters {year}{" "}. All Rights Reserved.
    </span>
  </footer>
</Layout>;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CharacterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ApplyLayout(<App />, 'app')} />
          <Route path="/:id" element={ApplyLayout(<CharacterDetail />, 'character-detail')} />
        </Routes>
      </BrowserRouter>
    </CharacterProvider>
  </React.StrictMode>
);


reportWebVitals();
