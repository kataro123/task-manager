import Sidebar from './components/Sidebar';
import { Toaster } from 'sonner';
import Tasks from './components/Tasks';

const App = () => {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: '#35383e',
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  );
};

export default App;
