import sys
import asyncio
import uvicorn
from io import BytesIO
from decouple import config
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from lib.main import TurtleTravel, path_tree_factory, point_factory

app = Starlette()
app.add_middleware(CORSMiddleware, allow_origins=[config('ORIGIN')], allow_headers=['X-Requested-With', 'Content-Type'], allow_methods=['GET', 'POST'])


@app.route('/')
async def home(request):
    return JSONResponse({'result': { 'status': 'all systems green' } })

@app.route('/api/v1/path/compute', methods=['POST'])
async def compute_path(request):
    direction_data = await request.form()
    direction_bytes = await (direction_data['file'].read())
    direction = direction_bytes.decode("utf-8")

    turtle_voyage = TurtleTravel(path_tree_factory, point_factory)
    path = turtle_voyage.blast_off(direction)
    return JSONResponse({'result': {
        'fullPath': path.full_path,
        'grid': path.grid_props,
        'revisitedPoints': path.revisited_points
    } })


if __name__ == '__main__':
    if 'serve' in sys.argv:
        uvicorn.run(app=app, host='0.0.0.0', port=5000, log_level="info")
