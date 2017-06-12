from mmeam import (Population, StructUnit2, StructUnit3,
                   Cage, TwoPlusThree, FourPlusSix, EightPlusTwelve,
                   Dodecahedron)
from glob import glob
import os
import json

# Load all unoptimized cages and rebuild them using correct names.
opt_cages = {}
opt_pop = Population.load('opt_cages.json')
not_in_pop = []
for topi, top in enumerate([TwoPlusThree, FourPlusSix,
                            EightPlusTwelve, Dodecahedron], 1):
    for bb_file in glob('mols/heavy/bbs/*.mol'):
        for lk_file in glob('mols/heavy/lks/*.mol'):
            bb = StructUnit3(bb_file, 'aldehyde')
            lk = StructUnit2(lk_file, 'amine')
            c = Cage([bb, lk], top())

            bbname = os.path.basename(bb_file).replace('.mol', '')
            lkname = os.path.basename(lk_file).replace('.mol', '')
            c.name = str(topi) + bbname + lkname
            # print(c.name)
            if c not in opt_pop:
                print(c.name)
                not_in_pop.append(c)
            opt_cages[c.name] = c.mdl_mol_block()

# with open('optcages', 'w') as f:
#     json.dump(opt_cages, f)
