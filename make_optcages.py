"""
Creates the "optcages" file.

The "optcages" file is holds a JavaScript object where each attribute
name is the ID of a cage and the value is a tuple. The first value of
the tuple is a string holding the molecular structure in .mol V3000
format, the second value is the cavity size of the cage and the third
value is 1 or 0 depending on if the cage is collapsed or not,
respectively.

"""


from mtkm import (StructUnit2, StructUnit3,
                  Cage, TwoPlusThree, FourPlusSix, EightPlusTwelve,
                  Dodecahedron, macromodel_opt)
from glob import iglob
import os
from itertools import product
import json
import multiprocessing as mp
from functools import partial


def make_cage(topology, bb_file, lk_file, opt_func):
    """
    Creates and optimizes all possible cages.

    Parameters
    ----------
    topology : :class:`type`
        The topology of the cage.

    bb_file : :class:`str`
        The path to the file holding the molecular building block of
        the cage.

    lk_file : :class:`str`
        The path to the file holding the molecular linker of the cage.

    opt_func : :class:`function`
        The optimization function used to optimize the structure of the
        assembled cage.

    Returns
    -------
    Cage
        The constructed :class:`Cage` object.

    """

    # Build the light cage.
    bb = StructUnit3(bb_file, 'aldehyde')
    lk = StructUnit2(lk_file, 'amine')
    c = Cage([bb, lk], topology())
    # Optimize the cage structure.
    opt_func(c)

    c.set_position([0, 0, 0])
    topi = topologies.index(topology)
    name = (str(topi) +
            os.path.basename(bb_file).replace('.mol', '') +
            os.path.basename(lk_file).replace('.mol', ''))
    try:
        wd = c.window_difference()
    except Exception as ex:
        wd = None
    if wd is None:
        collapsed = 1
    elif ((topology is TwoPlusThree and wd > 0.8) or
          (topology is FourPlusSix and wd > 0.6) or
          (topology is EightPlusTwelve and wd > 1.5) or
          (topology is Dodecahedron and wd > 1.0)):
        collapsed = 1
    else:
        collapsed = 0

    return name, c.mdl_mol_block(), c.cavity_size(), collapsed


topologies = [TwoPlusThree, FourPlusSix, EightPlusTwelve, Dodecahedron]
bb_files = iglob('mols/light/bbs/*.mol')
lk_files = iglob('mols/light/lks/*.mol')
opt_func = partial(macromodel_opt,
                   macromodel_path='/opt/schrodinger2016-4',
                   settings={'md': True})

with mp.Pool() as pool:
    cage_data = pool.starmap(make_cage,
                             product(topologies, bb_files,
                                     lk_files, opt_func))

opt_cages = {}
for name, mol_block, cavity_size, collapsed in cage_data:
    opt_cages[name] = [mol_block, cavity_size, collapsed]

with open('optcages', 'w') as f:
    f.write('opt_cages = ')
    json.dump(opt_cages, f)
    f.write(';')
