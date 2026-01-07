"use client"

export default function PayButton({ planId }) {
  const handlePayment = async () => {
    const res = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId,
        userId: "USER_ID_FROM_AUTH",
      }),
    })

    const data = await res.json()

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderId,
      name: "BuildFolio",
      description: "Upgrade to Pro",

      handler: async function (response) {
        await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        })
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return <button onClick={handlePayment}>Buy Pro</button>
}
