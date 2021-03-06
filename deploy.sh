#!/bin/bash
 cd assets
 export MIX_ENV=prod
 export PORT=4747
 npm install
 node_modules/.bin/webpack --mode production
 cd ..
 mix phx.digest
 mix compile
 mix release --env=prod

echo "Stopping old copy of app, if any..."

_build/prod/rel/task_tracker1/bin/task_tracker1 stop || true

echo "Starting app..."

_build/prod/rel/task_tracker1/bin/task_tracker1 start
