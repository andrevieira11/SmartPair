"""Strip white bg from logo, crop tightly, output transparent PNGs + favicons."""
from PIL import Image
import os

SRC = r"C:\Users\André\Desktop\ico.jpeg"
PUBLIC = r"G:\Projects\Git\SmartPair\public"
APP = r"G:\Projects\Git\SmartPair\app"

def make_transparent(img, threshold=240):
    """Convert near-white pixels to transparent."""
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # Distance from white
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (255, 255, 255, 0)
            elif r >= 220 and g >= 220 and b >= 220:
                # Soft edge: partial alpha
                m = max(r, g, b)
                alpha = int((255 - m) * 255 / 35)
                pixels[x, y] = (r, g, b, max(0, min(255, alpha)))
    return img

def crop_to_content(img):
    """Crop to non-transparent bbox, add small padding."""
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    return img

def square_pad(img, pad_pct=0.08):
    """Place image centered on transparent square canvas."""
    w, h = img.size
    side = max(w, h)
    pad = int(side * pad_pct)
    canvas_size = side + pad * 2
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    canvas.paste(img, ((canvas_size - w) // 2, (canvas_size - h) // 2), img)
    return canvas

def main():
    os.makedirs(PUBLIC, exist_ok=True)
    src = Image.open(SRC)
    print(f"Source: {src.size} {src.mode}")

    transparent = make_transparent(src)
    cropped = crop_to_content(transparent)
    print(f"Cropped: {cropped.size}")
    squared = square_pad(cropped)
    print(f"Squared: {squared.size}")

    # Master logo (transparent, tightly cropped, square)
    master_path = os.path.join(PUBLIC, "logo.png")
    squared.save(master_path, "PNG", optimize=True)
    print(f"Wrote {master_path}")

    # Favicon sizes
    sizes = {
        "icon-16.png": 16,
        "icon-32.png": 32,
        "icon-192.png": 192,
        "icon-512.png": 512,
        "apple-icon.png": 180,
    }
    for name, sz in sizes.items():
        out = squared.resize((sz, sz), Image.LANCZOS)
        out.save(os.path.join(PUBLIC, name), "PNG", optimize=True)
        print(f"Wrote public/{name} ({sz}x{sz})")

    # Next.js convention: app/icon.png and app/apple-icon.png override
    app_icon = squared.resize((512, 512), Image.LANCZOS)
    app_icon.save(os.path.join(APP, "icon.png"), "PNG", optimize=True)
    print("Wrote app/icon.png")
    apple_icon = squared.resize((180, 180), Image.LANCZOS)
    apple_icon.save(os.path.join(APP, "apple-icon.png"), "PNG", optimize=True)
    print("Wrote app/apple-icon.png")

    # Multi-size .ico for app/favicon.ico
    ico = squared.resize((256, 256), Image.LANCZOS)
    ico.save(
        os.path.join(APP, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
    print("Wrote app/favicon.ico")

if __name__ == "__main__":
    main()
