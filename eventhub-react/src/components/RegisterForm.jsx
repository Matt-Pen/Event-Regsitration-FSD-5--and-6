import { useState, useEffect } from "react";
import axios from "axios";

const initialForm = {
  designation: "",
  dob: "",
  first: "",
  last: "",
  roll: "",
  dept: "",
  phone: "",
  email: "",
  eventname: "",
  slot: "",
  role: "",
};

export default function RegisterForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
  axios
    .get("https://matt-pen.github.io/EventReg-API/Registrations.json")
    .then((res) => {
      const seeded = res.data.map((record) => ({ ...record, seeded: true }));
      setRegistrations(seeded);
    })
    .catch((err) => console.error("Failed to load registrations:", err));
}, []);

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "phone") value = value.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, [field]: value }));
    // clear error on input, same as clearOnInput() did
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validate = () => {
    const next = {};
    const req = (field, condition = (v) => !!v) => {
      const val = form[field].trim();
      if (!condition(val)) next[field] = true;
    };

    req("designation");
    req("dob");
    req("first");
    req("last");
    req("roll");
    req("dept");
    req("phone", (v) => /^\d{10}$/.test(v));
    req("email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    req("eventname");
    req("slot");
    req("role");

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const record = {
      ...form,
      _id: crypto.randomUUID(),
      registeredAt: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    setRegistrations((prev) => [record, ...prev]);
    setForm(initialForm);
    setErrors({});
  };

  const deleteRecord = (id) => {
    setRegistrations((prev) => prev.filter((r) => r._id !== id));
  };

  const editRecord = (id) => {
    const record = registrations.find((r) => r._id === id);
    if (!record) return;
    const { _id, registeredAt, ...fields } = record;
    setForm(fields);
    deleteRecord(id);
  };

  // ── field config, mirrors the `fields` array in register_view.js ──
  const inputClass = (field) =>
    `w-full bg-[#1e2f52] border rounded px-3 py-2.5 text-white text-sm outline-none transition-colors
     placeholder:text-[#8a95a8]/70
     ${errors[field] ? "border-[#e05c5c]" : "border-[#2a3a58] focus:border-[#e8a020]"}`;

  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-[#8a95a8] mb-1";
  const errClass = (field) =>
    `text-xs text-[#e05c5c] mt-0.5 ${errors[field] ? "block" : "hidden"}`;

  return (
    <div className="min-h-screen bg-[#0f1e38] text-white">
      <nav className="bg-[#e8a020] h-[60px] px-10 flex items-center justify-between">
        <div className="font-serif text-2xl text-[#162444]" style={{ fontFamily: "'Playfair Display', serif" }}>
          EventHub
        </div>
        <div className="flex items-center gap-5 text-sm">
          <a href="#" className="font-semibold text-[#162444] hover:text-[#0f1e38]">Logout</a>
          <div className="w-[34px] h-[34px] rounded-full bg-[#162444] text-[#e8a020] font-semibold text-sm flex items-center justify-center">
            ME
          </div>
        </div>
      </nav>

      <main className="px-5 py-7 pb-16">
        <div className="max-w-[960px] mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-[#162444] border border-[#2a3a58] rounded-md p-7"
          >
            <h3
              className="text-xl mb-5 border-b border-[#2a3a58] pb-3.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Event Registration
            </h3>

            <div className="text-xs font-semibold uppercase tracking-wide text-[#e8a020] mt-5 mb-3">
              Personal Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="mb-3.5">
                <label className={labelClass}>Designation</label>
                <select
                  className={inputClass("designation")}
                  value={form.designation}
                  onChange={handleChange("designation")}
                >
                  <option value="">Select designation</option>
                  <option>Mr</option>
                  <option>Miss</option>
                  <option>Mrs</option>
                  <option>Dr</option>
                </select>
                <span className={errClass("designation")}>Please select a designation.</span>
              </div>

              <div className="mb-3.5">
                <label className={labelClass}>Date of Birth</label>
                <input
                  type="date"
                  className={inputClass("dob")}
                  value={form.dob}
                  onChange={handleChange("dob")}
                />
                <span className={errClass("dob")}>Date of birth is required.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="mb-3.5">
                <label className={labelClass}>First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className={inputClass("first")}
                  value={form.first}
                  onChange={handleChange("first")}
                />
                <span className={errClass("first")}>First name is required.</span>
              </div>
              <div className="mb-3.5">
                <label className={labelClass}>Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className={inputClass("last")}
                  value={form.last}
                  onChange={handleChange("last")}
                />
                <span className={errClass("last")}>Last name is required.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="mb-3.5">
                <label className={labelClass}>Roll No.</label>
                <input
                  type="text"
                  placeholder="e.g. 22CS045"
                  className={inputClass("roll")}
                  value={form.roll}
                  onChange={handleChange("roll")}
                />
                <span className={errClass("roll")}>Roll number is required.</span>
              </div>
              <div className="mb-3.5">
                <label className={labelClass}>Department</label>
                <select
                  className={inputClass("dept")}
                  value={form.dept}
                  onChange={handleChange("dept")}
                >
                  <option value="">Select department</option>
                  <option>Computer Science</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                  <option>Electrical</option>
                  <option>Other</option>
                </select>
                <span className={errClass("dept")}>Please select a department.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="mb-3.5">
                <label className={labelClass}>Phone No.</label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="+91 XXXXX XXXXX"
                  className={inputClass("phone")}
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
                <span className={errClass("phone")}>Enter a valid 10-digit phone number.</span>
              </div>
              <div className="mb-3.5">
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  placeholder="john@college.edu"
                  className={inputClass("email")}
                  value={form.email}
                  onChange={handleChange("email")}
                />
                <span className={errClass("email")}>Enter a valid email address.</span>
              </div>
            </div>

            <div className="text-xs font-semibold uppercase tracking-wide text-[#e8a020] mt-5 mb-3">
              Event Preferences
            </div>

            <div className="mb-3.5">
              <label className={labelClass}>Event Name</label>
              <input
                type="text"
                placeholder="CodeBreaker"
                className={inputClass("eventname")}
                value={form.eventname}
                onChange={handleChange("eventname")}
              />
              <span className={errClass("eventname")}>Event name is required.</span>
            </div>

            <div className="mb-3.5">
              <label className={labelClass}>Preferred Time Slot</label>
              <select
                className={inputClass("slot")}
                value={form.slot}
                onChange={handleChange("slot")}
              >
                <option value="">Select a slot</option>
                <option>Morning Session — 10:00 AM to 12:00 PM</option>
                <option>Afternoon Session — 1:00 PM to 3:00 PM</option>
                <option>Full Day — 10:00 AM to 4:00 PM</option>
              </select>
              <span className={errClass("slot")}>Please select a time slot.</span>
            </div>

            <div className="mb-3.5">
              <label className={labelClass}>Participation Role</label>
              <select
                className={inputClass("role")}
                value={form.role}
                onChange={handleChange("role")}
              >
                <option value="">Select role</option>
                <option>Participant</option>
                <option>Viewer</option>
                <option>Volunteer</option>
              </select>
              <span className={errClass("role")}>Please select a participation role.</span>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded bg-[#e8a020] hover:bg-[#f5b942] text-[#0f1e38] font-bold transition-colors"
            >
              Register for Event
            </button>
          </form>

          {/* ── Registration cards ── */}
          {registrations.length > 0 && (
            <div className="max-w-[960px] mx-auto mt-8 flex flex-col gap-3">
              {registrations.map((record) => (
                <div
                  key={record._id}
                  className="bg-[#162444] border border-[#e8a020] rounded-md p-7"
                >
                  <div className="flex items-center gap-3.5 border-b border-[#2a3a58] pb-4 mb-5">
                    <div>
                      <h3
                        className="text-lg"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Registration Successful!
                      </h3>
                      <p className="text-xs text-[#8a95a8] mt-0.5">
                        Registered on {record.registeredAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-5">
                    <div>
                      <div
                        className="text-lg"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {record.designation} {record.first} {record.last}
                      </div>
                      <span className="inline-block mt-1 bg-[#e8a020] text-[#0f1e38] text-base font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                        {record.eventname}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                    {[
                      ["Roll No.", record.roll],
                      ["Department", record.dept],
                      ["Date of Birth", record.dob],
                      ["Phone", record.phone],
                      ["Email", record.email],
                      ["Time Slot", record.slot],
                      ["Chosen Role", record.role],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase tracking-wide text-[#8a95a8]">
                          {label}
                        </span>
                        <span className="text-sm font-semibold break-words">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2.5 mt-4">
                    <button
                      onClick={() => deleteRecord(record._id)}
                      className="flex-1 py-2.5 rounded bg-[#e8a020] hover:bg-[#f5b942] text-[#0f1e38] font-bold text-sm"
                    >
                      Delete registration
                    </button>
                    <button
                      onClick={() => editRecord(record._id)}
                      className="flex-1 py-2.5 rounded bg-[#e8a020] hover:bg-[#f5b942] text-[#0f1e38] font-bold text-sm"
                    >
                      Edit registration
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}