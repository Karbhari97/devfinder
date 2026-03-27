import { useRef, useState } from "react";

function SkillsInput({ skills, setSkills }:any) {
  const [val, setVal] = useState("");
  const inputRef = useRef(null);

  const add = (s:any) => {
    const trimmed = s.trim();
    if (trimmed && !skills.includes(trimmed)) setSkills([...skills, trimmed]);
    setVal("");
  };

  const handleKey = (e:any) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(val); }
    if (e.key === "Backspace" && !val && skills.length) setSkills(skills.slice(0, -1));
  };

  return (
    <>
      <div className="skills-container" onClick={() => inputRef?.current?.focus()}>
        {skills.map((s:any) => (
          <span key={s} className="skill-tag">
            {s}
            <button onClick={(e) => { e.stopPropagation(); setSkills(skills.filter(x => x !== s)); }}>×</button>
          </span>
        ))}
        <input
          ref={inputRef}
          className="skill-input"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={handleKey}
          placeholder={skills.length ? "" : "React, Node.js, Rust…"}
        />
      </div>
      <div className="skill-hint">Press Enter or comma to add a skill</div>
    </>
  );
}

export default SkillsInput;