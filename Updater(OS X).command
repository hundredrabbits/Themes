#!/bin/bash

cd ~/Github/HundredRabbits/Marabu/
git pull
electron-packager . Marabu --platform=darwin --arch=x64 --out ~/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns
chflags -f -R nouchg ~/Desktop/Marabu-darwin-x64/
rm -r /Applications/Marabu.app
mv -v ~/Desktop/Marabu-darwin-x64/Marabu.app /Applications/
rm -r ~/Desktop/Marabu-darwin-x64/

cd ~/Github/HundredRabbits/Left/
git pull
electron-packager . Left --platform=darwin --arch=x64 --out ~/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns
chflags -f -R nouchg ~/Desktop/Left-darwin-x64/
rm -r /Applications/Left.app
mv -v ~/Desktop/Left-darwin-x64/Left.app /Applications/
rm -r ~/Desktop/Left-darwin-x64/

cd ~/Github/HundredRabbits/Ronin/
git pull
electron-packager . Ronin --platform=darwin --arch=x64 --out ~/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns
chflags -f -R nouchg ~/Desktop/Ronin-darwin-x64/
rm -r /Applications/Ronin.app
mv -v ~/Desktop/Ronin-darwin-x64/Ronin.app /Applications/
rm -r ~/Desktop/Ronin-darwin-x64/

cd ~/Github/HundredRabbits/Dotgrid/
git pull
electron-packager . Dotgrid --platform=darwin --arch=x64 --out ~/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns
chflags -f -R nouchg ~/Desktop/Dotgrid-darwin-x64/
rm -r /Applications/Dotgrid.app
mv -v ~/Desktop/Dotgrid-darwin-x64/Dotgrid.app /Applications/
rm -r ~/Desktop/Dotgrid-darwin-x64/