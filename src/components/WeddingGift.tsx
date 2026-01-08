import React, { useState } from "react";
import { motion } from "framer-motion";
import "../assets/css/WeddingGift.css";

interface GiftData {
  bankAccounts: {
    bank: string;
    accountNumber: string;
    accountName: string;
  }[];
  digitalWallets: {
    wallet: string;
    accountNumber: string;
    accountName: string;
  }[];
  address: {
    recipientName: string;
    address: string;
  };
}

interface WeddingGiftProps {
  gifts: GiftData;
}

const WeddingGift: React.FC<WeddingGiftProps> = ({ gifts }) => {
  const [activeTab, setActiveTab] = useState<"bank" | "ewallet" | "address">(
    "bank"
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="wedding-gift-section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="gift-container"
      >
        <h2 className="gift-title">Wedding Gift</h2>
        <p className="gift-subtitle">
          Your presence is the greatest gift, but if you wish to honor us with a
          gift, we would gratefully accept it.
        </p>

        <div className="gift-tabs">
          <button
            className={`tab-button ${activeTab === "bank" ? "active" : ""}`}
            onClick={() => setActiveTab("bank")}
          >
            Bank Transfer
          </button>
          {/* <button
            className={`tab-button ${activeTab === "ewallet" ? "active" : ""}`}
            onClick={() => setActiveTab("ewallet")}
          >
            E-Wallet
          </button>
          <button
            className={`tab-button ${activeTab === 'address' ? 'active' : ''}`}
            onClick={() => setActiveTab('address')}
          >
            Gift Address
          </button> */}
        </div>

        <div className="gift-content">
          {activeTab === "bank" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bank-accounts"
            >
              {gifts.bankAccounts.map((account, index) => (
                <div key={index} className="account-card">
                  <h3>{account.bank}</h3>
                  <p className="account-name">{account.accountName}</p>
                  <p className="account-number">{account.accountNumber}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(account.accountNumber)}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "ewallet" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="digital-wallets"
            >
              {gifts.digitalWallets.map((wallet, index) => (
                <div key={index} className="wallet-card">
                  <h3>{wallet.wallet}</h3>
                  <p className="wallet-name">{wallet.accountName}</p>
                  <p className="wallet-number">{wallet.accountNumber}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(wallet.accountNumber)}
                  >
                    Copy
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "address" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="gift-address"
            >
              <h3>Recipient</h3>
              <p className="recipient-name">{gifts.address.recipientName}</p>
              <p className="full-address">{gifts.address.address}</p>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(gifts.address.address)}
              >
                Copy Address
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default WeddingGift;
