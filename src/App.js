import { useRef, useState } from "react";
import "./App.css";
import { data } from "./Data";
import Popover from "./Popover";

function App() {
  const ele = useRef()
  const [popPos , setPopPos] = useState(['b' , 'l'])
  return (
    <>
      <div className="App" ref={ele}>
        <table className="main-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Children</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={`item.name ${i}`}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{item.children}</td>
                <td>
                  <Popover data={item} element={ele} popPos={popPos}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="input-buttons">
        <button style={{backgroundColor: popPos.toString()==='t,l' ? "blue" : 'steelblue'}} onClick={()=>setPopPos(['t','l'])}>Top-Left</button>
        <button style={{backgroundColor: popPos.toString()==='t,r' ? "blue" : 'steelblue'}} onClick={()=>setPopPos(['t','r'])}>Top-Right</button>
        <button style={{backgroundColor: popPos.toString()==='b,l' ? "blue" : 'steelblue'}} onClick={()=>setPopPos(['b','l'])}>Bottom-Left</button>
        <button style={{backgroundColor: popPos.toString()==='b,r' ? "blue" : 'steelblue'}} onClick={()=>setPopPos(['b','r'])}>Bottom-Right</button>
        <button style={{backgroundColor: popPos.toString()==='a,u' ? "blue" : 'steelblue'}} onClick={()=>setPopPos(['a','u'])}>Auto</button>
      </div>
    </>
  );
}

export default App;
