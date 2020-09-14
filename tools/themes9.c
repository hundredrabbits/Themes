#include <u.h>
#include <libc.h>
#include <draw.h>
#include <event.h>

#define BUFLEN 1024

long theme[9];
Image *bg,
    *f_high, *f_med, *f_low, *f_inv,
    *b_high, *b_med, *b_low, *b_inv;

int
slen(char* s)
{
	int n = 0;
	while(s[n] != '\0' && s[++n])
		;
	return n;
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

void
parse(int fd)
{
	int i, id = 0;
	char buf[BUFLEN], hexs[8];

	read(fd, buf, BUFLEN);

	for(i = 0; i < BUFLEN; ++i) {
		if(buf[i] != '#')
			continue;
		print("#%s ", sstr(buf, hexs, i + 1, 6));
		theme[id] = (shex(hexs) << 8) + 255;
		id++;
	}

	if(id != 9)
		print("Invalid theme");

	close(fd);

	bg = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[0]);
	f_high = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[1]);
	f_med = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[2]);
	f_low = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[3]);
	f_inv = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[4]);
	b_high = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[5]);
	b_med = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[6]);
	b_low = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[7]);
	b_inv = allocimage(display, Rect(0, 0, 1, 1), RGB24, 1, theme[8]);
}

void
redraw(Image* dst)
{
	int size = 20;
	Point s = subpt(screen->r.max, screen->r.min);
	Point c = divpt(s, 2);
	Point m = addpt(screen->r.min, c);
	Point o = addpt(m, (Point){-size * 4, -size * 2});
	draw(screen, screen->r, bg, nil, ZP);

	fillellipse(screen,
	            addpt(o, (Point){size, size}),
	            size, size, f_high, ZP);
	fillellipse(screen,
	            addpt(o, (Point){size * 3, size}),
	            size, size, f_med, ZP);
	fillellipse(screen,
	            addpt(o, (Point){size * 5, size}),
	            size, size, f_low, ZP);
	fillellipse(screen,
	            addpt(o, (Point){size * 7, size}),
	            size, size, f_inv, ZP);
	fillellipse(screen,
	            addpt(o, (Point){size, size * 3}),
	            size, size, b_high, ZP);
	fillellipse(screen,
	            addpt(o, (Point){size * 3, size * 3}),
	            size, size, b_med, ZP);
	fillellipse(screen,
	            addpt(o, (Point){size * 5, size * 3}),
	            size, size, b_low, ZP);
	fillellipse(screen,
	            addpt(o, (Point){size * 7, size * 3}),
	            size, size, b_inv, ZP);
}

void
eresized(int new)
{
	Rectangle r;
	r = screen->r;
	if(new&& getwindow(display, Refnone) < 0)
		fprint(2, "can't reattach to window");
	redraw(screen);
}

void
main(int argc, char** argv)
{
	int fd;
	Mouse m;

	initdraw(0, 0, "Themes");

	if(argc == 1)
		fd = 0;
	else if((fd = open(argv[1], OREAD)) < 0)
		perror(argv[1]);
	parse(fd);

	eresized(0);
	einit(Emouse);

	/* Break on mouse3 */
	for(;;) {
		m = emouse();
		if(m.buttons & 4)
			break;
	}
}