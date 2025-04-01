"use client";

import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useWrappedReownAdapter } from "@jup-ag/jup-mobile-adapter";
import { FC, useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

type Props = {
  children?: React.ReactNode;
};

export const SolanaWalletProvider: FC<Props> = ({ children }) => {
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

  const { jupiterAdapter } = useWrappedReownAdapter({
    appKitOptions: {
      metadata: {
        name: "Jupiter Mobile Adapter Example",
        description: `Implementation of Jupiter Mobile Adapter Example`,
        url: "http://localhost:3000",
        icons: [
          // add icons here
        ],
      },
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
      features: {
        analytics: false,
        socials: ["google", "x", "apple"],
        email: false,
      },
      enableWallets: false,
    },
  });

  const wallets = useMemo(() => {
    return [jupiterAdapter, new PhantomWalletAdapter()];
  }, [jupiterAdapter]);

  return (
    <ConnectionProvider
      endpoint={rpcUrl || "https://api.mainnet-beta.solana.com"}
    >
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
