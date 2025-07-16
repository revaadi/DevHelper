from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from langchain_community.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# 1) Load environment variables
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise RuntimeError("Missing OPENAI_API_KEY in .env")
# 2) Init FastAPI app
app = FastAPI()

# 3) CORS (to allow frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4) Pydantic model for incoming JSON
class CodeRequest(BaseModel):
    code: str
    language: str

# 5) LangChain LLM configuration
llm = ChatOpenAI(
    model_name="gpt-4",
    temperature=0.2,
    openai_api_key=openai_api_key
)

# 6) Prompt Templates
explain_prompt = PromptTemplate(
    input_variables=["code","language"],
    template="""
You are an expert {language} developer. Explain what the following {language} code does clearly:
```{language}
{code}
"""
)

optimize_prompt = PromptTemplate(
input_variables=["code","language"],
template="""
You are a {language} optimization expert. Rewrite the following {language} code to be more efficient and readable:

Original code:
{language}
{code}
Optimized version:
"""
)
comment_prompt = PromptTemplate(
input_variables=["code","language"],
template="""
You are a helpful coding assistant. Add meaningful comments to the following Python code to explain what each part does.
{code}
Commented version:
"""
)
explain_chain = LLMChain(llm=llm, prompt=explain_prompt)
optimize_chain = LLMChain(llm=llm, prompt=optimize_prompt)
comment_chain = LLMChain(llm=llm, prompt=comment_prompt)
@app.post("/explain")
async def explain_code(data: CodeRequest):
    try:
        result = explain_chain.run(code=data.code, language=data.language)
        return JSONResponse(content={"explanation": result})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

@app.post("/optimize")
async def optimize_code(data: CodeRequest):
    try:
        result = optimize_chain.run(code=data.code, language=data.language)
        return JSONResponse(content={"optimized_code": result})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

@app.post("/comment")
async def comment_code(data: CodeRequest):
    try:
        result = comment_chain.run(code=data.code, language=data.language)
        return JSONResponse(content={"commented_code": result})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})

