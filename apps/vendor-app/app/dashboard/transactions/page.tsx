import { Card } from "@vehiverze/ui/card"

const transactions = [
  {
    id: 1,
    vehicleName: "Tata Nexon EV",
    type: "4 Wheeler",
    price: 1500000,
    serviceId: "AMA-S4JPMS9V",
    status: "Credited",
    datetime: "2025-02-20 at 01:00 PM - 04:00 PM",
    leadStatus: "FailedByVendor RequotePriceNotAccepted",
    credits: [
      { label: "Lead Unlocked", amount: -100, type: "debit" },
      { label: "Lead Failed Accepted", amount: 100, type: "credit" },
    ],
  },
  {
    id: 2,
    vehicleName: "Honda City",
    type: "4 Wheeler",
    price: 1200000,
    serviceId: "WPH-6FJBI32R",
    status: "Debited",
    datetime: "2025-02-20 at 01:00 AM - 04:00 PM",
    leadStatus: "FailedByCustomer SoldVehicleElsewhere",
    credits: [
      { label: "Lead Unlocked", amount: -40, type: "debit" },
      { label: "Lead Failed Rejected", amount: -40, type: "debit" },
    ],
  },
  {
    id: 3,
    vehicleName: "Royal Enfield Classic 350",
    type: "2 Wheeler",
    price: 200000,
    serviceId: "WPH-T6SI5OBG",
    status: "Debited",
    datetime: "2025-02-20 at 01:00 PM - 04:00 PM",
    leadStatus: "InProgress Assigned",
    credits: [
      { label: "Lead Unlocked", amount: -55, type: "debit" },
      { label: "Unknown Status", amount: 0, type: "neutral" },
    ],
  },
]

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Transaction History</h1>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4 space-y-3">
            <div className="flex justify-between">
              <h3 className="font-semibold">{transaction.vehicleName}</h3>
              <span className="font-semibold">Rs: {transaction.price.toLocaleString()}</span>
            </div>

            <div className="text-green-600">Service Id: {transaction.serviceId}</div>

            <div className={transaction.status === "Credited" ? "text-green-600" : "text-red-500"}>
              <span>Account: {transaction.status}</span>
              <span className="float-right">{transaction.datetime}</span>
            </div>

            <div className="text-gray-500">{transaction.leadStatus}</div>

            <div className="border-t pt-2 space-y-1">
              {transaction.credits.map((credit, index) => (
                <div key={index} className="flex justify-between">
                  <span>{credit.label}:</span>
                  <span
                    className={
                      credit.type === "credit"
                        ? "text-green-600"
                        : credit.type === "debit"
                          ? "text-red-500"
                          : "text-gray-500"
                    }
                  >
                    {credit.amount > 0 ? "+" : ""}
                    {credit.amount} Credits
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


