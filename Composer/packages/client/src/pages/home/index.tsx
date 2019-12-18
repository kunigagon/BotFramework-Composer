// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useCallback, useContext, useEffect } from 'react';
import formatMessage from 'format-message';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { RouteComponentProps } from '@reach/router';

import { StoreContext } from '../../store';
import { CreationFlowStatus } from '../../constants';
import { ToolBar } from '../../components/ToolBar/index';

import * as home from './styles';
import { ItemContainer } from './ItemContainer';
import { RecentBotList } from './RecentBotList';
import { ExampleList } from './ExampleList';

const Home: React.FC<RouteComponentProps> = () => {
  const { state, actions } = useContext(StoreContext);
  const { botName, recentProjects, templateProjects } = state;
  const {
    openBotProject,
    setCreationFlowStatus,
    fetchTemplates,
    saveTemplateId,
    fetchRecentProjects,
    onboardingAddCoachMarkRef,
  } = actions;

  const onClickRecentBotProject = async path => {
    await openBotProject(path);
  };

  const onSelectionChanged = async item => {
    if (item && item.path) {
      await onClickRecentBotProject(item.path);
    }
  };

  const onClickTemplate = id => {
    saveTemplateId(id);
    setCreationFlowStatus(CreationFlowStatus.NEW_FROM_TEMPLATE);
  };

  const addButton = <Icon styles={home.button} iconName="Add" />;

  const addRef = useCallback(project => onboardingAddCoachMarkRef({ project }), []);

  const toolbarItems = [
    {
      type: 'action',
      text: formatMessage('New'),
      buttonProps: {
        iconProps: {
          iconName: 'CirclePlus',
        },
        onClick: () => setCreationFlowStatus(CreationFlowStatus.NEW),
      },
      align: 'left',
      dataTestid: 'homePage-ToolBar-New',
      disabled: false,
    },
    {
      type: 'action',
      text: formatMessage('Open'),
      buttonProps: {
        iconProps: {
          iconName: 'OpenFolderHorizontal',
        },
        onClick: () => setCreationFlowStatus(CreationFlowStatus.OPEN),
      },
      align: 'left',
      dataTestid: 'homePage-ToolBar-Open',
      disabled: false,
    },
    {
      type: 'action',
      text: formatMessage('Save as'),
      buttonProps: {
        iconProps: {
          iconName: 'Save',
        },
        onClick: () => setCreationFlowStatus(CreationFlowStatus.SAVEAS),
      },
      align: 'left',
      disabled: botName ? false : true,
    },
  ];

  useEffect(() => {
    fetchRecentProjects();
    fetchTemplates();
  }, []);

  return (
    <div css={home.outline}>
      <ToolBar toolbarItems={toolbarItems} />
      <div css={home.page}>
        <div css={home.leftPage}>
          <h1 css={home.title}>{formatMessage(`ChatBot Composer from CheckMobile`)}</h1>
          <div css={home.introduction}>
            {formatMessage(
              'ChatBot Composer from CheckMobile is an integrated development environment (IDE) for building bots and other types of conversations'
            )}
          </div>
          <div css={home.newBotContainer}>
            <div data-testid={'homePage-body-New'}>
              <ItemContainer
                title={addButton}
                content={formatMessage('New')}
                styles={home.newBotItem}
                onClick={() => {
                  setCreationFlowStatus(CreationFlowStatus.NEW);
                }}
              />
            </div>
            {recentProjects.length > 0 ? (
              <ItemContainer
                title={''}
                content={recentProjects[0].name}
                styles={home.lastestBotItem}
                onClick={async () => {
                  await onClickRecentBotProject(recentProjects[0].path);
                }}
                forwardedRef={addRef}
              />
            ) : (
              <ItemContainer
                title={''}
                content={'ToDoBotWithLuis'}
                styles={home.lastestBotItem}
                onClick={() => {
                  onClickTemplate('ToDoBotWithLuisSample');
                }}
                forwardedRef={addRef}
              />
            )}
          </div>
          {recentProjects.length > 0 && (
            <div css={home.leftContainer}>
              <h2 css={home.subtitle}>{formatMessage(`Recent Bots`)}</h2>
              <RecentBotList
                recentProjects={recentProjects}
                onSelectionChanged={async item => {
                  await onSelectionChanged(item);
                }}
              />
            </div>
          )}
        </div>
        <div css={home.rightPage}>
          <h3 css={home.bluetitle}>{formatMessage(`Examples`)}</h3>
          <p css={home.examplesDescription}>
            {formatMessage(
              "These examples bring together all of the best practices and supporting components we've identified through building of conversational experiences."
            )}
          </p>
          <ExampleList examples={templateProjects} onClick={onClickTemplate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
