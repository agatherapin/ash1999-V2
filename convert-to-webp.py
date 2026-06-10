"""
Script de conversion d'images en WebP pour portfolio Next.js.
- Convertit tous les .jpg, .jpeg, .png en .webp (qualité 80)
- Convertit les .gif animés en .webp animé
- Sauvegarde les originaux dans un dossier "originals_backup"
- Met à jour les chemins dans tous les fichiers .ts, .tsx, .js, .jsx
- Corrige les chemins "public/img/..." en "/img/..."
"""

import os
import re
import shutil
from PIL import Image

# ========== CONFIGURATION ==========
PROJECT_FOLDER = os.path.dirname(os.path.abspath(__file__))
IMG_FOLDER = os.path.join(PROJECT_FOLDER, "public", "img")
BACKUP_FOLDER = os.path.join(PROJECT_FOLDER, "originals_backup")
SOURCE_EXTENSIONS = (".ts", ".tsx", ".js", ".jsx")
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif"}
QUALITY = 80
# ====================================

converted = 0
skipped = 0
errors = []


def convert_image(filepath):
    global converted, skipped

    ext = os.path.splitext(filepath)[1].lower()
    webp_path = os.path.splitext(filepath)[0] + ".webp"

    if os.path.exists(webp_path):
        print(f"  ⏭  Déjà converti : {os.path.basename(webp_path)}")
        skipped += 1
        return

    try:
        img = Image.open(filepath)

        # Préserve le profil colorimétrique (sinon les couleurs partent en cacahuète
        # sur les écrans wide-gamut : un WebP sans profil n'est pas traité comme du sRGB).
        icc_profile = img.info.get("icc_profile")
        save_kwargs = {"quality": QUALITY, "method": 4}
        if icc_profile:
            save_kwargs["icc_profile"] = icc_profile

        if ext == ".gif" and hasattr(img, "n_frames") and img.n_frames > 1:
            img.save(webp_path, "WEBP", save_all=True, **save_kwargs)
            print(f"  ✅ GIF animé → {os.path.basename(webp_path)}")
        else:
            if img.mode in ("RGBA", "LA", "PA"):
                img.save(webp_path, "WEBP", **save_kwargs)
            else:
                img = img.convert("RGB")
                img.save(webp_path, "WEBP", **save_kwargs)
            print(f"  ✅ {os.path.basename(filepath)} → {os.path.basename(webp_path)}")

        converted += 1
        # Supprimer l'original après conversion réussie
        os.remove(filepath)

    except Exception as e:
        errors.append((filepath, str(e)))
        print(f"  ❌ Erreur : {os.path.basename(filepath)} — {e}")


def update_source_files():
    """Met à jour les chemins d'images dans tous les fichiers source du projet."""
    updated_files = 0

    # Dossiers à ignorer
    ignore_dirs = {".next", "node_modules", "originals_backup", ".git"}

    for root, dirs, files in os.walk(PROJECT_FOLDER):
        # Exclure les dossiers inutiles
        dirs[:] = [d for d in dirs if d not in ignore_dirs]

        for filename in files:
            if not filename.endswith(SOURCE_EXTENSIONS):
                continue

            filepath = os.path.join(root, filename)

            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            original = content

            # 1. Corriger "public/img/" → "/img/"
            content = content.replace("'public/img/", "'/img/")
            content = content.replace('"public/img/', '"/img/')

            # 2. Remplacer les extensions image par .webp (dans les chemins /img/...)
            for ext in [".jpg", ".jpeg", ".png", ".gif"]:
                # Remplace uniquement dans les chemins qui ressemblent à des images
                content = re.sub(
                    r"(/img/[^\s'\"]+)" + re.escape(ext),
                    lambda m: m.group(1) + ".webp",
                    content,
                    flags=re.IGNORECASE
                )

            if content != original:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                rel = os.path.relpath(filepath, PROJECT_FOLDER)
                print(f"  ✅ {rel}")
                updated_files += 1

    return updated_files


def backup_originals():
    for root, dirs, files in os.walk(IMG_FOLDER):
        for filename in files:
            ext = os.path.splitext(filename)[1].lower()
            if ext in IMAGE_EXTENSIONS:
                src = os.path.join(root, filename)
                rel_path = os.path.relpath(src, IMG_FOLDER)
                dst = os.path.join(BACKUP_FOLDER, rel_path)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(src, dst)


# ========== LANCEMENT ==========
print("=" * 50)
print("🖼  Conversion d'images en WebP")
print("=" * 50)

if not os.path.exists(IMG_FOLDER):
    print(f"\n❌ Dossier 'public/img' introuvable dans {PROJECT_FOLDER}")
    exit(1)

# 1. Backup
print("\n📦 Sauvegarde des originaux...")
backup_originals()
print("   Fait !")

# 2. Conversion
print(f"\n🔄 Conversion en cours (qualité {QUALITY})...\n")
for root, dirs, files in os.walk(IMG_FOLDER):
    for filename in sorted(files):
        ext = os.path.splitext(filename)[1].lower()
        if ext in IMAGE_EXTENSIONS:
            convert_image(os.path.join(root, filename))

# 3. Mise à jour des fichiers source
print("\n📝 Mise à jour des chemins dans les fichiers source...\n")
updated = update_source_files()

# 4. Résumé
print("\n" + "=" * 50)
print(f"📊 Résumé :")
print(f"   ✅ {converted} images converties")
print(f"   ⏭  {skipped} déjà en webp")
print(f"   📝 {updated} fichiers source mis à jour")
if errors:
    print(f"   ❌ {len(errors)} erreurs :")
    for path, err in errors:
        print(f"      - {path}: {err}")
print("=" * 50)

print("\n💡 Prochaines étapes :")
print("   1. Lance npm run build && npm run start pour vérifier")
print("   2. Si tout est OK, tu peux supprimer le dossier 'originals_backup'")
print("   3. Push sur GitHub / Vercel se met à jour")