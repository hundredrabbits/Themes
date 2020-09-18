"""
Nine colors should be more than enough for any interface.
"""
import xml.sax

class ThemeHandler(xml.sax.ContentHandler):
    def __init__(self):
        self.background = None
        self.f_high = None
        self.f_med = None
        self.f_low = None
        self.f_inv = None
        self.b_high = None
        self.b_med = None
        self.b_low = None
        self.b_inv = None

    def parseColor(self, attrs):
        data = {k: v for k, v in attrs.items()}
        if data.get('id') and data.get('fill'):
            setattr(self, data['id'], data['fill'])

    def startElement(self, name, attrs):
        if name in ('circle', 'rect'):
            self.parseColor(attrs)


def parse_theme(path):
    theme = ThemeHandler()
    parser = xml.sax.make_parser()
    parser.setContentHandler(theme)
    with open(path, 'r') as fd:
        parser.parse(fd)
    return theme
