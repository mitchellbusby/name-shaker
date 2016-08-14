"""
Shouts 2 github/matthewja for writing this
"""


import collections, csv, json

NAMES_PATH = 'yob2011.txt'
OUTPUT_PATH = 'output.json'

name_to_freq = collections.defaultdict(int)
total = 0
with open(NAMES_PATH) as names_file:
    for name, _, freq in csv.reader(names_file):
        freq = int(freq)
        name_to_freq[name] += freq  # += accomodates for unisex names.
        total += freq

common, uncommon, unusual, rare = [], [], [], []
upto = 0
for name in sorted(name_to_freq, key=name_to_freq.get, reverse=True):
    if upto < total // 4:
        common.append(name)
    elif upto < total * 2 // 4:
        uncommon.append(name)
    elif upto < total * 3 // 4:
        unusual.append(name)
    else:
        rare.append(name)
    upto += name_to_freq[name]

output_model = {
    'weird': rare,
    'odd': unusual,
    'common': uncommon,
    'vcommon': common
}

with open(OUTPUT_PATH, 'w+') as output_file:
    output_file.write(json.dumps(output_model))
