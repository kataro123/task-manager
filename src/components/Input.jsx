import { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';
// const Input = ({ label, error, ...rest }) => {
//   return (
//     <div className="flex flex-col space-y-1 text-left">
//       <InputLabel htmlFor={rest.id}>{label}</InputLabel>
//       <input
//         className="rounded-lg border-2 border-solid border-[#ececec] px-4 py-3 outline-[#00adb5] placeholder:text-sm placeholder:text-[#9a9c9f]"
//         {...rest}
//       />

//       {error && (
//         <p className="text-left text-xs text-red-500">{error.message}</p>
//       )}
//     </div>
//   );
// };

const Input = forwardRef(({ label, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border-2 border-solid border-[#ececec] px-4 py-3 outline-[#00adb5] placeholder:text-sm placeholder:text-[#9a9c9f]"
        ref={ref}
        {...rest}
      />

      {error && <InputErrorMessage>{error.message}</InputErrorMessage>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
