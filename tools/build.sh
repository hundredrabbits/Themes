#!/bin/bash

clang-format -i main.c

# Linux
cc -std=c89 -DDEBUG -Wall -Wpedantic -Wshadow -Wextra -Werror=implicit-int -Werror=incompatible-pointer-types -Werror=int-conversion -Wvla -g -Og -fsanitize=address -fsanitize=undefined -o main main.c

# RPi
# tcc -Wall main.c -o main

# Plan9
# pcc main.c -o main

# ./main ../themes/apollo.svg

cat ../themes/apollo.svg | ./main

rm ./main
