import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons/index';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useGetTasks } from '../hooks/data/use-mutate-task';

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  // const notStartedTasks = tasks?.filter(
  //   (task) => task.status === 'not_started'
  // ).length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length;
  const doneTasks = tasks?.filter((task) => task.status === 'done').length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />
        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<Tasks2Icon />}
            mainText={tasks?.length}
            secondaryText="Tarefas disponiveis"
          />
          <DashboardCard
            icon={<TasksIcon />}
            mainText={doneTasks}
            secondaryText="Tarefas concluídas"
          />
          <DashboardCard
            icon={<LoaderIcon />}
            mainText={inProgressTasks}
            secondaryText="Tarefas em andamento"
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText="5"
            secondaryText="Água"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
