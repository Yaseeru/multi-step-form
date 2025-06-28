function Step2({ formData, setFormData, errors, setErrors }) {
  const plans = [
    {
      id: 'arcade',
      name: 'Arcade',
      icon: '/assets/images/icon-arcade.svg',
      monthlyPrice: 9,
      yearlyPrice: 90,
      yearlyDiscount: '2 months free'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: '/assets/images/icon-advanced.svg',
      monthlyPrice: 12,
      yearlyPrice: 120,
      yearlyDiscount: '2 months free'
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: '/assets/images/icon-pro.svg',
      monthlyPrice: 15,
      yearlyPrice: 150,
      yearlyDiscount: '2 months free'
    }
  ];

  const handlePlanSelect = (planId) => {
    setFormData(prev => ({
      ...prev,
      selectedPlan: planId
    }));
    
    // Clear error when user selects a plan
    if (errors.selectedPlan) {
      setErrors(prev => ({
        ...prev,
        selectedPlan: ''
      }));
    }
  };

  const handleBillingToggle = () => {
    setFormData(prev => ({
      ...prev,
      isYearly: !prev.isYearly
    }));
  };

  const isYearly = formData.isYearly || false;
  const selectedPlan = formData.selectedPlan || '';

  return (
    <div id="step2">
      <h1 className="text-blue-950 text-2xl font-bold mb-2">Select your plan</h1>
      <p className="text-gray-500 tracking-tighter mb-6">
        You have the option of monthly or yearly billing.
      </p>
      
      {/* Error message for plan selection */}
      {errors.selectedPlan && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{errors.selectedPlan}</p>
        </div>
      )}
      
      {/* Plan Options */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handlePlanSelect(plan.id)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-blue-950 ${
              selectedPlan === plan.id 
                ? 'border-blue-950 bg-gray-100' 
                : errors.selectedPlan 
                  ? 'border-red-500 hover:border-red-500' 
                  : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="mb-3">
              <img 
                src={plan.icon} 
                alt={`${plan.name} icon`}
                className="w-10 h-10"
              />
            </div>
            <h3 className="font-semibold text-blue-950 mb-1">{plan.name}</h3>
            <p className="text-gray-500 text-sm mb-1">
              ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}/{isYearly ? 'yr' : 'mo'}
            </p>
            {isYearly && (
              <p className="text-blue-950 text-xs font-medium">{plan.yearlyDiscount}</p>
            )}
          </div>
        ))}
      </div>

      {/* Monthly/Yearly Toggle */}
      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center space-x-4">
        <span className={`font-medium ${!isYearly ? 'text-blue-950' : 'text-gray-400'}`}>
          Monthly
        </span>
        <button
          onClick={handleBillingToggle}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-950 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-offset-2"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isYearly ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`font-medium ${isYearly ? 'text-blue-950' : 'text-gray-400'}`}>
          Yearly
        </span>
      </div>
    </div>
  );
}
export default Step2;
