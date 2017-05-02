from mmeam import StructUnit2, StructUnit3, FourPlusSix, EightPlusTwelve, Dodecahedron, macromodel_opt
from glob import glob
import json, os

# %%

unopt_cages = {}
opt_cages = {}
for tname, t in zip(['t1', 't2', 't3'], [FourPlusSix, EightPlusTwelve, Dodecahedron]):
    for lkpath in glob('mols/lks/*'):
        for bbpath in glob('mols/bbs/*'):
            lk = StructUnit2(lkpath)
            lk_name = 'lk' + os.path.basename(lkpath).replace('.mol', '')
            bb = StructUnit3(bbpath)
            bb_name = 'bb' + os.path.basename(bbpath).replace('.mol', '')
            cage = Cage([lk, bb], t())
            cage_name = tname + lk_name + bb_name
            unopt_cages[cage_name] = cage.mdl_mol_block()
            macromodel_opt(cage, '/opt/schrodinger2016-4', {'md' : True})
            opt_cages[cage_name] = cage.mdl_mol_block()
            
json.dumps(unopt_cages)
json.dumps(opt_cages)
