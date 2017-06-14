from mmeam import (Population, StructUnit2, StructUnit3,
                   Cage, TwoPlusThree, FourPlusSix, EightPlusTwelve,
                   Dodecahedron)
from glob import glob
import os
import json

# Load all unoptimized cages and rebuild them using correct names.

opt_pop = Population.load('cyclohexane_cages_opt.json')
opt_pop.add_members(Population.load('opt_cages_final.json'))

with open('optcages', 'r') as f:
    opt_cages = json.load(f)

counter = 0
for topi, top in enumerate([TwoPlusThree, FourPlusSix,
                            EightPlusTwelve, Dodecahedron], 1):
    for bb_file in glob('mols/light/bbs/*.mol'):
        for lk_file in glob('mols/light/lks/6.mol'):

            # build the light cage.
            bb = StructUnit3(bb_file, 'aldehyde')
            lk = StructUnit2(lk_file, 'amine')
            c = Cage([bb, lk], top())
            c.set_position([0, 0, 0])
            name = (str(topi) +
                    os.path.basename(bb_file).replace('.mol', '') +
                    os.path.basename(lk_file).replace('.mol', ''))
            try:
                wd = c.window_difference() / c.topology.n_windows
            except Exception as ex:
                wd = None
            if wd is None:
                counter += 1
                print(counter, name)
                collapsed = 1
            elif wd > 0.5:
                collapsed = 1
            else:
                collapsed = 0
            opt_cages[name] = [c.mdl_mol_block(), c.cavity_size(),
                               collapsed]


with open('optcages', 'w') as f:
    json.dump(opt_cages, f)
