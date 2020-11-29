#!/bin/bash

rm -f ./themes

clang-format -i themes.c

# Linux
cc -std=c89 -DDEBUG -Wall -Wpedantic -Wshadow -Wextra -Werror=implicit-int -Werror=incompatible-pointer-types -Werror=int-conversion -Wvla -g -Og -fsanitize=address -fsanitize=undefined -o themes themes.c

# ./themes ../themes/apollo.svg

cat ../themes/apollo.svg | ./themes
