// GradingSystem.jsx
import React, { useState } from "react";
import axios from "axios";

const GradingSystem = () => {
  const [gradingRules, setGradingRules] = useState({
    A: 26,
    B: 20,
    C: 15,
    D: 10,
  });

  const handleSaveGradingRules = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/grading-rules",
        gradingRules,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Grading rules updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update grading rules.");
    }
  };

  return (
    <div className="grading-system-container">
      <h2>Grading System</h2>
      <form>
        <div>
          <label>Grade A (Days):</label>
          <input
            type="number"
            value={gradingRules.A}
            onChange={(e) =>
              setGradingRules({ ...gradingRules, A: e.target.value })
            }
          />
        </div>
        <div>
          <label>Grade B (Days):</label>
          <input
            type="number"
            value={gradingRules.B}
            onChange={(e) =>
              setGradingRules({ ...gradingRules, B: e.target.value })
            }
          />
        </div>
        <div>
          <label>Grade C (Days):</label>
          <input
            type="number"
            value={gradingRules.C}
            onChange={(e) =>
              setGradingRules({ ...gradingRules, C: e.target.value })
            }
          />
        </div>
        <div>
          <label>Grade D (Days):</label>
          <input
            type="number"
            value={gradingRules.D}
            onChange={(e) =>
              setGradingRules({ ...gradingRules, D: e.target.value })
            }
          />
        </div>
        <button type="button" onClick={handleSaveGradingRules}>
          Save Grading Rules
        </button>
      </form>
    </div>
  );
};

export default GradingSystem;
