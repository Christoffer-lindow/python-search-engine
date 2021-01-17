from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.PageDB import PageDb

origins = ["http://localhost:3000", "https://localhost:3000"]
BASE_URL = "./data/Words"

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=origins,
                   allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
db = PageDb(BASE_URL)


@app.get("/query/{query_string}")
def handle_query(query_string):
    result = db.query(query_string)
    return(result[:5])
