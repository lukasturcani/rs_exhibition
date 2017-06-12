from mmeam import (Population, StructUnit2, StructUnit3,
                   Cage, TwoPlusThree, FourPlusSix, EightPlusTwelve,
                   Dodecahedron)
from glob import glob
import os
import json

# Load all unoptimized cages and rebuild them using correct names.
unopt_cages = {}
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
            # Carbon atoms needs to be changed to Si.
            for a in c.mol.GetAtoms():
                if a.GetAtomicNum() == 6:
                    a.SetAtomicNum(14)
            unopt_cages[c.name] = c.mdl_mol_block()

with open('heavycages', 'w') as f:
    json.dump(unopt_cages, f)
