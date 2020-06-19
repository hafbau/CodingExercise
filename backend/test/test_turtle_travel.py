import unittest
from unittest import mock
from lib.turtle_travel import TurtleTravel

class TestTurtleTravel(unittest.TestCase):
  def setUp(self):
    self.point_factory = mock.MagicMock()
    self.point_factory.return_value = mock.MagicMock()

    self.path_tree_factory = mock.MagicMock()
    self.path_tree_factory.return_value = mock.MagicMock()

    self.test_turtle_travel = TurtleTravel(
      self.path_tree_factory,
      self.point_factory
    )

  def tearDown(self):
    self.point_factory = None
    self.path_tree_factory = None
    self.test_turtle_travel = None

  def test_instantiation(self):
    self.assertGreaterEqual(self.path_tree_factory.call_count, 1)
    assert self.test_turtle_travel.path_tree is not None

  @mock.patch.object(TurtleTravel, 'make_move')
  def test_blast_off(self, mock_make_move):
    self.test_turtle_travel.path_tree.add_point = mock.MagicMock()

    self.test_turtle_travel.blast_off('LFR')
    self.assertGreaterEqual(mock_make_move.call_count, 3)
    self.assertGreaterEqual(self.test_turtle_travel.path_tree.add_point.call_count, 3)

  def test_change_orientation(self):
    new_orientation = self.test_turtle_travel.change_orientation('up', 'R')
    self.assertEqual(new_orientation, 'right')

    new_orientation = self.test_turtle_travel.change_orientation('right', 'L')
    self.assertEqual(new_orientation, 'up')

  
if __name__ == '__main__':
  unittest.main()

