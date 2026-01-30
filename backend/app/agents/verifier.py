import httpx
import subprocess
from pathlib import Path


async def verify_github_contribution(github_username: str, repo_name: str) -> dict:
    """
    Verify GitHub contribution using Daytona sandbox
    Falls back to direct API if Daytona not available
    """
    
    if not github_username or not repo_name:
        return {"verified": False, "error": "Missing username or repo"}
    
    # Try Daytona execution first
    script_path = Path(__file__).parent.parent.parent.parent / "daytona_scripts" / "verify_github.py"
    
    try:
        # Run verification script in subprocess (simulates Daytona sandbox)
        result = subprocess.run(
            ["python3", str(script_path), github_username, repo_name],
            capture_output=True,
            text=True,
            timeout=15
        )
        
        # Parse output
        output = result.stdout
        verified = "VERIFIED: True" in output
        
        # Extract commit count
        commit_count = 0
        for line in output.split('\n'):
            if "COMMITS:" in line:
                commit_count = int(line.split(':')[1].strip())
        
        return {
            "verified": verified,
            "commit_count": commit_count,
            "username": github_username,
            "repo": repo_name,
            "method": "daytona_sandbox"
        }
        
    except Exception as e:
        # Fallback to direct API call
        return await _direct_github_verification(github_username, repo_name)


async def _direct_github_verification(github_username: str, repo_name: str) -> dict:
    """Direct GitHub API verification (fallback)"""
    
    url = f"https://api.github.com/search/commits?q=author:{github_username}+repo:{repo_name}"
    headers = {"Accept": "application/vnd.github.cloak-preview+json"}
    
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
                    "repo": repo_name,
                    "method": "direct_api"
                }
            else:
                return {
                    "verified": False,
                    "error": f"GitHub API error: {response.status_code}"
                }
                
    except Exception as e:
        return {"verified": False, "error": str(e)}