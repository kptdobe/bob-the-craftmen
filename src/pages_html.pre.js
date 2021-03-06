/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const jquery = require('jquery');
const html = require('./html.pre.js');

module.exports.pre = (context, action) => {
  const { document } = context.content;
  const $ = jquery(document.defaultView);

  const cssClass = context.content.mdast.meta.class || '';
  const $sections = $(document.body).children('div');

  // first section has a starting image: add title class and wrap all subsequent items inside a div
  $sections
    .first()
    .has('p:first-child>img')
    .addClass('title')
    .find(':nth-child(1n+2)')
    .wrapAll(`<div class="header ${cssClass}"></div>`);

  // sections consisting of only one image
  $sections
    .filter('[data-hlx-types~="has-only-image"]')
    .not('.title')
    .addClass('image');

  // sections without image and title class gets a default class
  $sections
    .not('.image')
    .not('.title')
    .addClass(`default ${cssClass}`);

  // if there are no sections wrap everything in a default div
  if ($sections.length === 0) {
    $(document.body).children().wrapAll(`<div class="default ${cssClass}"></div>`);
  }
};

module.exports.before = {
  // Load embeds with layout defined in the matching yaml file if available
  html: html.before.html
}

module.exports.after = {
  // Make sure to load meta from the matching yaml file if available
  meta: html.after.meta
}