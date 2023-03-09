import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './index.css';

export default function Home() {
  return (
    <>
      <h1 className="">Word Game:The Next Level</h1>
       <div className="home">
        Choose the Level
        <div className="message">
        <button>
        <Link to="/easy" className="button2">Easy</Link>
        </button> 
        <button>
        <Link to="/hard" className="button2">Hard</Link>
        </button>
        <Outlet />
        </div>
       </div>
      
    </>
  );
}