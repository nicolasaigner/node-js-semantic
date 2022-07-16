#!/bin/ash

set -e
if [ "$CUSTOM" == "true" ]
then echo '{ "path": "cz-customizable" }' > ~/.czrc
fi

exec "$@"
