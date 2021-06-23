import React from 'react';

import AModal from './AModal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <AModal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </AModal>
  );
};

export default ErrorModal;
