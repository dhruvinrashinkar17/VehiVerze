import { Avatar, AvatarFallback, AvatarImage } from "@vehiverze/ui/avatar"

const recentTransactions = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    amount: "+$350.00",
    status: "success",
    date: "2023-06-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    amount: "-$120.00",
    status: "pending",
    date: "2023-05-31",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    amount: "+$980.00",
    status: "success",
    date: "2023-05-30",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    amount: "-$45.00",
    status: "failed",
    date: "2023-05-29",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${transaction.email}`} alt={transaction.name} />
            <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <span className={transaction.amount.startsWith("+") ? "text-green-500" : "text-red-500"}>
              {transaction.amount}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}


