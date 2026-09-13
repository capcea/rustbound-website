from pathlib import Path
from PIL import Image
base=Path(__file__).resolve().parents[1]
source=Path(r'D:\RustServer\server\carbon\data\RustboundUI')
for d in ['brand','backgrounds','icons','textures']:
    (base/'src/assets'/d).mkdir(parents=True,exist_ok=True)
(base/'public').mkdir(exist_ok=True)
Image.open(source/'rustbound_logo.png').convert('RGB').save(base/'src/assets/brand/rustbound-logo.webp',quality=94)
Image.open(source/'rustbound_logo.png').crop((30,25,255,203)).resize((64,64),Image.Resampling.LANCZOS).save(base/'public/favicon.png')
Image.open(source/'rustbound_logo.png').crop((28,22,256,204)).save(base/'src/assets/brand/founders.webp',quality=95)
hero=Image.open(r'D:\RustServer\output\imagegen\rustbound-website-hero.png')
hero.save(base/'src/assets/backgrounds/rustbound-hero.webp',quality=88)
# Mechanical crops of the approved text-free scene; no recreated branding.
hero.crop((720,140,1672,800)).resize((950,660),Image.Resampling.LANCZOS).save(base/'src/assets/backgrounds/compound.webp',quality=85)
hero.crop((390,220,1270,850)).resize((880,630),Image.Resampling.LANCZOS).save(base/'src/assets/backgrounds/coast.webp',quality=85)
Image.open(source/'reference_card_texture.png').save(base/'src/assets/textures/steel.webp',quality=80)
for name in ['starter','loyalty','supporter']:
    Image.open(source/('kit_'+name+'_v1.png')).save(base/('src/assets/icons/'+name+'.webp'),quality=87)
print('Rustbound assets prepared')
