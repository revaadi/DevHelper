import { useState, useEffect } from 'react';
import axios from 'axios';
import Prism from 'prismjs';
import { motion } from 'framer-motion';

import 'prismjs/themes/prism-coy.css';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [selectedTool, setSelectedTool] = useState('explain');
  const [showLanding, setShowLanding] = useState(true);
  const [language, setLanguage] = useState('python');  // default


  useEffect(() => {
    Prism.highlightAll();
  }, [output, code]);

  const handleRunTool = async () => {
    try {
      const res = await axios.post(`http://127.0.0.1:8000/${selectedTool}`, {
        code,
        language
      });
      
      const key = selectedTool === 'explain' ? 'explanation'
                 : selectedTool === 'optimize' ? 'optimized_code'
                 : 'commented_code';
      setOutput(res.data[key]);
    } catch (err) {
      setOutput("❌ Error: Could not connect. Is your backend running?");
    }
  };

  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 flex flex-col items-center justify-center text-white text-center px-6 py-12">
        <div className="relative flex items-center justify-center mb-6">
  {/* Animated floating background brain */}
  <motion.div
    className="absolute text-[18rem] sm:text-[22rem] opacity-20 select-none pointer-events-none z-0"
    initial={{ y: 0, scale: 1 }}
    animate={{ y: [-10, 10, -10], scale: [1, 1.1, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    🧠
  </motion.div>

  {/* Foreground title */}
  <motion.h1
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, type: "spring" }}
    className="text-6xl sm:text-7xl font-extrabold relative z-10 drop-shadow-xl"
  >
    AI DevHelper
  </motion.h1>
</div>

  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl max-w-xl mb-8 shadow-lg"
        >
          <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
            Instantly <span className="font-bold text-indigo-300">explain</span>, <span className="font-bold text-indigo-300">optimize</span>, or <span className="font-bold text-indigo-300">comment</span> your code with GPT-powered assistance.
          </p>
        </motion.div>
  
        <motion.button
          onClick={() => setShowLanding(false)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white text-indigo-700 font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition"
        >
          🚀 Get Started
        </motion.button>
      </div>
    );
  }
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 p-6 text-gray-800 font-sans">
      <h1 className="text-white text-4xl font-bold text-center mb-10 drop-shadow-lg">
        🧠 AI DevHelper
      </h1>

      <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl mx-auto mb-6">
        <h2 className="text-indigo-600 font-semibold text-lg border-b pb-2 mb-4">Paste Your Code</h2>
        <textarea
          rows="10"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full font-mono text-sm border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col items-center gap-4 mb-6">
        <select
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="explain">💬 Explain Code</option>
          <option value="optimize">⚡ Optimize Code</option>
          <option value="comment">📝 Add Comments</option>
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="python">🐍 Python</option>
          <option value="javascript">🟨 JavaScript</option>
          <option value="java">☕ Java</option>
          <option value="c++">💻 C++</option>
        </select>


        <button
          onClick={handleRunTool}
          className="px-6 py-2 text-white font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 shadow-lg hover:scale-105"
        >
          Run AI Tool
        </button>
      </div>

      {code && (
        <motion.div
          className="bg-white rounded-xl shadow-xl p-6 max-w-3xl mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-indigo-600 font-bold text-lg border-b pb-2 mb-4 tracking-tight">Your Code Preview</h2>
          <pre className="bg-indigo-50 p-4 rounded-md overflow-x-auto border text-sm">
            <code className="language-python">{code}</code>
          </pre>
        </motion.div>
      )}

      {output && (
        <motion.div
          className="bg-white rounded-xl shadow-xl p-6 max-w-3xl mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-indigo-600 font-bold text-lg border-b pb-2 mb-4 tracking-tight">🎉 AI Output</h2>
          <div className="whitespace-pre-wrap leading-relaxed text-sm">{output}</div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
