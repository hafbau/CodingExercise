from lib.turtle_travel import TurtleTravel
from lib.path_tree import PathTree, Point

def make_factory(blueprint):
  '''
  overly simplified DI factory
  '''
  return lambda *args: blueprint(*args)

path_tree_factory = make_factory(PathTree)
point_factory = make_factory(Point)

