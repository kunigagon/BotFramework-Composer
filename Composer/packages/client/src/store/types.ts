// TODO: Extract some common types to be shared across packages (e.g. DialogInfo, LgFile, etc)
// TODO: remove this once we can expand the types
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { CreationFlowStatus, BotStatus } from '../constants';

export interface ActionType {
  type: string;
  payload?: any;
  error?: any;
}

export interface Store {
  dispatch: React.Dispatch<ActionType>;
  state: State;
}

export type ActionCreator = (store: Store, ...args: any[]) => Promise<void> | void;
export type ActionHandlers = { [action: string]: ActionCreator };

interface StateError {
  summary: string;
  message: string;
}

export interface State {
  dialogs: DialogInfo[];
  botName: string;
  /** the data path for VisualEditor, based on `dialogs` which computed from files */
  navPath: string;
  /** the data path for FormEditor */
  focusPath: string;
  navPathHistory: string[];
  recentProjects: any[];
  storages: any[];
  focusedStorageFolder: any;
  botStatus: BotStatus;
  botLoadErrorMsg: string;
  creationFlowStatus: CreationFlowStatus;
  templateId: string;
  storageFileLoadingStatus: string;
  schemas: any;
  lgFiles: LgFile[];
  luFiles: LuFile[];
  error: StateError | null;
  oAuth: any;
  showCreateDialogModal: boolean;
  onCreateDialogComplete?: (dialogId: string | null) => void;
}

export type ReducerFunc = (state: State, payload: any) => State;

export interface DialogInfo {
  id: string;
  displayName: string;
  isRoot: boolean;
  content: any;
}

export interface Intent {
  name: string;
}

export interface Utterance {
  intent: string;
  text: string;
}

export interface LuFile {
  id: string;
  relativePath: string;
  content: string;
  parsedContent: {
    LUISJsonStructure: {
      intents: Intent[];
      utterances: Utterance[];
    };
  };
}

export interface LgFile {
  id: string;
  relativePath: string;
  content: string;
}

export interface LgTemplate {
  Name: string;
  Body: string;
}