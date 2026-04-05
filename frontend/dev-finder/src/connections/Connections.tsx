import { useSelector } from 'react-redux'

import './connections.module.style.css'


const connections = [
  {
    id: 1,
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    firstName: "Priya",
    lastName: "Sharma",
    gender: "Female",
    age: 26,
    about: "Full-Stack Developer",
    skills: ["React", "Node.js"],
    isOnline: true,
    isNew: true,
  },
  {
    id: 2,
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    firstName: "Arjun",
    lastName: "Mehta",
    gender: "Male",
    age: 29,
    about: "Backend Engineer",
    skills: ["Rust", "TypeScript"],
    isOnline: false,
    isNew: false,
  },
  {
    id: 3,
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    firstName: "Sara",
    lastName: "Chen",
    gender: "Female",
    age: 24,
    about: "UI/UX Designer",
    skills: ["Figma", "Design systems"],
    isOnline: false,
    isNew: false,
  },

  
];

const Connections = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="px-5 py-10 max-w-xl flex flex-col" >
      <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">
        Connection Requests · {connections.length}
      </p>

      <div className="flex flex-col gap-10">
        {connections.map((user) => (
          <div
            key={user.id}
  className="relative flex items-center gap-4  border border-zinc-200 dark:border-zinc-800 bg-[#1c1c27] rounded-2xl px-4 py-3"
          >
            {user.isNew && (
              <span className="absolute top-3 right-4 text-[10px] font-medium bg-blue-50 text-blue-600 rounded-full px-2 py-0.5">
                New
              </span>
            )}

            {/* Avatar */}
            <img
              src={user.photoUrl}
              alt={user.firstName}
              className="w-13 h-13 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 flex-shrink-0"
              style={{ width: 52, height: 52 }}
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-0.5">
                {user.firstName} {user.lastName}{" "}
                <span className="text-[11px] text-zinc-400">✓</span>
              </p>
              <p className="text-xs text-zinc-500 mb-1.5">
                {user.isOnline && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1 mb-0.5" />
                )}
                {user.gender} · {user.age} Years · {user.about}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {user.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-pink-50 text-pink-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                title="Pass"
                className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-red-400 hover:text-red-500 text-sm flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              <button
                title="Super Like"
                className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-amber-400 text-sm flex items-center justify-center transition-colors"
              >
                ⭐
              </button>
              <button
                title="Like"
                className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-pink-400 hover:text-pink-500 text-sm flex items-center justify-center transition-colors"
              >
                ♥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};



export default Connections
