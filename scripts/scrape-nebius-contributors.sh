#!/bin/bash
# Re-scrape github.com/nebius contributors and regenerate src/lib/nebius-contributors.ts.
#
# Requirements:
#   - gh CLI authenticated (`gh auth status`)
#   - python3
#
# Filters: forks are excluded (cilium, temporal, etc. carry thousands of
# upstream contributors who aren't actually Nebius builders).
set -e

WORK=$(mktemp -d)
trap "rm -rf $WORK" EXIT

echo "Fetching public Nebius repos..."
gh api -H "Accept: application/vnd.github+json" "/orgs/nebius/repos?per_page=100&type=public" --paginate \
  | python3 -c "
import sys, json
for r in json.load(sys.stdin):
    if not r.get('fork'):
        print(r['name'])
" > "$WORK/repos.txt"

echo "Found $(wc -l < $WORK/repos.txt) non-fork repos"

echo "Fetching contributors per repo..."
> "$WORK/raw.jsonl"
while read repo; do
  gh api -H "Accept: application/vnd.github+json" "/repos/nebius/${repo}/contributors?per_page=100&anon=false" --paginate 2>/dev/null \
    | python3 -c "
import sys, json
try:
  for c in json.load(sys.stdin):
    if c.get('type') != 'User' or c.get('login','').endswith('[bot]'): continue
    print(json.dumps({'repo':'$repo','login':c['login'],'contributions':c['contributions']}))
except: pass
" >> "$WORK/raw.jsonl"
done < "$WORK/repos.txt"
echo "Got $(wc -l < $WORK/raw.jsonl) contributor rows"

echo "Enriching profiles + writing src/lib/nebius-contributors.ts..."
python3 scripts/_emit_contributors.py "$WORK/raw.jsonl" > src/lib/nebius-contributors.ts
echo "Done."
