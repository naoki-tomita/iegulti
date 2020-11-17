import React, { useState } from "react";
import { render } from "react-dom";

const App = () => {
  const [data, setData] = useState([[0]]);
  function changeData(rowi, columnj, value) {
    const newData = data.map((row, i) =>
      row.map((column, j) =>
        ((i === rowi && j === columnj ? value : column))));
    setData(newData);
  }
  function addRow() {
    const newData = [...data, Array((data[0] ?? [0]).length).fill(0)];
    setData(newData);
  }
  function addColumn() {
    const newData = data.map(row => [...row, 0]);
    setData(newData);
  }
  return (
    <>
    <div>app</div>
    <div>
      timer
      <simple-clock></simple-clock>
    </div>
    <div>
      simple chart
      <table>
        <tbody>
        {data.map((row, i) =>
          <tr key={i}>
            {row.map((column, j) =>
              <td key={j}>
                <input
                  value={column}
                  onChange={el => changeData(i, j, el.target.value)}
                />
              </td>
            )}
            <td>
              <button onClick={addColumn}>+</button>
            </td>
          </tr>
        )}
        </tbody>
      </table>
      <button onClick={addRow}>+</button>
      <simple-chart data-columns={JSON.stringify(data.map((row, i) => [`data_${i}`, ...row]))}></simple-chart>
    </div>
    <div style={{width: "800px", height: "320px"}}>
      <div>横幅を800pxに制限しています</div>
      <qiita-list></qiita-list>
    </div>
    </>
  );
}

const app = document.createElement("div");
document.body.append(app);
render(<App />, app);
