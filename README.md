# Future Frontend - website

This is the website of Future Frontend conference.

## Development

Before running the commands, copy `.env.template` as `.env` and fill the fields.

* Development server - `deno task start`
* Build process - `deno task build`

## Template

**Main features:**

* Markdown processing - the project README you see here is processed through the system
* Support for [Twind](https://twind.dev/) - Twind is a Tailwind-compatible styling approach
* State management through [Sidewind](https://sidewind.js.org/) - Sidewind has been configured as a script to the project so you can use it to add state to your components
* Basic components - I.e., `BaseLayout`, `SiteLink`, etc.

To learn more, see [Gustwind documentation](https://gustwind.js.org/).
