# Miss Mishti — Makeup Artist Website

A responsive static website built with HTML, CSS and vanilla JavaScript. It is ready to publish using GitHub Pages.

## Files
- `index.html` — homepage and appointment form
- `styles.css` — responsive layout and styling
- `script.js` — mobile navigation, date validation and Google Apps Script form submission
- `assets/` — image crops from the supplied design reference

## Publish on GitHub Pages
1. Create a new GitHub repository (for example `miss-mishti-website`).
2. Upload **all files and the `assets` folder** from this project. Keep `index.html` in the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish the site. Your public URL will appear in the Pages settings.

## Appointment form setup
The form posts these fields to the Google Apps Script web-app URL configured at the top of `script.js`:
`name`, `phone`, `email`, `service`, `date`, `message`, plus aliases `fullName`, `mobile`, and `appointmentDate`.

Important:
- Your Apps Script must have a `doPost(e)` handler that reads these field names and writes the values to your Google Sheet.
- Deploy the Apps Script as a **Web app**, set access to **Anyone** (or the access level appropriate for your users), and use the deployed `/exec` URL.
- If you change or redeploy the Apps Script URL, update `GOOGLE_SCRIPT_URL` in `script.js`.
- This static website cannot verify the contents of the Google Sheet response because the browser uses `no-cors` for cross-origin Apps Script submission. The page displays a request-sent message when the browser accepts the POST. Test with a real booking and confirm that a row is added to the Sheet.

## Before going live
- Replace the sample phone number, email, address and social profile `#` links if they are not the final business details.
- Confirm that all service names and claims are accurate.
- Test the appointment form on the published GitHub Pages URL.
