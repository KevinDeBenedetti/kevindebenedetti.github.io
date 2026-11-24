# kevindebenedetti.github.io

The documentation hub: one site that publishes the docs of every public repository of its owner.

## Language

### Projects

**Project**:
A repository whose docs are published on the hub under their own URL prefix.
_Avoid_: repo (a repository is a project only once its docs are published), section

**Synced project**:
A project whose pages are written in another repository and copied here at build time.
_Avoid_: remote project, external project

**Local project**:
A project whose pages are written and committed in this repository.
_Avoid_: internal project, committed project

**Index page**:
The landing page of a project. The hub generates it for a local project, and for a synced project whose source has none.
_Avoid_: overview page, home page (the homepage is the landing page of the whole site)

**Docs source**:
A repository whose docs the hub publishes, seen from the sync: where to copy the pages from, and the state of its docs folder.
_Avoid_: upstream, origin repo

**Sync state**:
What the published site was built from: for each docs source, the version of its docs folder, its description and its default branch. The scheduled check compares it with the current one to decide whether to rebuild.
_Avoid_: snapshot, cache, manifest

### Navigation

**Site navigation**:
Everything a reader uses to move between projects and pages: the list of projects, the nav bar, the sidebar, the edit links and the generated index pages and homepage, all derived from the projects found at build time.
_Avoid_: site map (a sitemap is the XML file for search engines), generated config, menu

**Edit link**:
The link on a page that leads to the file to change on GitHub: in the source repository for a synced project's page, in this repository otherwise.
_Avoid_: source link
