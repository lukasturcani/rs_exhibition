from mmeam import (Population, StructUnit2, StructUnit3,
                   Cage, TwoPlusThree, FourPlusSix, EightPlusTwelve,
                   Dodecahedron)
from glob import glob
import os
import json

# Load all unoptimized cages and rebuild them using correct names.

opt_pop = Population.load('opt_cages.json')
new_opt_pop = Population()
to_be_opt = Population()
opt_cage_dict = {}
for topi, top in enumerate([TwoPlusThree, FourPlusSix,
                            EightPlusTwelve, Dodecahedron], 1):
    for bb_file in glob('mols/heavy/bbs/*.mol'):
        for lk_file in glob('mols/heavy/lks/*.mol'):
            # build the heavy cage.
            bbh = StructUnit3(bb_file, 'aldehyde')
            lkh = StructUnit2(lk_file, 'amine')
            ch = Cage([bbh, lkh], top())

            # build the light cage.
            bbl = StructUnit3(bb_file.replace('heavy', 'light'), 'aldehyde')
            lkl = StructUnit2(lk_file.replace('heavy', 'light'), 'amine')
            cl = Cage([bbl, lkl], top())

            # if heavy_cage was previously optimzed update the light
            # structure.
            if ch in opt_pop:
                cl.mol = ch.mol
            else:
                to_be_opt.members.append(cl)

            new_opt_pop.members.append(cl)

            name = (str(topi) +
                    os.path.basename(bb_file).replace('.mol', '') +
                    os.path.basename(lk_file).replace('.mol', ''))
            opt_cage_dict[name] = cl.mdl_mol_block()


to_be_opt.dump('needs_opt.json')
new_opt_pop.dump('opt_cages_lukas.json')

with open('optcages', 'w') as f:
    json.dump(opt_cage_dict, f)
