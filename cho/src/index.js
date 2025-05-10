import ReactDOM from 'react-dom/client';
import { BrowerRouter } from "react-router-dom";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowerRouter>
    <App />
  </BrowerRouter>
);