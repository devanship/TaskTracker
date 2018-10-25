#!/bin/bash
 cd assets
 export MIX_ENV=prod
 export PORT=4774
 npm install
 node_modules/.bin/webpack --mode production
 cd ..
 mix phx.digest
 mix compile
 mix release --env=prod

echo "Stopping old copy of app, if any..."

_build/prod/rel/task_tracker2/bin/task_tracker2 stop || true

echo "Starting app..."

_build/prod/rel/task_tracker2/bin/task_tracker2 start
