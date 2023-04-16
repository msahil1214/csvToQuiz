import { useState } from "react";
import Papa from "papaparse";
import "./app.css";

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const updatedData = result.data.map((row, index) => {
          // Add a new "Question number" field to the beginning of each row
          return {
            "Question number": index + 1,
            ...row
          };
        });
        setData(updatedData);
      }
    });
  };

  function renderCell(content, correctOptions) {
    const options = [
      "Option A",
      "Option B",
      "Option C",
      "Option D",
      "Option E"
    ];

    // Check if correctOptions exists and is not an empty string
    if (correctOptions && correctOptions !== "") {
      // Split the correctOptions string into an array of individual letters
      const correctOptionsArray = correctOptions.split("");

      // Create a new array with the names of the options that should be highlighted
      const highlightedOptions = options.filter((option) =>
        correctOptionsArray.includes(option.charAt(option.length - 1))
      );

      // Apply the "highlight" class to the cells that correspond to the highlighted options
      return options.map((option) => {
        const cellContent = content[option];

        if (highlightedOptions.includes(option)) {
          return (
            <td key={option} className="highlight">
              {cellContent}
            </td>
          );
        } else {
          return <td key={option}>{cellContent}</td>;
        }
      });
    } else {
      // If correctOptions is empty or undefined, render the cells without highlighting
      return options.map((option) => {
        const cellContent = content[option];
        return <td key={option}>{cellContent}</td>;
      });
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Question number</th>
              <th>Objective</th>
              <th>Question</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Option E</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row["Question number"]}</td>
                <td>{row.Objective}</td>
                <td>{row.Question}</td>
                {renderCell(row, row["Correct Options"])}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
