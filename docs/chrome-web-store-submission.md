# Chrome Web Store Submission Checklist

## One-time setup

- [ ] Register a Google Developer account at https://chrome.google.com/webstore/devconsole
- [ ] Pay the one-time $5 registration fee

---

## Before submitting

### 1. Clean up the manifest

In `src/manifest.json`:

- [ ] Update `"name"` to the public-facing extension name (currently `"J's Symphony Tools Extension"` — decide on a final name)
- [ ] Update `"default_title"` under `"action"` (currently `"Chrome Addon v3 Starter"`)
- [ ] Confirm `"version"` is correct (currently `3.2.0`)

### 2. Screenshots

- [ ] Capture at least 1 screenshot of the extension in use on composer.trade
  - Required dimensions: **1280x800** or **640x400**
  - Good candidates: the Symphony Editor widget sidebar, the QuantMage download buttons, the portfolio aggregate view
- [ ] Save to `docs/images/` for reference

### 3. Privacy policy

Google requires a privacy policy for extensions that use `host_permissions`.

- [ ] Write a simple policy (see template below)
- [ ] Host it somewhere publicly accessible — GitHub Pages works fine
- [ ] Note the URL, you'll paste it into the store listing

**Minimal privacy policy template:**
> Symphony Tools does not collect, store, or transmit any personal data. All extension functionality runs locally in your browser and interacts only with the Composer.trade interface you are already logged into.

### 4. Build the zip

- [ ] Zip the contents of the `src/` folder (not the folder itself — zip the files inside it)
- [ ] Verify `manifest.json` is at the root of the zip

```bash
cd src && zip -r ../symphony-tools.zip . && cd ..
```

---

## Store listing content

Have the following ready when filling out the listing form:

- **Name:** (finalize from manifest)
- **Short description** (132 char max): e.g. `Adds useful tools to the Composer.trade UI — search/replace, JSON/EDN export, QuantMage download, and more.`
- **Detailed description:** Expand on features (can reuse README content)
- **Category:** `Productivity`
- **Screenshots:** At least 1, prepared above
- **Privacy policy URL:** From step 3

---

## Submission

1. Go to https://chrome.google.com/webstore/devconsole
2. Click **New Item** and upload the zip
3. Fill out the store listing fields above
4. Submit for review

**Review timeline:** Typically 1–3 business days, up to 1 week for new submissions.

---

## After approval

- [ ] Add the Chrome Web Store link to the README under Installation
- [ ] Tag the release on GitHub matching the version in `manifest.json`
