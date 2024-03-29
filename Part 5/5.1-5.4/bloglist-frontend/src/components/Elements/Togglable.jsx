import ButtonClick from './ButtonClick';
import PropTypes from 'prop-types';
import { useImperativeHandle, useState, forwardRef } from 'react';

const Togglable = forwardRef((props, refs) => {
  const { buttonLabelToOpen, buttonLabelToClose, children, type } = props;
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
        <ButtonClick onClick={toggleVisibility} type={type}>
          {buttonLabelToOpen}
        </ButtonClick>
      </div>
      <div style={showWhenVisible}>
        {children}
        <ButtonClick onClick={toggleVisibility} type="orange-button">
          {buttonLabelToClose}
        </ButtonClick>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabelToOpen: PropTypes.string.isRequired,
  buttonLabelToClose: PropTypes.string.isRequired,
};

export default Togglable;
