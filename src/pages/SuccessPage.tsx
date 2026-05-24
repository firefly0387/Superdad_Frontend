

const SuccessPage = () => {
  const order = JSON.parse(localStorage.getItem("lastOrder") || "{}");

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Order Placed 🎉</h1>
      <p className="mt-4">Thank you, {order?.name}</p>
      <p>Total: Rs {order?.total}</p>
    </div>
  );
};

export default SuccessPage;