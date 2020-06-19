import ast

class PathTree:
  '''
  This is a datastructure for storing full paths (stack) and relevant meta data
  '''
  def __init__(self, genesis_point):
    self.full_path = [
      [genesis_point.x, genesis_point.y]
    ]
    self.minX = genesis_point.x
    self.minY = genesis_point.y
    self.maxX = genesis_point.x
    self.maxY = genesis_point.y

    self.visited_points = {
      genesis_point.path: 1,
    }
    self.end_point = genesis_point
  
  def add_point(self, point, has_moved):
    '''
    takes two arguments - point to add and if point is a forward move.
    returns void
    side effects include a. add the point to full_path list b. update the self.visited dict,
    c. sets the min / max values for x and y and d. updates self.endpoint
    '''
    if (has_moved):
      self.full_path.append([point.x, point.y])
      self.visited_points[point.path] = self.visited_points.get(point.path, 0) + 1
      
      if (self.minX > point.x): self.minX = point.x
      if (self.maxX < point.x): self.maxX = point.x
      if (self.minY > point.y): self.minY = point.y
      if (self.maxY < point.y): self.maxY = point.y
    self.end_point = point

  @property
  def grid_props(self):
    '''
    getter method - takes no arguments. Returns a dict with grid size parameters
    '''
    width = self.maxX - self.minX
    height = self.maxY - self.minY
    return {
      'minY': self.minY,
      'maxY': self.maxY,
      'minX': self.minX,
      'maxX': self.maxX,
      'width': width,
      'height': height,
      'size': width if (width > height) else height,
      'originY': 0 if height == 0 else self.maxY / height,
      'originX': 0 if width == 0 else self.minX / width,
    }
  
  @property
  def revisited_points(self):
    '''
    takes no arguments; returns a list of points that have been revisited
    '''
    return list(map(
      ast.literal_eval,
      [
        path for path, times_visited in self.visited_points.items() if times_visited > 1
      ]
    ))

class Point:
  '''
  Point encapsulates x, y coordinates and orientation of a particular point
  '''
  def __init__(self, x, y, orientation):
    self.x = x
    self.y = y
    self.orientation = orientation
    self.entries = [x, y, orientation]
    self.path = f'[{x}, {y}]'
