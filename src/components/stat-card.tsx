interface StatCardProps {
    title: string
    value: string
    subtext: string
    isPercentage?: boolean
    isPositive?: boolean
  }
  
  export default function StatCard({ title, value, subtext, isPercentage = false, isPositive = false }: StatCardProps) {
    return (
      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
        <div className="flex justify-between items-baseline">
          <p className="text-2xl font-bold">{value}</p>
          <span
            className={`text-xs ${isPercentage ? (isPositive ? "text-green-500" : "text-red-500") : "text-blue-500"}`}
          >
            {subtext}
          </span>
        </div>
      </div>
    )
  }
  