# 🧠 AI DevHelper

AI DevHelper is a full-stack web application that uses GPT-4 to **explain, optimize, and comment code** across multiple programming languages.

This project was built to help developers quickly understand unfamiliar code and improve productivity using AI.

---

## 🚀 Features

- 🧠 GPT-powered code assistant  
- 💡 Supports Python, JavaScript, Java, and C++  
- 🛠️ Tools:
  - Explain Code  
  - Optimize Code *(in progress)*  
  - Add Comments *(in progress)*  
- 🎨 Modern React frontend with TailwindCSS  
- ⚙️ FastAPI backend with LangChain and OpenAI API  
- 🔄 Real-time interaction between frontend and backend  

---

## 🖥️ How It Works

1. Paste your code into the input box  
2. Select a tool (e.g., "Explain Code")  
3. Choose the programming language  
4. Click **Run AI Tool**  
5. View the AI-generated response instantly  

---

## 🧱 Tech Stack

### Frontend
- React
- TailwindCSS
- Framer Motion
- Axios
- Prism.js

### Backend
- FastAPI
- LangChain
- OpenAI API (GPT-4)
- Python

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/revaadi/DevHelper.git
cd DevHelper
```

---

### 2. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file inside `/backend` and add:

```bash
OPENAI_API_KEY=your_api_key_here
```

Run the backend:

```bash
uvicorn main:app --reload
```

Backend runs on:  
http://127.0.0.1:8000

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:  
http://localhost:3000

---


## Known Limitations

- Requires a valid OpenAI API key  
- AI responses may vary slightly  
- Some tools are still under development  

---

## Why I Built This

As a computer science student, I often needed a faster way to understand unfamiliar code.  
AI DevHelper was built to solve that problem while also helping me learn full-stack development using modern tools like FastAPI and LangChain.

