from mmeam import StructUnit2, StructUnit3, FourPlusSix, EightPlusTwelve, Dodecahedron, macromodel_opt, Cage, Population, FunctionData
from glob import glob
import json, os
import multiprocessing as mp
from functools import partial

# %%

unopt_cages = {}
opt_cages = {}
c = []
for tname, t in zip(['t1', 't2', 't3'], [FourPlusSix, EightPlusTwelve, Dodecahedron]):
    for lkpath in glob('mols/lks/*'):
        for bbpath in glob('mols/bbs/*'):
            lk = StructUnit2(lkpath, 'amine')
            lk_name = 'lk' + os.path.basename(lkpath).replace('.mol', '')
            bb = StructUnit3(bbpath, 'aldehyde')
            bb_name = 'bb' + os.path.basename(bbpath).replace('.mol', '')
            cage = Cage([lk, bb], t(), tname + lk_name + bb_name)
            unopt_cages[cage.name] = cage.mdl_mol_block()
            c.append(cage)


# %%

# unopt_cages
# json.dumps(unopt_cages)

# %%

# pop = Population(unopt_cages.values())
# pop.ga_tools.optimization = FunctionData('macromodel_opt', macromodel_path='/opt/schrodinger2016-4', settings={'md' : True})
# pop.optimize_population()
# for m in pop:
#     opt_cages[m.name] = m.mdl_mol_block()
# json.dumps(opt_cages)
