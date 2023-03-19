import React, { useEffect } from "react";

const ResultContainer = ({ isReveal, members, setEstimate }) => {
  let summary = [];
  const count = [];

  let average;
  let sum = 0;
  members?.data?.members?.map((member) => {
    if (member?.story_point) {
      summary.push(member.story_point);
    }
  });

  summary.forEach((element) => {
    count[element] = (count[element] || 0) + 1;
    sum = sum + parseInt(element);
  });

  average = sum / summary.length;

  useEffect(() => {
    setEstimate(average);
  }, [average]);

  const frequencyArray = Object.keys(count).map((key) => ({
    element: key,
    count: count[key],
  }));

  return (
    <div className="session-result-container">
      <table>
        <caption>
          <h1>Round Summary</h1>
        </caption>
        <thead>
          <tr>
            <th>Average</th>
            <th>{average ? average : ""}</th>
          </tr>
        </thead>

        {/* <tbody>
          {frequencyArray?.map((value, key) => (
            <tr>
              <td data-label="Value">{value.element}</td>
              <td data-label="Count">{value.count}</td>
            </tr>
          ))}

          <tr>
            <td>Average</td>
            <td>{average}</td>
          </tr>
        </tbody> */}
      </table>
    </div>
  );
};

export default ResultContainer;
