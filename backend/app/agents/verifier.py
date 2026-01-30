import httpx


async def verify_github_contribution(github_username: str, repo_name: str) -> dict:
    """
    Verify if user has contributions to a GitHub repo
    Uses public GitHub Search API (no auth needed)
    """
    
    if not github_username or not repo_name:
        return {
            "verified": False,
            "error": "Missing username or repo"
        }
    
    # GitHub Search API - public commits
    url = f"https://api.github.com/search/commits?q=author:{github_username}+repo:{repo_name}"
    
    headers = {
        "Accept": "application/vnd.github.cloak-preview+json"
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, timeout=10.0)
            
            if response.status_code == 200:
                data = response.json()
                commit_count = data.get('total_count', 0)
                
                return {
                    "verified": commit_count > 0,
                    "commit_count": commit_count,
                    "username": github_username,
                    "repo": repo_name
                }
            else:
                return {
                    "verified": False,
                    "error": f"GitHub API error: {response.status_code}"
                }
                
    except Exception as e:
        return {
            "verified": False,
            "error": str(e)
        }