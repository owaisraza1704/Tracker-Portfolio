# Private content editor

The public portfolio has a fixed layout. The private editor at `/edit/login` lets the site owner change text and add, reorder, or remove entries inside existing sections. It covers the home page, project case studies, Thoughts, About, Lab, Now, and Contact.

## First use

1. On the local server, run `npm run editor:setup` and enter a password of at least 12 characters. The prompt hides the password.
2. Start the site and open `/edit/login`.
3. Edit a page and choose **Save draft**. Use **Preview draft** to inspect the changes while signed in.
4. Choose **Publish** to make the saved content visible to visitors.

Project and Thoughts slugs become their page URLs. Use lowercase letters, numbers, and hyphens; each slug must be unique within its page. Links may be internal paths, HTTPS URLs, or `mailto:` addresses.

Editor credentials and site content are kept under `.local/`, which is excluded from Git. `site-content.json` contains separate draft and published versions; `editor-auth.json` contains a salted password hash and one active session hash. Back up `.local/` before moving or resetting this server. A future serverless deployment will need durable external storage.

The editor does not create new page types or alter page layouts. It only changes the content the existing components render.
