#!/usr/bin/env python3
"""
Bulk create GitHub issues from YAML structure.
Requires: Python 3.7+, PyYAML, PyGithub, GITHUB_TOKEN env var
Install: pip install PyYAML PyGithub
"""

import yaml
import sys
import os
from pathlib import Path

try:
    from github import Github, GithubException
except ImportError:
    print("Error: PyGithub not installed. Run: pip install PyGithub")
    sys.exit(1)

def load_issues(yaml_path):
    """Load issues from YAML file."""
    with open(yaml_path, 'r') as f:
        data = yaml.safe_load(f)
    return data.get('issues', [])

def create_issue(repo, issue, issue_map):
    """Create a single GitHub issue using PyGithub."""
    issue_id = issue.get('id')
    title = issue.get('title')
    category = issue.get('category')
    priority = issue.get('priority')
    description = issue.get('description')
    acceptance = issue.get('acceptance_criteria', [])
    depends_on = issue.get('depends_on', [])
    
    # Build issue body with full details
    body = f"""**Category:** {category}
**Priority:** {priority}

## Description
{description}

## Acceptance Criteria
"""
    for criterion in acceptance:
        body += f"- [ ] {criterion}\n"
    
    # Add dependency info
    if depends_on:
        body += f"\n## Dependencies\nDepends on: #{', #'.join(map(str, depends_on))}\n"
    
    # Build labels
    labels = [category, priority]
    
    print(f"[{issue_id:2d}] Creating: {title}")
    
    try:
        gh_issue = repo.create_issue(
            title=title,
            body=body,
            labels=labels
        )
        issue_map[issue_id] = gh_issue.number
        print(f"     ✓ Created as #{gh_issue.number}")
        return True
    except GithubException as e:
        print(f"     ✗ GitHub Error: {e.data.get('message', str(e))}")
        return False
    except Exception as e:
        print(f"     ✗ Exception: {e}")
        return False

def main():
    # Get GitHub token
    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        print("Error: GITHUB_TOKEN environment variable not set")
        print("Set it: $env:GITHUB_TOKEN='your_token' (PowerShell)")
        sys.exit(1)
    
    yaml_path = Path(__file__).parent / 'issues.yml'
    
    if not yaml_path.exists():
        print(f"Error: {yaml_path} not found")
        sys.exit(1)
    
    # Load issues
    issues = load_issues(yaml_path)
    print(f"Loaded {len(issues)} issues from {yaml_path}\n")
    
    # Connect to GitHub
    try:
        g = Github(token)
        repo = g.get_user('Openverse-iiitk').get_repo('ride')
        print(f"Connected to: {repo.full_name}\n")
    except GithubException as e:
        print(f"Error connecting to GitHub: {e}")
        print("Make sure GITHUB_TOKEN is valid and has repo permissions")
        sys.exit(1)
    
    print("Creating issues in dependency order...\n")
    
    issue_map = {}
    success_count = 0
    
    # Sort by dependency chain to create in order
    def get_max_dependency(issue):
        deps = issue.get('depends_on', [])
        return max(deps) if deps else 0
    
    sorted_issues = sorted(issues, key=get_max_dependency)
    
    for issue in sorted_issues:
        if create_issue(repo, issue, issue_map):
            success_count += 1
    
    print(f"\n{'='*60}")
    print(f"Results: {success_count}/{len(issues)} issues created")
    print(f"{'='*60}")
    
    if success_count == len(issues):
        print("✓ All issues created successfully!")
        return 0
    else:
        print(f"⚠ {len(issues) - success_count} issues failed")
        return 1

if __name__ == '__main__':
    sys.exit(main())
