import uvicorn
from fastapi import FastAPI, HTTPException
from app.article import get_article_info
from app.article import fetch_info_from_openai



app = FastAPI()

@app.get("/api/articles/news")
def read_root():
    return {"data" : get_article_info()}

@app.get("/api/articles/info/{companyName}")
async def get_company_info(companyName: str):
    info = fetch_info_from_openai(companyName)
    if info is None:
        raise HTTPException(status_code=500, detail="Failed to retrieve information")
    return {"data": info}


if __name__ == '__main__':
    uvicorn.run(debug=False, host='127.0.0.1', port=8000)
