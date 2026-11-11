MAGNATAYISU SUBDOMAIN WEBSITE — DEPLOYMENT NOTES

What is included
- index.html: landing page content and semantic structure.
- styles.css: responsive layout and styling; no external fonts or CSS libraries.
- script.js: accessible screen gallery controls/swipe/lightbox and the local food-serving estimate demo.
- MagnaTayISU.apk: test-signed Android demonstration installer.
- screenshots/: five HTML simulation preview images. They are not captures from the installed Android APK.
- downloads/: project report (PDF and Word), proposal, project guides, test checklist, two App Inventor source projects, and offline food database.

Upload to a subdomain
1. Upload the CONTENTS of this folder to the subdomain's document root (often public_html or a subdomain-specific folder). Do not upload only the parent LandingPage folder unless you want the site to appear under /LandingPage/.
2. Preserve the relative folder structure and filenames, especially screenshots/ and downloads/.
3. Ensure index.html, styles.css, script.js, and MagnaTayISU.apk are together at the document root.
4. Enable HTTPS in the hosting control panel if available. This is a static site and does not need PHP, a database, or a build step.
5. Visit the subdomain, test the menu links, gallery thumbnails/arrows/swipe, food estimate, FAQ disclosures, report links, and APK download on both desktop and phone.

Important status and accuracy notes
- The APK is a demonstration sideload build extracted from the supplied AAB and signed with a separate local test key. It is not a Google Play release, not signed with a production release key, and has not been physically verified.
- The stock MIT App Inventor Pedometer is foreground-oriented. Do not promise background step counting. The separate Itoo AIA requires compilation, installation, permissions, and real-phone testing.
- All five app images are HTML simulation previews. Do not label them screenshots of the installed Android app.
- Food calories, walking calories, distance, and step readings are estimates. The site demo does not connect to the Android app, save input, or send input to a server.
- Food calories consumed and walking calories burned are kept separate; neither the app nor website claims a calorie deficit or medical/nutrition advice.
- MagnaTayISU is a student project and is not an official Isabela State University service or endorsement.
- The supplied Google Drive item is an AAB, not a direct-install APK. The website's APK button downloads the test-signed demo APK in this folder.

Files for individual upload are also available in MagnaTayISU_Subdomain_Website.zip at the project root. Extract the ZIP into the subdomain's document root so that index.html is at the root.
