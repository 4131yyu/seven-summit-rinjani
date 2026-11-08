# Asset Guide — Seven Summit Rinjani

This document describes the expected media assets for the website.

All media assets are stored in public/assets/.

## Background Music

Current supplied file:

- public/audio/bg_music/Akbar Chalay & Mingse - Astaga Bercanda (Lirik_Lyrics) - 7clouds Indonesia.mp3

The application attempts unmuted autoplay at a reduced volume. Browsers can
still block it, in which case visitors can start playback using the visible
music-disc control. Confirm that the project has permission to use this track
before publication.

## 1. Hero Video and Poster

Directory:

public/assets/videos/hero/

Expected file:

- rinjani-hero.mp4

Recommended:
- Landscape orientation.
- 16:9 or wider.
- Cinematic footage supplied or approved by the project team.
- MP4 container with web-friendly encoding and optimized file size.
- Muted playback only; no forced sound autoplay.
- Authentic Rinjani footage only.

Poster directory:

public/assets/images/hero/

Expected file:

- gunung.webp

The poster is the visual fallback when the hero video is unavailable, fails to
load, or should not play. Do not create a fake video or poster file.

## 2. Destination Images

Directory:

public/assets/images/destinations/

Expected files:

- summit-01.webp
- summit-02.webp
- summit-03.webp
- summit-04.webp
- summit-05.webp
- summit-06.webp
- summit-07.webp

Recommended:
- Consistent visual quality.
- Landscape orientation.
- WebP format.
- Appropriate alt text.
- Each image must correspond to the correct destination.

Do not assume the final official destination names before verification.

## 3. Gallery Images

Directory:

public/assets/images/gallery/

Use for:
- Destination scenery.
- Trekking experiences.
- Landscape photography.
- Supporting visual sections.

## 4. Destination Videos

Directory:

public/assets/videos/destinations/

Expected files:

- summit-01.mp4
- summit-02.mp4
- summit-03.mp4
- summit-04.mp4
- summit-05.mp4
- summit-06.mp4
- summit-07.mp4

Recommended:
- MP4 container.
- H.264 video encoding for broad browser compatibility.
- Landscape orientation.
- Optimized file size.
- Separate poster images.
- No forced autoplay with sound.

Only use footage that accurately represents the destination.

## 5. Mascot Animation

Directory:

public/assets/mascot/animations/

Expected files:

- mascot-main.riv
- mascot-fallback.webp

Rive file requirements:
- Character artwork.
- Appropriate rigging.
- Animation sequences.
- Artboard.
- State Machine.
- Verified input names and types.

Conceptual behaviors:
- Idle.
- Welcome.
- Explore.
- Thinking.
- Happy.
- Success.
- Sad.

These are behavior requirements, not predefined Rive input names.

The actual Rive State Machine and inputs must be inspected before React integration.

## 6. Mascot Images

Directory:

public/assets/mascot/images/

Expected file:

- mascot-main.png

Use as a static visual or fallback when appropriate.

## 7. Mascot Audio

Directory:

public/assets/mascot/audio/

Expected files:

- mascot-welcome.mp3
- mascot-gallery.mp3
- mascot-destination.mp3
- mascot-booking.mp3
- mascot-success.mp3

Audio should:
- Use clear Indonesian pronunciation.
- Be understandable.
- Have consistent volume.
- Avoid long unnecessary dialogue.
- Be optional.
- Never be required to understand the interface.

## 8. Asset Replacement

When replacing a placeholder:

1. Use the expected filename or update the centralized asset configuration.
2. Verify the file path.
3. Verify the file format.
4. Test the asset in the browser.
5. Verify mobile behavior.
6. Update this document if the asset structure changes.

## 9. Missing Asset Behavior

If an asset is unavailable:
- Do not create a fake media file.
- Do not leave a broken image.
- Use a fallback component.
- Keep the surrounding interface functional.
- Record the missing asset in PROJECT_STATUS.md.
