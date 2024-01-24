import ButtonClick from './ButtonClick';
import { useImperativeHandle, useState, forwardRef } from 'react';

const Togglable = forwardRef((props, refs) => {
  const { buttonLabel, children } = props;
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return toggleVisibility;
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <ButtonClick onClick={toggleVisibility} color1="blue">
          {buttonLabel}
        </ButtonClick>
      </div>
      <div style={showWhenVisible}>
        {children}
        <ButtonClick onClick={toggleVisibility} color1='red'>Cancel</ButtonClick>
      </div>
    </div>
  );
});

export default Togglable;
