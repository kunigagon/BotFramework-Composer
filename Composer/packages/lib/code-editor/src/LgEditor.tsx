// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';

import { RichEditor, RichEditorProps } from './RichEditor';

const LG_HELP =
  'https://github.com/microsoft/BotBuilder-Samples/blob/master/experimental/language-generation/docs/lg-file-format.md';
const placeholder = `> To learn more about the LG file format, read the documentation at
> ${LG_HELP}`;

export function LgEditor(props: RichEditorProps) {
  const options = {
    quickSuggestions: true,
    ...props.options,
  };
  return (
    <RichEditor
      placeholder={placeholder}
      helpURL={LG_HELP}
      {...props}
      theme={'lgtheme'}
      language={'botbuilderlg'}
      options={options}
    />
  );
}
