import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter,  Routes, Route} from "react-router-dom";
import Login from './Login'
import Signup from './Signup'
import Post from './Post';
import QuestionBox from './QuestionBox';
import Newsletter from './Newsletter';
import Plans from './Plans';
import ThemesApp from './ThemesApp';
import * as themes from './theme/schema.json';
import { setToLS } from './utils/storage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Index = () => {
  console.log(themes.default);
  setToLS('all-themes', themes.default);

  return(
    <ThemesApp />
  )
}
root.render(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="post" element={<Post />} />
        <Route path="signup" element={<Signup />} />
        <Route path="findQuestion" element={<QuestionBox />} />
        <Route path="newsletter" element={<Newsletter/>}/>
        <Route path="plans" element={<Plans />} />
        <Route path='themes'element={<Index />} />
      </Routes>
      </BrowserRouter>
    </div>
);