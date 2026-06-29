import shutil, os

src = r"C:\Users\Himanshu\.gemini\antigravity\brain\b6ef82fd-f9d9-4a12-adc7-a029ba51f16b\future_funnels_logo_1782715818931.png"
dst_dir = r"C:\Users\Himanshu\.gemini\antigravity\scratch\future-funnels\assets"
dst = os.path.join(dst_dir, "logo.png")

os.makedirs(dst_dir, exist_ok=True)
shutil.copy(src, dst)
print("Copied:", dst)
