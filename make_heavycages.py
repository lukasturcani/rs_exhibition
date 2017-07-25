"""
Creates the "heavycages" file.

The "heavycages" file is holds a JavaScript object where each attribute
name is the ID of a cage and the value is a tuple. The first value of
the tuple is a string holding the molecular structure in .mol V3000
format and the second value is the cavity size of the cage.

"""

from mtkm import (StructUnit2, StructUnit3,
                  Cage, TwoPlusThree, FourPlusSix, EightPlusTwelve,
                  Dodecahedron)
from glob import iglob
from itertools import product
import os
import json
import multiprocessing as mp


def make_cage(topology, bb_file, lk_file):
    """
    Creates a cage.

    Parameters
    ----------
    topology : :class:`type`
        The topology of the cage.

    bb_file : :class:`str`
        The path to the file holding the molecular building block of
        the cage.

    lk_file : :class:`str`
        The path to the file holding the molecular linker of the cage.

    Returns
    -------
    Cage
        The constructed :class:`Cage` object.

    """

    bb = StructUnit3(bb_file, 'aldehyde')
    lk = StructUnit2(lk_file, 'amine')
    c = Cage([bb, lk], topology())
    bbname = os.path.basename(bb_file).replace('.mol', '')
    lkname = os.path.basename(lk_file).replace('.mol', '')
    topi = topologies.index(topology) + 1
    c.name = str(topi) + bbname + lkname
    # Carbon atoms needs to be changed to Si.
    for a in c.mol.GetAtoms():
        if a.GetAtomicNum() == 6:
            a.SetAtomicNum(14)
    c.set_position([0, 0, 0])
    return c.name, c.mdl_mol_block(), c.cavity_size()


topologies = [TwoPlusThree, FourPlusSix, EightPlusTwelve, Dodecahedron]
bb_files = iglob('mols/heavy/bbs/*.mol')
lk_files = iglob('mols/heavy/lks/*.mol')

# Construct the cages in parallel.
with mp.Pool() as pool:
    cage_data = pool.starmap(make_cage,
                             product(topologies, bb_files, lk_files))

unopt_cages = {}
for name, mol_block, cavity_size in cage_data:
    unopt_cages[name] = [mol_block, cavity_size]

with open('heavycages', 'w') as f:
    f.write('unopt_cages = ')
    json.dump(unopt_cages, f)
    f.write(';')
