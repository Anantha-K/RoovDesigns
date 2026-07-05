from PIL import Image

def process_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    newData = []
    
    for item in datas:
        # item is (R, G, B, A)
        # If it's close to white, make it transparent
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            newData.append((255, 255, 255, 0))
        else:
            # If it's dark (the logo itself), make it white and opaque
            newData.append((255, 255, 255, item[3]))
            
    img.putdata(newData)
    img.save(output_path, "PNG")

process_logo("public/logo1.png", "public/logo1-white.png")
process_logo("public/logo3.png", "public/logo3-white.png")
print("Logos processed successfully.")
