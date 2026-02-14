"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    role: "",
    location: "",
    work_mode: "",
    employment_type: "",
    experience_years: "",
    skills: ""
  });

  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const predictSalary = async () => {
    if (
      !form.role ||
      !form.location ||
      !form.work_mode ||
      !form.employment_type ||
      !form.experience_years ||
      !form.skills
    ) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const query = new URLSearchParams(form).toString();

    try {
      const res = await fetch(`https://deepak2200233-job-market-intelligence.onrender.com/predict?${query}`, {
        method: "POST"
      });

      const data = await res.json();
      setSalary(data.predicted_salary_lpa);
    } catch (err) {
      alert("API not running");
    }

    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
        Salary Predictor 💰
      </h1>

      <div style={{ marginTop: 20, maxWidth: 400 }}>
        <input
          name="role"
          placeholder="Role (Data Scientist)"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="location"
          placeholder="Location (Bengaluru)"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="work_mode"
          placeholder="Work Mode (Remote/Onsite)"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="employment_type"
          placeholder="Employment Type (Full-time)"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="experience_years"
          placeholder="Experience (3)"
          type="number"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="skills"
          placeholder="Skills (Python|SQL|ML)"
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={predictSalary} style={buttonStyle}>
          {loading ? "Predicting..." : "Predict Salary"}
        </button>

        {salary && (
          <h2 style={{ marginTop: 20, color: "green" }}>
            Predicted Salary: ₹ {salary} LPA
          </h2>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 10,
  borderRadius: 6,
  border: "1px solid #ccc"
};

const buttonStyle = {
  marginTop: 15,
  padding: 12,
  width: "100%",
  background: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: 6,
  fontWeight: "bold",
  cursor: "pointer"
};
