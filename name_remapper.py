import re

mapping1 = {'35': '1', '36': '2', '38': '3',
            '40': '4', '42': '5', '47': '6',
            '51': '7', '56': '8', '90': '9'}

mapping2 = [('100', '9'), ('0', '1'), ('1', '2'), ('7', '3'),
            ('82', '4'), ('83', '5'), ('87', '6'),
            ('89', '7'), ('93', '8')]

for key, value in mapping1.items():
    p = re.compile(r'(?<="t\dlk\d\d\dbb){}'.format(key))
    rep = value
    filename = '/home/lukas/projects/cage_assembler/cagesfile'
    outfile = filename

    with open(filename, 'r') as f:
        s = f.read()

    new_string = p.sub(rep, s)

    with open(outfile, 'w') as f:
        f.write(new_string)


for key, value in mapping1.items():
    p = re.compile(r'(?<="t\dlk\d\dbb){}'.format(key))
    rep = value
    filename = '/home/lukas/projects/cage_assembler/cagesfile'
    outfile = filename

    with open(filename, 'r') as f:
        s = f.read()

    new_string = p.sub(rep, s)

    with open(outfile, 'w') as f:
        f.write(new_string)

for key, value in mapping1.items():
    p = re.compile(r'(?<="t\dlk\dbb){}'.format(key))
    rep = value
    filename = '/home/lukas/projects/cage_assembler/cagesfile'
    outfile = filename

    with open(filename, 'r') as f:
        s = f.read()

    new_string = p.sub(rep, s)

    with open(outfile, 'w') as f:
        f.write(new_string)


for key, value in mapping2:
    p = re.compile(r'(?<="t\dlk){}'.format(key))
    rep = value
    filename = '/home/lukas/projects/cage_assembler/cagesfile'
    outfile = filename

    with open(filename, 'r') as f:
        s = f.read()

    new_string = p.sub(rep, s)

    with open(outfile, 'w') as f:
        f.write(new_string)
