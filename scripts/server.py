import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

def run(port=4173):
    web_dir = os.path.join(os.path.dirname(__file__), "../dist")
    os.chdir(web_dir)
    server_address = ("127.0.0.1", port)
    httpd = HTTPServer(server_address, NoCacheHandler)
    print(f"Dev server running at http://127.0.0.1:{port} with no-cache headers...")
    httpd.serve_forever()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    run(port)
