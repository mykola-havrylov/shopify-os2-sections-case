# Product image brief

Generate 30 images: one per variant (28) plus a desktop and a mobile hero image for the home page.

## Output

- Product images: 1600x2000 px (4:5), JPEG, under 800 KB each (compress if needed).
- `hero-desktop.jpg`: 2400x1350 px (16:9), JPEG, under 1 MB. `hero-mobile.jpg`: 1200x1500 px (4:5), JPEG, under 600 KB.
- File name exactly as given in the heading, saved to `data/images/`.
- Do not add text, letters, numbers, logos, watermarks or brand marks to any image. Product names and descriptions below are for reference only. Never write them on the image.
- Alt text is given per image. It describes the object and is not written on the image.

## Style shared by all images

- Background: seamless warm off-white studio background (#F6F1EA), no visible horizon; the object rests on the same off-white surface.
- Light: soft warm daylight from the left, a gentle soft shadow falling to the right.
- Framing: portrait 4:5, one object (or one set) centered, filling about 60% of the frame height (60% of the width for wide objects).
- Material: hand-thrown stoneware with subtle natural irregularities, satin or matte glaze, unglazed raw clay foot.
- Mood: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour.
- Always: no text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects. Vases are empty.

## Glazes

| Glaze    | Look                                                                                         |
| -------- | -------------------------------------------------------------------------------------------- |
| Oat      | a matte satin oatmeal glaze, warm cream with fine brown speckles                             |
| Moss     | a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges    |
| Charcoal | a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles |

## Keeping variants consistent

Generate the first variant of a product from its full prompt. For the other variants of the same product, use the
edit prompt on the first image instead of a fresh generation, so form, angle, framing and light stay identical and only
the glaze changes. If the tool cannot edit, use the full prompt and compare the results side by side before keeping them.

## Images

### Stoneware Mug, Glaze: Oat (`stoneware-mug-oat.jpg`)

- Size: 1600x2000
- SKU: HC-SM-OAT
- Alt text: Oat-glazed stoneware mug

Prompt:

> Product photo of one hand-thrown stoneware mug with straight sides and a thick rounded handle on the right, about 350 ml. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame height. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: Hand-thrown stoneware mug with a thick, comfortable handle and a satin glaze. Holds 350 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Stoneware Mug, Glaze: Moss (`stoneware-mug-moss.jpg`)

- Size: 1600x2000
- SKU: HC-SM-MOS
- Alt text: Moss-glazed stoneware mug
- Base image: `stoneware-mug-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one hand-thrown stoneware mug with straight sides and a thick rounded handle on the right, about 350 ml. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame height. Glaze: a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: Hand-thrown stoneware mug with a thick, comfortable handle and a satin glaze. Holds 350 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Stoneware Mug, Glaze: Charcoal (`stoneware-mug-charcoal.jpg`)

- Size: 1600x2000
- SKU: HC-SM-CHA
- Alt text: Charcoal-glazed stoneware mug
- Base image: `stoneware-mug-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one hand-thrown stoneware mug with straight sides and a thick rounded handle on the right, about 350 ml. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame height. Glaze: a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: Hand-thrown stoneware mug with a thick, comfortable handle and a satin glaze. Holds 350 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Espresso Cup Pair, Title: Default Title (`espresso-cup-pair.jpg`)

- Size: 1600x2000
- SKU: HC-ECP-DEF
- Alt text: Oat-glazed pair of stoneware espresso cups

Prompt:

> Product photo of two small stoneware espresso cups with small loop handles, standing side by side with a slight overlap, about 90 ml each. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame width. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: Two small stoneware cups with a speckled glaze, made for a short espresso. Holds 90 ml each. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Tall Latte Mug, Glaze: Oat (`tall-latte-mug-oat.jpg`)

- Size: 1600x2000
- SKU: HC-TLM-OAT
- Alt text: Oat-glazed tall stoneware latte mug

Prompt:

> Product photo of one tall, narrow stoneware mug with a gently tapered body and a slim handle on the right, about 420 ml. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame height. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A tall, narrow mug that keeps milk drinks warm. Reactive glaze, so no two are identical. Holds 420 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Tall Latte Mug, Glaze: Charcoal (`tall-latte-mug-charcoal.jpg`)

- Size: 1600x2000
- SKU: HC-TLM-CHA
- Alt text: Charcoal-glazed tall stoneware latte mug
- Base image: `tall-latte-mug-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one tall, narrow stoneware mug with a gently tapered body and a slim handle on the right, about 420 ml. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame height. Glaze: a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A tall, narrow mug that keeps milk drinks warm. Reactive glaze, so no two are identical. Holds 420 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Handleless Tea Cup, Title: Default Title (`handleless-tea-cup.jpg`)

- Size: 1600x2000
- SKU: HC-HTC-DEF
- Alt text: Moss-glazed handleless stoneware tea cup

Prompt:

> Product photo of one handleless stoneware tea cup with a rounded, slightly flared rim on a small foot, about 200 ml. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame height. Glaze: a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A handleless cup that sits easily in two hands. Unglazed foot, glazed interior. Holds 200 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Pasta Bowl, Glaze: Oat (`pasta-bowl-oat.jpg`)

- Size: 1600x2000
- SKU: HC-PB-OAT
- Alt text: Oat-glazed stoneware pasta bowl

Prompt:

> Product photo of one wide, shallow stoneware pasta bowl with a gently sloped wall, 22 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from about 40 degrees above so the inside of the bowl is visible, centered, filling about 60% of the frame width. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A wide, shallow bowl for pasta, salads and grain dishes. Dishwasher and microwave safe. 22 cm across. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Pasta Bowl, Glaze: Moss (`pasta-bowl-moss.jpg`)

- Size: 1600x2000
- SKU: HC-PB-MOS
- Alt text: Moss-glazed stoneware pasta bowl
- Base image: `pasta-bowl-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one wide, shallow stoneware pasta bowl with a gently sloped wall, 22 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from about 40 degrees above so the inside of the bowl is visible, centered, filling about 60% of the frame width. Glaze: a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A wide, shallow bowl for pasta, salads and grain dishes. Dishwasher and microwave safe. 22 cm across. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Cereal Bowl, Glaze: Oat (`cereal-bowl-oat.jpg`)

- Size: 1600x2000
- SKU: HC-CB-OAT
- Alt text: Oat-glazed stoneware cereal bowl

Prompt:

> Product photo of one deep stoneware cereal bowl with a gently curved wall, 15 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from about 30 degrees above so the inside of the bowl is partly visible, centered, filling about 60% of the frame height. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A deep bowl with a gently curved wall that is easy to scoop from. 15 cm across, holds 500 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Cereal Bowl, Glaze: Moss (`cereal-bowl-moss.jpg`)

- Size: 1600x2000
- SKU: HC-CB-MOS
- Alt text: Moss-glazed stoneware cereal bowl
- Base image: `cereal-bowl-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one deep stoneware cereal bowl with a gently curved wall, 15 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from about 30 degrees above so the inside of the bowl is partly visible, centered, filling about 60% of the frame height. Glaze: a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A deep bowl with a gently curved wall that is easy to scoop from. 15 cm across, holds 500 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Cereal Bowl, Glaze: Charcoal (`cereal-bowl-charcoal.jpg`)

- Size: 1600x2000
- SKU: HC-CB-CHA
- Alt text: Charcoal-glazed stoneware cereal bowl
- Base image: `cereal-bowl-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one deep stoneware cereal bowl with a gently curved wall, 15 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from about 30 degrees above so the inside of the bowl is partly visible, centered, filling about 60% of the frame height. Glaze: a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A deep bowl with a gently curved wall that is easy to scoop from. 15 cm across, holds 500 ml. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Serving Bowl, Size: Medium (`serving-bowl-medium.jpg`)

- Size: 1600x2000
- SKU: HC-SB-MED
- Alt text: Medium stoneware serving bowl in oat glaze

Prompt:

> Product photo of one generous stoneware serving bowl with a softly rolled rim, 28 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from about 40 degrees above so the inside of the bowl is visible, centered, filling about 60% of the frame width. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A generous serving bowl with a rolled rim. Sized for a table of four to six (Medium, 28 cm across) or eight (Large, 34 cm across). No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Serving Bowl, Size: Large (`serving-bowl-large.jpg`)

- Size: 1600x2000
- SKU: HC-SB-LAR
- Alt text: Large stoneware serving bowl in oat glaze
- Base image: `serving-bowl-medium.jpg` (use the edit prompt)

Prompt:

> Product photo of one generous stoneware serving bowl with a softly rolled rim, 34 cm across, noticeably wider and deeper than a 28 cm bowl. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from about 40 degrees above so the inside of the bowl is visible, centered, filling about 60% of the frame width. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A generous serving bowl with a rolled rim. Sized for a table of four to six (Medium, 28 cm across) or eight (Large, 34 cm across). No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a matte satin oatmeal glaze, warm cream with fine brown speckles. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Dinner Plate, Glaze: Oat (`dinner-plate-oat.jpg`)

- Size: 1600x2000
- SKU: HC-DP-OAT
- Alt text: Oat-glazed stoneware dinner plate

Prompt:

> Product photo of one flat-rimmed stoneware dinner plate, 27 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from a high angle, about 50 degrees above, centered, filling about 60% of the frame width. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A flat-rimmed dinner plate in a matte glaze. Stackable and dishwasher safe. 27 cm across. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Dinner Plate, Glaze: Moss (`dinner-plate-moss.jpg`)

- Size: 1600x2000
- SKU: HC-DP-MOS
- Alt text: Moss-glazed stoneware dinner plate
- Base image: `dinner-plate-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one flat-rimmed stoneware dinner plate, 27 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from a high angle, about 50 degrees above, centered, filling about 60% of the frame width. Glaze: a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A flat-rimmed dinner plate in a matte glaze. Stackable and dishwasher safe. 27 cm across. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Dinner Plate, Glaze: Charcoal (`dinner-plate-charcoal.jpg`)

- Size: 1600x2000
- SKU: HC-DP-CHA
- Alt text: Charcoal-glazed stoneware dinner plate
- Base image: `dinner-plate-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one flat-rimmed stoneware dinner plate, 27 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from a high angle, about 50 degrees above, centered, filling about 60% of the frame width. Glaze: a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A flat-rimmed dinner plate in a matte glaze. Stackable and dishwasher safe. 27 cm across. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Side Plate, Glaze: Oat (`side-plate-oat.jpg`)

- Size: 1600x2000
- SKU: HC-SP-OAT
- Alt text: Oat-glazed stoneware side plate

Prompt:

> Product photo of one flat-rimmed stoneware side plate, 20 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from a high angle, about 50 degrees above, centered, filling about 60% of the frame width. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A smaller plate for bread, cheese and desserts. Matches the dinner plate. 20 cm across. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Side Plate, Glaze: Moss (`side-plate-moss.jpg`)

- Size: 1600x2000
- SKU: HC-SP-MOS
- Alt text: Moss-glazed stoneware side plate
- Base image: `side-plate-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one flat-rimmed stoneware side plate, 20 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from a high angle, about 50 degrees above, centered, filling about 60% of the frame width. Glaze: a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A smaller plate for bread, cheese and desserts. Matches the dinner plate. 20 cm across. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Side Plate, Glaze: Charcoal (`side-plate-charcoal.jpg`)

- Size: 1600x2000
- SKU: HC-SP-CHA
- Alt text: Charcoal-glazed stoneware side plate
- Base image: `side-plate-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one flat-rimmed stoneware side plate, 20 cm across. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from a high angle, about 50 degrees above, centered, filling about 60% of the frame width. Glaze: a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A smaller plate for bread, cheese and desserts. Matches the dinner plate. 20 cm across. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Serving Platter, Title: Default Title (`serving-platter.jpg`)

- Size: 1600x2000
- SKU: HC-SP-DEF
- Alt text: Oat-glazed oval stoneware serving platter

Prompt:

> Product photo of one oval stoneware serving platter with a low rim, 40 cm long, long side horizontal. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from a high angle, about 50 degrees above, centered, filling about 60% of the frame width. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: An oval platter for bringing a whole meal to the table. Glazed on both sides. 40 cm long. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Four-Piece Dinner Set, Glaze: Oat (`four-piece-dinner-set-oat.jpg`)

- Size: 1600x2000
- SKU: HC-FDS-OAT
- Alt text: Oat-glazed four-piece stoneware dinner set

Prompt:

> Product photo of a set of two stoneware dinner plates stacked, with two stoneware pasta bowls stacked beside them, all in the same glaze. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame width. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: Two dinner plates and two pasta bowls in one glaze. A starter set for two. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Four-Piece Dinner Set, Glaze: Moss (`four-piece-dinner-set-moss.jpg`)

- Size: 1600x2000
- SKU: HC-FDS-MOS
- Alt text: Moss-glazed four-piece stoneware dinner set
- Base image: `four-piece-dinner-set-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of a set of two stoneware dinner plates stacked, with two stoneware pasta bowls stacked beside them, all in the same glaze. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), three-quarter view, centered, filling about 60% of the frame width. Glaze: a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: Two dinner plates and two pasta bowls in one glaze. A starter set for two. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a muted moss green satin glaze, soft olive tone with slightly darker pooling at the edges. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Bud Vase, Glaze: Oat (`bud-vase-oat.jpg`)

- Size: 1600x2000
- SKU: HC-BV-OAT
- Alt text: Oat-glazed stoneware bud vase

Prompt:

> Product photo of one small hand-thrown stoneware bud vase with a narrow neck, 12 cm tall, empty, no flowers. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), front view, centered, filling about 60% of the frame height. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A small vase for a single stem. Glazed inside and watertight. 12 cm tall. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Bud Vase, Glaze: Charcoal (`bud-vase-charcoal.jpg`)

- Size: 1600x2000
- SKU: HC-BV-CHA
- Alt text: Charcoal-glazed stoneware bud vase
- Base image: `bud-vase-oat.jpg` (use the edit prompt)

Prompt:

> Product photo of one small hand-thrown stoneware bud vase with a narrow neck, 12 cm tall, empty, no flowers. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), front view, centered, filling about 60% of the frame height. Glaze: a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A small vase for a single stem. Glazed inside and watertight. 12 cm tall. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Ridge Vase, Height: Short (`ridge-vase-short.jpg`)

- Size: 1600x2000
- SKU: HC-RV-SHO
- Alt text: Short ridged stoneware vase in oat glaze

Prompt:

> Product photo of one hand-thrown stoneware vase with a horizontal ridged surface, a rounded body and a narrow opening, about 18 cm tall, empty, no flowers. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), front view, centered, filling about 60% of the frame height. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A hand-thrown vase with a ridged surface that catches the light. Watertight. Available in two heights. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Ridge Vase, Height: Tall (`ridge-vase-tall.jpg`)

- Size: 1600x2000
- SKU: HC-RV-TAL
- Alt text: Tall ridged stoneware vase in oat glaze
- Base image: `ridge-vase-short.jpg` (use the edit prompt)

Prompt:

> Product photo of one hand-thrown stoneware vase with a horizontal ridged surface, a rounded body and a narrow opening, about 30 cm tall and slimmer in proportion, empty, no flowers. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), front view, centered, filling about 60% of the frame height. Glaze: a matte satin oatmeal glaze, warm cream with fine brown speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A hand-thrown vase with a ridged surface that catches the light. Watertight. Available in two heights. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

Edit prompt:

> Edit the previous image of this product. Keep the shape, camera angle, framing, light, shadow and background exactly the same. Change only the glaze to a matte satin oatmeal glaze, warm cream with fine brown speckles. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Pinch Pot, Title: Default Title (`pinch-pot.jpg`)

- Size: 1600x2000
- SKU: HC-PP-DEF
- Alt text: Charcoal-glazed stoneware pinch pot

Prompt:

> Product photo of one small open hand-formed stoneware pinch pot with a slightly irregular rim, about 8 cm across, empty. Seamless warm off-white studio background (#F6F1EA) with no visible horizon; the object rests on the same off-white surface. Soft warm daylight from the left, a gentle soft shadow falling to the right. Portrait 4:5 composition (1600x2000 px), seen from about 40 degrees above, centered, filling about 60% of the frame height. Glaze: a soft matte charcoal glaze, dark grey with a faint warm undertone and fine lighter speckles. Hand-thrown stoneware with subtle natural irregularities and an unglazed raw clay foot, realistic ceramic material, natural proportions. Style: clean, minimal, editorial e-commerce catalog photograph, slightly muted colour. Mood reference only, never to be written on the image: A small open pot, shaped by hand. Holds keys, rings or a tea light. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no props, no plants, no other objects.

### Home hero, desktop, 16:9 (`hero-desktop.jpg`)

- Size: 2400x1350
- Alt text: Stoneware plates, a bowl and mugs on a linen-covered oak table

Prompt:

> Lifestyle photo, landscape 16:9 composition (2400x1350 px): a plain linen cloth on an oak tabletop in warm daylight with a few pieces of handmade stoneware: two dinner plates and a bowl in oat glaze, two mugs in moss glaze. The pieces are arranged on the right two thirds of the frame; the left third is calm, uncluttered linen and kept empty for a text overlay. Camera slightly above the table, soft warm daylight from the left, shallow depth of field, warm off-white and natural oak tones, slightly muted colour. Style: quiet editorial photograph, realistic materials. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no plants, no food.

### Home hero, mobile, 4:5 (`hero-mobile.jpg`)

- Size: 1200x1500
- Alt text: Stoneware plates, a bowl and mugs on a linen-covered oak table

Prompt:

> Lifestyle photo, portrait 4:5 composition (1200x1500 px): a plain linen cloth on an oak tabletop in warm daylight with a few pieces of handmade stoneware: two dinner plates and a bowl in oat glaze, two mugs in moss glaze. The pieces are arranged in the lower half of the frame; the upper half is calm, uncluttered linen and kept empty for a text overlay. Camera slightly above the table, soft warm daylight from the left, shallow depth of field, warm off-white and natural oak tones, slightly muted colour. Style: quiet editorial photograph, realistic materials. No text, no letters, no numbers, no logos, no watermarks, no hands, no people, no plants, no food.
