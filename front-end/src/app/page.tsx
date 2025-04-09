import QrPaymentDialog from "@/components/QrPaymentDialog";

const CheckoutPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Төлбөр</h1>
      <QrPaymentDialog amount={5000} paymentLink="https://qpay.mn/example" />
    </div>
  );
};

export default CheckoutPage;
