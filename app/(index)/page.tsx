import HomeClient from "./_component/home-client";

export default function Page() {
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <HomeClient />
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        About Crypto Address Validation
      </h1>
      <div className="flex flex-col gap-2">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Checking a cryptocurrency wallet address is an essential step in the
          process of sending and receiving cryptocurrency transactions. This
          process involves verifying that the address is valid and ensuring that
          it belongs to the correct recipient.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          To validate a cryptocurrency wallet address, there are several online
          tools and services available. These tools typically require users to
          input the address they wish to verify and then perform a series of
          checks to confirm its validity.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          One common method for validating a wallet address is to check its
          format. Each cryptocurrency network has a unique address format, and
          addresses that don&lsquo;t conform to the correct format will be
          considered invalid.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Another important aspect of validating a wallet address is to check
          its transaction history. This step can help users confirm that the
          address belongs to the intended recipient and has a legitimate
          transaction history. Checking the balance of the address is also
          important, as it ensures that the recipient has sufficient funds to
          receive the transaction.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Using a trusted and reliable tool to validate wallet addresses can
          help reduce the risk of errors and fraud when sending or receiving
          cryptocurrency. By verifying the accuracy of a wallet address before
          sending or receiving funds, users can ensure that their transactions
          are secure and that their funds are being sent to the correct
          destination.
        </p>
      </div>
    </div>
  );
}
