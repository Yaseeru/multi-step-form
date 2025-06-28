function Step3({ formData, setFormData }) {
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

  const handleAddOnToggle = (addOnId) => {
    setFormData(prev => {
      const currentAddOns = prev.selectedAddOns || [];
      const isSelected = currentAddOns.includes(addOnId);
      
      return {
        ...prev,
        selectedAddOns: isSelected 
          ? currentAddOns.filter(id => id !== addOnId)
          : [...currentAddOns, addOnId]
      };
    });
  };

  const isYearly = formData.isYearly || false;
  const selectedAddOns = formData.selectedAddOns || [];

  return (
    <div id="step3">
      <h1 className="text-blue-950 text-2xl font-bold mb-2">Pick add-ons</h1>
      <p className="text-gray-500 tracking-tighter mb-6">
        Add-ons help enhance your gaming experience.
      </p>
      
      {/* Add-on Options */}
      <div className="space-y-4">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOns.includes(addOn.id);
          const price = isYearly ? addOn.yearlyPrice : addOn.monthlyPrice;
          const period = isYearly ? 'yr' : 'mo';
          
          return (
            <div
              key={addOn.id}
              onClick={() => handleAddOnToggle(addOn.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:border-blue-950 ${
                isSelected 
                  ? 'border-blue-950 bg-gray-100' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Custom Checkbox */}
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-purple-600 border-purple-600' 
                      : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Add-on Info */}
                  <div>
                    <h3 className="font-semibold text-blue-950 mb-1">{addOn.name}</h3>
                    <p className="text-gray-500 text-sm">{addOn.description}</p>
                  </div>
                </div>
                
                {/* Price */}
                <div className="text-purple-600 font-medium">
                  +${price}/{period}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Step3
