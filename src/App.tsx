import { useState } from 'react'
import './App.css'
import { Chart } from "react-google-charts";

type CountryData = Array<[string, number]>;

function App() {
  const visitedHeader = ["Country", "Level"]
  const [visited, setVisited] = useState<CountryData>([
    ["Germany", 0],
    ["United States", 0],
    ["Brazil", 0],
    ["Canada", 0],
    ["France", 0],
    ["RU", 0],
    ["JAPAN", 4],
  ])
  const handleChartSelect = ({ chartWrapper }: any) => {
    const selection = chartWrapper.getChart().getSelection();
    if (selection.length === 0) return;

    const index = selection[0].row;
    const newVisited = [...visited]; // Create a new copy of the visited array
    newVisited[index][1] = newVisited[index][1] + 1;
    if (newVisited[index][1] > 4) {
      newVisited[index][1] = 0;
    }
    console.log(chartWrapper);
    console.log(typeof(chartWrapper));
    setVisited(newVisited); // Update the state with the new array
  }
  return (
    <>
      <h1>Count-Ries</h1>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: handleChartSelect,
          },
        ]}
        chartType="GeoChart"
        width="100vh"
        height="400px"
        data={[visitedHeader, ...visited]}
        options={{
          legend: "none",
        }}
      />
    </>
  )
}

export default App
