from mmeam import (Population, StructUnit2, StructUnit3,
                   Cage, TwoPlusThree, FourPlusSix, EightPlusTwelve,
                   Dodecahedron)
from glob import glob
import os
import json

# Load all unoptimized cages and rebuild them using correct names.

pop = Population()

for topi, top in enumerate([TwoPlusThree, FourPlusSix,
                            EightPlusTwelve, Dodecahedron], 1):
    for bb_file in glob('mols/light/bbs/*.mol'):
        bbl = StructUnit3(bb_file, 'aldehyde')
        lkl = StructUnit2('mols/light/lks/6.mol', 'amine')
        cl = Cage([bbl, lkl], top())
        pop.members.append(cl)

pop.dump('cyclohexane_cages.json')
