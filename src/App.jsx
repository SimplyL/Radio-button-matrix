import React from "react";
import ReactDOM from "react-dom";
import Matrix from './components/Matrix';

const App = () => {
  return (
    <div>
      <Matrix />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));