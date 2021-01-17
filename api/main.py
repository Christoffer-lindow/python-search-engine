from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.PageDB import PageDb
from timeit import default_timer as timer

origins = ["http://localhost:3000", "https://localhost:3000"]
BASE_URL = "./data/Words"

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=origins,
                   allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
db = PageDb(BASE_URL)


@app.get("/query/{query_string}")
def handle_query(query_string):
    start = timer()
    result = db.query(query_string)
    end = timer()
    secs = end-start
    return(({"results" :result[:5]},{"count": len(result)},{"time": secs}))
