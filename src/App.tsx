import { Route, Routes, Link,useLocation } from "react-router-dom"
import { useState,useEffect } from "react";
import Components from "./components";
import "./assets/css/global.css";
import "./assets/css/common.css";

let componentsList: Array<any> = [];

for (let key in Components) {
  componentsList.push(
    {
      element: Components[key],
      path: key
    }
  )
}

const { Plum, Mass, Scope } = Components;

function App() {

  const location = useLocation();

  useEffect(() => {
    (location.pathname === '/' && setHome(true)) || setHome(false) ;
  }, [location])
  

  const [home, setHome] = useState(true);

  return (
    <div className="app">
        <Routes>
          <Route path="/" element={
            <div className="linkList">
              {componentsList.map((component, index) => {
                return (
                  <Link className="link" to={component.path} key={index}>{component.path}</Link>
                )
              })}
            </div>
          }></Route>
          <Route path="/mass" element={<Mass />}></Route>
          <Route path="/plum" element={<Plum />}></Route>
          <Route path="/scope" element={<Scope />}></Route>
        </Routes>
        {!home
        ?
        <Link className="fixed goHome" to="/">Go Back Home</Link>
        :
        null
        }
    </div>
  );
}

export default App;
