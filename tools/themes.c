#include <stdio.h>

#define BUFLEN 256

int
slen(char* s)
{
	int n = 0;
	while(s[n] != '\0' && s[++n])
		;
	return n;
}

int
cpos(char* s, char c)
{
	int i;
	for(i = 0; i < slen(s); i++)
		if(s[i] == c)
			return i;
	return -1;
}

char*
sstr(char* src, char* dest, int from, int to)
{
	int i;
	char *a = (char*)src + from, *b = (char*)dest;
	for(i = 0; i < to; i++)
		b[i] = a[i];
	dest[to] = '\0';
	return dest;
}

unsigned char
chex(char c)
{
	if(c >= 'a' && c <= 'f')
		return 10 + c - 'a';
	if(c >= 'A' && c <= 'F')
		return 10 + c - 'A';
	return (c - '0') & 0xF;
}

unsigned long
shex(char* s)
{
	int i, n = 0, l = slen(s);
	for(i = 0; i < l; ++i)
		n |= (chex(s[i]) << ((l - i - 1) * 4));
	return n;
}

int
error(char* name)
{
	printf("Error: %s\n", name);
	return 0;
}

int
parse(FILE* f)
{
	int i, id = 0;
	long theme[9];
	char line[BUFLEN], hexs[BUFLEN];
	while(fgets(line, BUFLEN, f)) {
		int split = cpos(line, '#');
		if(split < 0 || id > 9)
			continue;
		sstr(line, hexs, split, 7);
		printf("%s ", hexs);
		theme[id] = shex(hexs + 1);
		id++;
	}
	if(id != 9)
		return error("Invalid theme");
	for(i = 0; i < 9; ++i) {
		printf("%ld ", theme[i]);
	}
	return 1;
}

int
main(int argc, char* argv[])
{
	FILE* input;
	if(argc == 2) {
		input = fopen(argv[1], "rb");
		if(input == NULL)
			return error("Invalid input.\n");
	} else
		input = stdin;
	return parse(input);
}