import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="rounded-lg border-2 border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        ref={ref}
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {props.error && (
        <InputErrorMessage>{props.error.message}</InputErrorMessage>
      )}
    </div>
  );
});

TimeSelect.displayName = 'TimeSelect';

TimeSelect.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default TimeSelect;
