#include <stdio.h>

int
cpos(char *s, char c)
{
	int i = 0;
	while(s[i])
		if(s[i++] == c)
			return i - 1;
	return -1;
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

int
shex(char *s, int len)
{
	int i, n = 0;
	for(i = 0; i < len; ++i)
		n |= (chex(s[i]) << ((len - i - 1) * 4));
	return n;
}

char *
sstr(char *src, char *dst, int from, int to)
{
	int i;
	char *a = (char *)src + from, *b = (char *)dst;
	for(i = 0; i < to; i++)
		b[i] = a[i];
	dst[to] = '\0';
	return dst;
}

int
error(char *name)
{
	printf("Error: %s\n", name);
	return 0;
}

int
parse(FILE *f)
{
	int i, id = 0;
	long theme[9];
	char line[256], hexs[9][7];
	while(fgets(line, 256, f)) {
		int split = cpos(line, '#');
		if(split >= 0) {
			sstr(line + split + 1, hexs[id], 0, 6);
			theme[id++] = shex(line + split + 1, 6);
		}
		if(id >= 9)
			break;
	}
	if(id != 9)
		return error("Invalid theme");
	for(i = 0; i < 9; ++i)
		printf("#%s = %ld\n", hexs[i], theme[i]);
	return 1;
}

int
main(int argc, char *argv[])
{
	FILE *input;
	if(argc == 2) {
		input = fopen(argv[1], "rb");
		if(input == NULL)
			return error("Invalid input.\n");
	} else
		input = stdin;
	return parse(input);
}
