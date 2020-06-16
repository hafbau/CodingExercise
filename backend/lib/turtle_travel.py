from lib.turtle_constants import ORIENTATIONS, ORIENTATION_MAP, DIRECTION


class TurtleTravel:
  def __init__(self, path_tree_factory, point_factory):
    genesis_point = point_factory(0, 0, ORIENTATIONS['up'])
    self.path_tree = path_tree_factory(genesis_point)
    self.point_factory = point_factory

  def blast_off(self, direction):
    for move in direction:
      current_position = self.make_move(move)
      has_moved = move == DIRECTION['forward']
      point = self.point_factory(*current_position)
      self.path_tree.add_point(point, has_moved)
    return self.path_tree

  def make_move(self, move):
    x, y, orientation = self.path_tree.end_point.entries
    if move == DIRECTION['forward']:
      switcher = self.create_orientation_switch(x, y, orientation)
      x, y, orientation = switcher.get(orientation, lambda: [x, y, orientation])()
    else:
      orientation = self.change_orientation(orientation, move)
    return [x, y, orientation]

  def create_orientation_switch(self, x, y, orientation):
    return {
      ORIENTATIONS['up']: lambda: [x, y + 1, orientation],
      ORIENTATIONS['right']: lambda: [x + 1, y, orientation],
      ORIENTATIONS['down']: lambda: [x, y - 1, orientation],
      ORIENTATIONS['left']: lambda: [x - 1, y, orientation]
    }

  def change_orientation(self, orientation, change):
    current_orientation_index = ORIENTATION_MAP.index(orientation)
    map_last_idx = len(ORIENTATION_MAP) - 1

    if change == DIRECTION['clockwise']:
      current_orientation_index += 1
    else:
      current_orientation_index -= 1
    # circular access here
    if (current_orientation_index < 0):
      current_orientation_index = map_last_idx
    elif (current_orientation_index > map_last_idx):
      current_orientation_index = 0
    return ORIENTATION_MAP[current_orientation_index]