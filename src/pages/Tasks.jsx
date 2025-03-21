// import { Toaster } from 'sonner';

import Sidebar from '../components/Sidebar';
import Tasks from '../components/Tasks';

const TasksPage = () => {
  return (
    <div className="flex bg-black bg-opacity-5">
      {/* <Toaster
        toastOptions={{
          style: {
            color: '#35383e',
          },
        }}
      /> */}
      <Sidebar />
      <Tasks />
    </div>
  );
};

export default TasksPage;
