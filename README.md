# Future Frontend - website

This is the website of Future Frontend conference.

## Development

If you need API-backed data locally, copy `.env.template` as `.env` and fill the fields. The file is optional, so CI and builds without API credentials still run.

* Install dependencies - `npm install`
* Development server - `npm run start`
* Build process - `npm run build`

## Template

**Main features:**

* Markdown processing - the project README you see here is processed through the system
* Support for [Tailwind CSS](https://tailwindcss.com/) through Gustwind's packaged Tailwind plugin
* State management through [Sidewind](https://sidewind.js.org/) - Sidewind has been configured as a script to the project so you can use it to add state to your components
* Basic components - I.e., `BaseLayout`, `SiteLink`, etc.

To learn more, [see Gustwind documentation](https://gustwind.js.org/).
