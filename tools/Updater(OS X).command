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

cd ~/Github/HundredRabbits/Verreciel/
git pull
electron-packager . Verreciel --platform=darwin --arch=x64 --out ~/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns
chflags -f -R nouchg ~/Desktop/Verreciel-darwin-x64/
rm -r /Applications/Verreciel.app
mv -v ~/Desktop/Verreciel-darwin-x64/Verreciel.app /Applications/
rm -r ~/Desktop/Verreciel-darwin-x64/

cd ~/Github/HundredRabbits/Oquonie/
git pull
electron-packager . Oquonie --platform=darwin --arch=x64 --out ~/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns
chflags -f -R nouchg ~/Desktop/Oquonie-darwin-x64/
rm -r /Applications/Oquonie.app
mv -v ~/Desktop/Oquonie-darwin-x64/Oquonie.app /Applications/
rm -r ~/Desktop/Oquonie-darwin-x64/

cd ~/Github/HundredRabbits/Donsol/
git pull
electron-packager . Donsol --platform=darwin --arch=x64 --out ~/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns
chflags -f -R nouchg ~/Desktop/Donsol-darwin-x64/
rm -r /Applications/Donsol.app
mv -v ~/Desktop/Donsol-darwin-x64/Donsol.app /Applications/
rm -r ~/Desktop/Donsol-darwin-x64/

