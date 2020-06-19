import unittest
from lib.path_tree import PathTree, Point

class TestPathTree(unittest.TestCase):
  def setUp(self):
    self.test_point = Point(0, 0, 'up')
    self.test_tree = PathTree(self.test_point)

    self.first_test_point = Point(0, 1, 'up')
    self.second_test_point = Point(0, 1, 'right')

  def tearDown(self):
    pass

  def test_instantiation(self):
    self.assertEqual(self.test_tree.end_point, self.test_point)

  def test_add_point(self):
    self.test_tree.add_point(self.first_test_point, True)
    self.test_tree.add_point(self.second_test_point, False)

    self.assertEqual(self.test_tree.end_point, self.second_test_point)
    self.assertEqual(self.test_tree.visited_points.get(self.first_test_point.path), 1)

  def test_grid_props(self):
    self.test_tree.add_point(self.first_test_point, True)
    self.test_tree.add_point(self.second_test_point, False)
    grid = self.test_tree.grid_props

    self.assertEqual(grid.get('width'), 0)
    self.assertEqual(grid.get('height'), 1)
    self.assertEqual(grid.get('minY'), 0)
    self.assertEqual(grid.get('minX'), 0)
    self.assertEqual(grid.get('maxX'), 0)
    self.assertEqual(grid.get('maxY'), 1)
    self.assertEqual(grid.get('originX'), 0)
    self.assertEqual(grid.get('originY'), 1)
    self.assertEqual(grid.get('size'), 1)

  def test_revisited_points(self):
    self.test_tree.add_point(self.first_test_point, True)
    self.test_tree.add_point(self.second_test_point, False)

    revisited_points = self.test_tree.revisited_points
    self.assertEqual(len(revisited_points), 0)
    
    self.test_tree.add_point(self.second_test_point, True)

    revisited_points = self.test_tree.revisited_points
    self.assertEqual(len(revisited_points), 1)


class TestPoint(unittest.TestCase):
  def setUp(self):
    self.test_point = Point(0, 0, 'up')

  def tearDown(self):
    pass

  def test_instantiation(self):
    self.assertEqual(self.test_point.x, 0)
    self.assertEqual(self.test_point.y, 0)
    self.assertEqual(self.test_point.orientation, 'up')
    x, y, orientation = self.test_point.entries
    self.assertEqual(x, 0)
    self.assertEqual(y, 0)
    self.assertEqual(orientation, 'up')
    self.assertEqual(self.test_point.path, '[0, 0]')


if __name__ == '__main__':
  unittest.main()