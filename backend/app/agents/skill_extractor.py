from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def extract_skills_from_cv(cv_text: str) -> list[str]:
    """Extract skills from CV text using OpenAI"""
    
    prompt = f"""Extract ONLY the technical skills from this CV. 
Return as a simple comma-separated list.

CV:
{cv_text}

Skills (comma-separated):"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
            temperature=0
        )
        
        skills_text = response.choices[0].message.content.strip()
        skills = [s.strip() for s in skills_text.split(',')]
        
        return skills
        
    except Exception as e:
        print(f"OpenAI error: {e}")
        return []