import React from 'react';

function Step4({ formData = {},  onNavigateToStep  }) {
  // Plan pricing data
  const planPrices = {
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 15, yearly: 150 }
  };

  // Add-on data matching Step 3 structure
  const addOns = [
    {
      id: 'online-service',
      name: 'Online service',
      description: 'Access to multiplayer games',
      monthlyPrice: 1,
      yearlyPrice: 10
    },
    {
      id: 'larger-storage',
      name: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      monthlyPrice: 2,
      yearlyPrice: 20
    },
    {
      id: 'customizable-profile',
      name: 'Customizable Profile',
      description: 'Custom theme on your profile',
      monthlyPrice: 2,
      yearlyPrice: 20
    }
  ];

  // Get selected plan details with safe access
  const selectedPlan = formData.selectedPlan || '';
  const isYearly = formData.isYearly || false;
  const selectedPlanPrice = selectedPlan && planPrices[selectedPlan] ? 
    planPrices[selectedPlan][isYearly ? 'yearly' : 'monthly'] : 0;

  // Get selected add-ons using the correct property name from Step 3
  const selectedAddOnIds = formData.selectedAddOns || [];
  
  // Calculate add-ons total using the add-on data structure
  const addonsTotal = selectedAddOnIds.reduce((total, addOnId) => {
    const addOn = addOns.find(a => a.id === addOnId);
    if (addOn) {
      return total + (isYearly ? addOn.yearlyPrice : addOn.monthlyPrice);
    }
    return total;
  }, 0);

  const totalAmount = selectedPlanPrice + addonsTotal;
  const billingPeriod = isYearly ? 'year' : 'month';
  const billingAbbrev = isYearly ? 'yr' : 'mo';

  // Format plan name for display
  const formatPlanName = (plan) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  };

  // Format addon name for display
  const getAddOnById = (id) => {
    return addOns.find(addOn => addOn.id === id);
  };

  const handleChangePlan = () => {
    // Navigate back to step 2 to change the plan
    if (onNavigateToStep) {
      onNavigateToStep(2);
    }
  };

  return (
    <div id="step4">
      <h1 className="text-blue-950 text-2xl font-bold mb-2">Finishing up</h1>
      <p className="text-gray-500 tracking-tighter mb-6">
        Double-check everything looks OK before confirming.
      </p>

      {/* Summary Container */}
      <div className="bg-blue-50 rounded-lg p-6">
        {/* Plan Summary */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-blue-950 font-bold text-lg">
  {selectedPlan ? formatPlanName(selectedPlan) : 'No plan selected'} 
              ({isYearly ? 'Yearly' : 'Monthly'})
            </h3>
            <button 
              onClick={handleChangePlan}
              className="text-gray-500 underline hover:text-blue-600 text-sm"
            >
              Change
            </button>
          </div>
          <div className="text-blue-950 font-bold text-lg">
            ${selectedPlanPrice}/{billingAbbrev}
          </div>
        </div>

        {/* Add-ons Summary */}
        {selectedAddOnIds.length > 0 && (
          <div className="pt-4 space-y-3">
            {selectedAddOnIds.map((addOnId, index) => {
              const addOn = getAddOnById(addOnId);
              if (!addOn) return null;
              
              const price = isYearly ? addOn.yearlyPrice : addOn.monthlyPrice;
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {addOn.name}
                  </span>
                  <span className="text-blue-950 text-sm">
                    +${price}/{billingAbbrev}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between mt-6 px-6">
        <span className="text-gray-500">
          Total (per {billingPeriod})
        </span>
        <span className="text-blue-600 font-bold text-xl">
          +${totalAmount}/{billingAbbrev}
        </span>
      </div>

      {/* User Info Summary (Optional - uncomment if you want to show user details) */}
      {/* 
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-blue-950 font-semibold mb-3">Your Information</h4>
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Name:</span> {formData.name}</div>
          <div><span className="font-medium">Email:</span> {formData.email}</div>
          <div><span className="font-medium">Phone:</span> {formData.phone}</div>
        </div>
      </div>
      */}
    </div>
  );
}

export default Step4;
