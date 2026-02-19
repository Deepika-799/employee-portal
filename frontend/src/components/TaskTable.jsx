export default function TaskTable() {
  const tasks = [
    {
      title: "Design UI",
      status: "In Progress",
      priority: "High",
      due: "20 Feb",
    },
    {
      title: "Fix Bugs",
      status: "Completed",
      priority: "Medium",
      due: "18 Feb",
    },
  ];

  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left">Task</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index} className="border-t text-center">
            <td className="p-3 text-left">{task.title}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>{task.due}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
