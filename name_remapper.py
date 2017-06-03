import re

p = re.compile(r'(?<="t\dlk)100')
rep = '9'
filename = '/home/lukas/downloads/cagesfile_heavy'
outfile = filename

with open(filename, 'r') as f:
    s = f.read()

new_string = p.sub(rep, s)

with open(outfile, 'w') as f:
    f.write(new_string)
