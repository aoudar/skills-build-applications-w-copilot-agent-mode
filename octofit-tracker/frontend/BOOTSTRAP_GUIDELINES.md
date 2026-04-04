# OctoFit Tracker Frontend Bootstrap Usage Guidelines

All React components in the OctoFit Tracker frontend must use Bootstrap for consistent UI/UX. Follow these rules for all new and refactored components:

## 1. Tables
- Use `<table className="table table-striped table-hover">` for all data tables.
- Table headers should use `<thead>` and `<th>`.
- Table rows should use `<tbody>` and `<tr>`.

## 2. Buttons
- Use `<button className="btn btn-primary">`, `<button className="btn btn-secondary">`, etc., or `<a className="btn ...">` for links styled as buttons.
- Use Bootstrap color classes for different actions (primary, secondary, success, danger, etc).

## 3. Headings
- Use Bootstrap heading classes: `display-1` to `display-6`, or `h1` to `h6` with utility classes.

## 4. Links
- Use `<a className="nav-link">` for navigation links.
- Use `<a className="App-link">` for styled links in content.

## 5. Navigation
- Use `<nav className="navbar ...">` for the main navigation bar.
- Use `.navbar-brand`, `.navbar-nav`, `.nav-item`, `.nav-link` for structure.

## 6. Forms
- Use `<form>` with `.form-label`, `.form-control`, `.form-select`, `.btn` for all forms.
- Group form fields with `.mb-3` for spacing.

## 7. Cards
- Use `<div className="card">`, `.card-header`, `.card-body`, `.card-footer` for all card layouts.

## 8. Modals
- Use Bootstrap modal structure for all modals. See App.js for an example.
- Use `.modal`, `.modal-dialog`, `.modal-content`, `.modal-header`, `.modal-body`, `.modal-footer`.

## 9. Consistency
- All data tables, forms, cards, and modals must follow the structure and classes shown in App.js.
- Use Bootstrap grid system (`container`, `row`, `col-`) for layout.

---

**Reference:** See `src/App.js` for a complete example of all UI elements styled with Bootstrap.
