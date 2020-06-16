from lib.turtle_travel import TurtleTravel
from lib.path_tree import PathTree, Point

def make_factory(blueprint):
  return lambda *args: blueprint(*args)

path_tree_factory = make_factory(PathTree)
point_factory = make_factory(Point)

