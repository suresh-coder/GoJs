// ...............................
// App.jsx
// ...............................
import React, { useEffect, useState } from "react";
import BackIcon from "./components/BackIcon/BackIcon";

import "./App.css";
import OrgChart from "./components/OrgChart/OrgChart";
import getData from "./components/getData/getData"; // get JSON file

function App() {
  const [nodeDataArray, setData] = useState([]);
  const [bShow, showBackButton] = useState(false);
  const [arr, setBackNode] = useState([]);

  useEffect(() => {
    loadNodes(0); // load & show top nodes.
  }, []);

  function loadNodes(parentNode) {
    arr.push(parentNode);
    console.log("loadNodes() -> arr:", arr);
    getData(parentNode) // <== ALL nodes in the database
      .then((nodes) => {
        setData(nodes); // replaces the nodeDataArray and re-trigger OrgChart's re-rendering.
      });
  }

  function handleBackButtonClick(e) {
    e.preventDefault();
    console.log("handleBackButtonClick()");
    arr.pop();
    var parentKey = arr.pop();
    loadNodes(parentKey); // restore view to parent node
    if (arr.length < 2) showBackButton(false);
  }

  // This event is called by the child component OrgChart when the user
  // double-clicked on a node.  We will find sub-branches for that node
  // here and re-trigger the OrgChart display to show those sub-branches.
  const onNodeClickHandler = (nodeKey) => {
    // get sub-tree for this parent nodeKey
    console.log("onNodeClickHandler()");
    showBackButton(true);
    loadNodes(nodeKey);
  };

  return (
    <div className="App">
      <div className="app-orgchart-container">
        {bShow && (
          <button className="app-backbutton" onClick={handleBackButtonClick}>
            {bShow && <BackIcon className="app-backbutton" />}
          </button>
        )}
        <p />
        <OrgChart
          nodeDataArray={nodeDataArray}
          OnNodeClickEvent={onNodeClickHandler}
        />
      </div>
    </div>
  );
}

export default App;
