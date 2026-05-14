#!/usr/bin/env python3
"""Emit src/lib/nebius-contributors.ts from a JSONL of raw contributor rows."""
import sys, json, subprocess, concurrent.futures
from collections import defaultdict

raw_path = sys.argv[1]
acc = defaultdict(lambda: {"login": "", "total": 0, "repos": []})
with open(raw_path) as f:
    for line in f:
        r = json.loads(line)
        a = acc[r['login']]
        a['login'] = r['login']
        a['total'] += r['contributions']
        a['repos'].append((r['repo'], r['contributions']))

for a in acc.values():
    a['repos'].sort(key=lambda x: -x[1])
contribs = sorted(acc.values(), key=lambda x: -x['total'])

def fetch_user(login):
    try:
        out = subprocess.check_output(
            ['gh', 'api', '-H', 'Accept: application/vnd.github+json', f'/users/{login}'],
            stderr=subprocess.DEVNULL)
        u = json.loads(out)
        return login, {
            'name': u.get('name') or login,
            'location': u.get('location') or '',
            'bio': (u.get('bio') or '').strip().replace('\r\n',' ').replace('\n',' '),
            'company': u.get('company') or '',
            'twitter': u.get('twitter_username') or '',
        }
    except Exception:
        return login, {'name': login, 'location': '', 'bio': '', 'company': '', 'twitter': ''}

print(f'  enriching {len(contribs)} profiles...', file=sys.stderr)
profiles = {}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    futs = [ex.submit(fetch_user, c['login']) for c in contribs]
    for f in concurrent.futures.as_completed(futs):
        login, prof = f.result()
        profiles[login] = prof
for c in contribs:
    c.update(profiles.get(c['login'], {}))

def esc(s): return json.dumps(s or '', ensure_ascii=False)

print('// Auto-scraped from github.com/nebius public repos (org-original only,')
print('// forks like cilium/temporal excluded). Re-run via scripts/scrape-nebius-contributors.sh.')
print('')
print('export type NebiusContributor = {')
print('  login: string;')
print('  name: string;')
print('  commits: number;')
print('  repos: { repo: string; commits: number }[];')
print('  location?: string;')
print('  bio?: string;')
print('  company?: string;')
print('  twitter?: string;')
print('};')
print('')
print('export const nebiusContributors: NebiusContributor[] = [')
for c in contribs:
    parts = [f'login: {esc(c["login"])}', f'name: {esc(c["name"])}', f'commits: {c["total"]}']
    repos_str = ', '.join(f'{{ repo: {esc(r)}, commits: {n} }}' for r,n in c['repos'])
    parts.append(f'repos: [{repos_str}]')
    if c.get('location'): parts.append(f'location: {esc(c["location"])}')
    if c.get('bio'): parts.append(f'bio: {esc(c["bio"])}')
    if c.get('company'): parts.append(f'company: {esc(c["company"])}')
    if c.get('twitter'): parts.append(f'twitter: {esc(c["twitter"])}')
    print('  { ' + ', '.join(parts) + ' },')
print('];')
