import { useState } from "react";

export default function Login({ onLogin }) {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentId.trim() || !password.trim()) {
      alert("Please enter both your Student ID and password.");
      return;4
    }
    if(studentId.trim()=="stud" && password.trim() == "1234"){
      onLogin();
      return;
    }else{
      alert("StudentID or Password is Incorrect");
      return;
    }
    
  };

  return (
    <div className="min-h-screen bg-[#0f1e38] flex items-center justify-center text-white">
      <div className="flex w-full max-w-[900px] min-h-[520px] border border-[#2a3a58] rounded overflow-hidden flex-col sm:flex-row">
        <div className="bg-[#e8a020] w-full sm:w-[40%] p-10 flex flex-col justify-between">
          <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl text-[#0f1e38] leading-tight">
            EventHub
            <span className="block text-sm font-semibold tracking-widest uppercase text-[#162444] mt-1.5">
              Christ University
            </span>
          </div>
          <div className="text-sm text-[#162444] leading-relaxed">
            A centralized platform for managing university fests, events, and student registrations.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#162444] w-full sm:w-[60%] p-10 flex flex-col justify-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-semibold mb-2">
            Sign In
          </h2>

          <label className="block text-xs font-semibold uppercase tracking-wide text-[#8a95a8] mt-2 mb-2">
            Student ID
          </label>
          <input
            type="text"
            placeholder="e.g. 2300123"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full bg-[#0f1e38] border border-[#2a3a58] text-white text-sm px-3.5 py-2.5 rounded outline-none focus:border-[#e8a020]"
          />

          <label className="block text-xs font-semibold uppercase tracking-wide text-[#8a95a8] mt-2 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0f1e38] border border-[#2a3a58] text-white text-sm px-3.5 py-2.5 rounded outline-none focus:border-[#e8a020]"
          />

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-[#e8a020] hover:bg-[#f5b942] text-[#0f1e38] font-semibold rounded"
          >
            Login
          </button>

          <p className="mt-5 text-sm text-[#8a95a8] text-center">
            <a href="#" className="text-[#e8a020] no-underline">Forgot password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}