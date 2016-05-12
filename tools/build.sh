dirname=$(dirname $0)
cd "$dirname/.."
./node_modules/.bin/doxx "$(pwd)/config/doxx"
