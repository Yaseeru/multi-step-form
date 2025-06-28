import React, { useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import ThankYou from "./components/ThankYou";

// Main MultiStepForm Component
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedPlan: "",
    isYearly: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { number: 1, title: "Your info", component: Step1 },
    { number: 2, title: "Select plan", component: Step2 },
    { number: 3, title: "Add-ons", component: Step3 },
    { number: 4, title: "Summary", component: Step4 },
  ];

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "This field is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.selectedPlan) {
      newErrors.selectedPlan = "Please select a plan to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderCurrentStep = () => {
    if (isSubmitted) {
      return <ThankYou formData={formData} />;
    }
    const CurrentStepComponent = steps[currentStep - 1].component;
    return (
      <CurrentStepComponent
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        onNavigateToStep={setCurrentStep}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 md:bg-white md:flex md:p-4 md:h-[600px] md:w-[900px] md:rounded-xl md:shadow-lg md:mx-auto md:my-8">
      {/* Sidebar - Desktop: Left sidebar, Mobile: Top header */}
      <div
        className={`
          md:w-1/3 md:bg-cover md:bg-center md:bg-no-repeat md:p-6 md:text-white md:rounded-xl
          w-full h-full bg-cover bg-center bg-no-repeat p-6 text-white
        `}
        style={{
          backgroundImage: `url('/assets/images/${
            window.innerWidth < 768
              ? "bg-sidebar-mobile.svg"
              : "bg-sidebar-desktop.svg"
          }')`,
        }}
      >
        {/* Desktop Layout */}
        <ul className="hidden md:block space-y-4 mt-8">
          {steps.map((step) => (
            <li key={step.number} className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full border border-white flex items-center justify-center font-bold transition-colors ${
                  currentStep === step.number
                    ? "bg-blue-300 text-blue-950 border-blue-300"
                    : "bg-transparent text-white"
                }`}
              >
                {step.number}
              </div>
              <div className="flex flex-col justify-center space-y-0">
                <h4 className="text-blue-300 text-sm uppercase">
                  Step {step.number}
                </h4>
                <h1 className="text-base font-medium tracking-wide uppercase">
                  {step.title}
                </h1>
              </div>
            </li>
          ))}
        </ul>

        {/* Mobile Layout */}
        <div className="md:hidden flex justify-center items-center h-full">
          <div className="flex space-x-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`w-10 h-10 rounded-full border border-white flex items-center justify-center font-bold transition-colors ${
                  currentStep === step.number
                    ? "bg-blue-300 text-blue-950 border-blue-300"
                    : "bg-transparent text-white"
                }`}
              >
                {step.number}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Full layout container */}
      <div className="md:hidden flex flex-col min-h-screen mx-4 bg-white">
        {/* Form area - Mobile */}
        <div className="flex-1 px-6 py-8">{renderCurrentStep()}</div>

        {/* Navigation buttons - Mobile: At bottom */}
        <div className="p-6 bg-white">
          <div className="flex justify-between items-center">
            {!isSubmitted && currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="text-gray-500 hover:text-blue-950 font-medium"
              >
                Go Back
              </button>
            )}
            <div className="flex-1"></div>
            {!isSubmitted &&
              (currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="bg-blue-950 text-white px-8 py-3 rounded-lg text-xl hover:bg-blue-900 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-purple-700 transition-colors"
                >
                  Confirm
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Desktop: Form area */}
      <div className="hidden md:flex md:w-2/3 md:px-20 md:py-10 md:flex-col md:justify-between">
        <div>{renderCurrentStep()}</div>

        {/* Navigation buttons - Desktop */}
        <div className="flex justify-between items-center">
          {!isSubmitted && currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="text-gray-500 hover:text-blue-950 font-medium"
            >
              Go Back
            </button>
          )}
          <div className="flex-1"></div>
          {!isSubmitted &&
            (currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="bg-blue-950 text-white px-8 py-3 rounded-lg text-xl hover:bg-blue-900 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitted(true)}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-purple-700 transition-colors"
              >
                Confirm
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;
