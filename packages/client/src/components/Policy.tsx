'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface PolicyConfig {
  denyList: string[];
  dailyLimit: string;
  transactionLimit: string;
}

export default function Policy() {
  const [config, setConfig] = useState<PolicyConfig>({
    denyList: [],
    dailyLimit: '',
    transactionLimit: '',
  });
  const [newAddress, setNewAddress] = useState('');

  const handleAddAddress = () => {
    if (!newAddress) return;
    if (!/^0x[a-fA-F0-9]{40}$/.test(newAddress)) {
      toast.error('Invalid Ethereum address');
      return;
    }
    setConfig(prev => ({
      ...prev,
      denyList: [...prev.denyList, newAddress]
    }));
    setNewAddress('');
  };

  const handleRemoveAddress = (address: string) => {
    setConfig(prev => ({
      ...prev,
      denyList: prev.denyList.filter(a => a !== address)
    }));
  };

  const handleSavePolicy = async () => {
    try {
      const response = await fetch('/api/v1/policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          denyList: config.denyList,
          dailyLimit: config.dailyLimit,
          transactionLimit: config.transactionLimit,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update policy');
      }

      toast.success('Policy updated successfully');
    } catch (error) {
      console.error('Error updating policy:', error);
      toast.error('Failed to update policy');
    }
  };

  return (
    <div className="space-y-8">
      {/* Deny List Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Deny List</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter Ethereum address"
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleAddAddress}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {config.denyList.map((address) => (
            <div key={address} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="font-mono text-sm">{address}</span>
              <button
                onClick={() => handleRemoveAddress(address)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Limits Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Transaction Limits</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Limit (ETH)
            </label>
            <input
              type="number"
              value={config.dailyLimit}
              onChange={(e) => setConfig(prev => ({ ...prev, dailyLimit: e.target.value }))}
              placeholder="Enter daily limit in ETH"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Limit (ETH)
            </label>
            <input
              type="number"
              value={config.transactionLimit}
              onChange={(e) => setConfig(prev => ({ ...prev, transactionLimit: e.target.value }))}
              placeholder="Enter transaction limit in ETH"
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSavePolicy}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
        >
          Save Policy
        </button>
      </div>
    </div>
  );
}
