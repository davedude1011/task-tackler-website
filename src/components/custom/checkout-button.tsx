import { Button } from "~/components/ui/button";
import { deleteSubscription } from "~/server/subscriptions";

export default function CheckoutButton({
  isBuy,
  disabled,
  priceId,
  loading,
}: {
  isBuy: boolean;
  disabled: boolean;
  priceId: string;
  loading: boolean;
}) {
  async function getCheckoutSessionLink() {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: priceId, // Send form data in URL-encoded format
    });
    return ((await response.json()) as { url: string }).url;
  }

  return (
    <Button
      variant={"outline"}
      onClick={() => {
        if (!loading) {
          if (isBuy) {
            getCheckoutSessionLink()
              .then((redirect) => {
                window.open(redirect, "_self");
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            deleteSubscription()
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      }}
      className={loading ? "animate-pulse" : ""}
      disabled={disabled}
    >
      {isBuy ? "Subscribe" : "Unsubscribe"}
    </Button>
  );
}
