import React from 'react';
import { PSAWizard } from 'shared-react-components/src';

const Wizard = () => {
  const savedResult = localStorage.getItem('recommendedApp');

  const result = () => {
    window.location.href = JSON.parse(savedResult);
  };

  const handleWizardFinish = (mainResult) => {
    if (mainResult) {
      localStorage.setItem('recommendedApp', JSON.stringify(mainResult));
    }
  };

  return (
    <div>
      {savedResult && (result())}
      {!savedResult && <PSAWizard onFinish={handleWizardFinish} />}
    </div>
  );
};

export default Wizard;
