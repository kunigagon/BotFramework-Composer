// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useState, Fragment } from 'react';
import formatMessage from 'format-message';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { DeployWizard } from './deployWizard.js';
import { styles } from './styles';

const instructions = {
  title: formatMessage('Deploy your bot to Azure'),
  description: formatMessage(
    'For team members or customers to interact with this bot, your bot needs to be deployed. Bots can be deployed to Azure with generated script by Composer'
  ),
  button1: formatMessage('Create Azure Resources'),
  button2: formatMessage('Deploy Bot to Azure'),
};

export const Deployment = () => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState(0);

  const openWizardCreate = () => {
    openWizard(0);
  };

  const openWizardDeploy = () => {
    openWizard(1);
  };

  const openWizard = initialStep => {
    setStep(initialStep);
    setWizardOpen(true);
  };

  const closeWizard = () => {
    setWizardOpen(false);
  };

  return (
    <Fragment>
      <div style={styles.page}>
        <h1 style={styles.header}>{instructions.title}</h1>
        <p>{instructions.description}</p>
        <Stack horizontal gap="2rem">
          <DefaultButton onClick={openWizardCreate} text={instructions.button1} />
          <DefaultButton onClick={openWizardDeploy} text={instructions.button2} />
        </Stack>
        <DeployWizard isOpen={wizardOpen} initialStep={step} closeModal={closeWizard} />
      </div>
    </Fragment>
  );
};
