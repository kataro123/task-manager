import DashboardCards from '../components/DashboardCards';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskItem from '../components/TaskItem';
import { useGetTasks } from '../hooks/data/use-mutate-task';

const HomePage = () => {
  const { data: tasks } = useGetTasks();
  return (
    <div className="flex bg-black bg-opacity-5">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />
        <DashboardCards />
        <div className="grid grid-cols-[1.5fr,1fr] gap-4">
          <div className="space-y-6 rounded-[10px] bg-white p-6">
            <div>
              <h3 className="text-xl font-bold">Tarefas</h3>
              <span className="text-sm text-brand-dark-gray">
                Resumo das tarefas disponíveis
              </span>
            </div>
            <div className="space-y-3">
              {tasks?.slice(0, 10)?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div className="flex justify-center space-y-6 rounded-[10px] bg-white p-6">
            <p className="text-brand-dark-gray">
              Cada pequena ação de hoje te aproxima das grandes conquistas de
              amanhã. Faça o que precisa ser feito!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
