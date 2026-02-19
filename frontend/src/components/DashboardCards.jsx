export default function DashboardCards() {
  const cards = [
    { title: "Total Tasks", value: 18, color: "text-blue-600" },
    { title: "Completed", value: 12, color: "text-green-600" },
    { title: "Pending", value: 6, color: "text-yellow-600" },
    { title: "Leave Balance", value: "8 Days", color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <p className="text-gray-500">{card.title}</p>
          <h3 className={`text-2xl font-bold ${card.color}`}>
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
