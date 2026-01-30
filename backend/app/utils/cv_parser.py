from bs4 import BeautifulSoup
from pathlib import Path
from app.agents.skill_extractor import extract_skills_from_cv


def parse_cv_html(profile_id: str) -> dict:
    """Parse CV HTML file and extract structured data"""
    
    cv_path = Path(__file__).parent.parent.parent.parent / "mockdata" / f"{profile_id}.html"
    
    if not cv_path.exists():
        return {"error": "CV file not found"}
    
    with open(cv_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # Extract basic info
    name = soup.find('h1').text if soup.find('h1') else "Unknown"
    role = soup.find('p').text if soup.find('p') else "Unknown"
    
    # Extract GitHub
    github = ""
    github_section = soup.find('h2', string='GitHub')
    if github_section:
        github_p = github_section.find_next('p')
        if github_p:
            github = github_p.text.strip()
    
    # Extract skills using AI
    full_text = soup.get_text()
    ai_skills = extract_skills_from_cv(full_text)
    
    return {
        "id": profile_id,
        "name": name,
        "role": role,
        "skills": ai_skills,  # Now using AI extraction
        "github": github
    }