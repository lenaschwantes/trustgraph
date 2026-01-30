#!/usr/bin/env python3
import sys
import requests

def verify_contribution(username, repo):
    """Verify GitHub contributions - runs in Daytona sandbox"""
    
    url = f"https://api.github.com/search/commits?q=author:{username}+repo:{repo}"
    headers = {"Accept": "application/vnd.github.cloak-preview+json"}
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            commit_count = data.get('total_count', 0)
            
            print(f"VERIFIED: {commit_count > 0}")
            print(f"COMMITS: {commit_count}")
            return 0 if commit_count > 0 else 1
        else:
            print(f"ERROR: GitHub API returned {response.status_code}")
            return 1
            
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return 1

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: verify_github.py <username> <repo>")
        sys.exit(1)
    
    username = sys.argv[1]
    repo = sys.argv[2]
    sys.exit(verify_contribution(username, repo))