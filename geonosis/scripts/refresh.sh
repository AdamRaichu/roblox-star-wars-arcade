cd ../shared
npm run build --silent

cd ../geonosis
npm uninstall ../shared --no-save --silent

npm i --install-links

rojo serve & npm run watch
