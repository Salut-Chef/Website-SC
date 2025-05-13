import React from 'react';

const RecipeSteps = ({ steps }) => {
  return (
    <div className="space-y-6 mt-4">
      <h2 className="text-2xl font-bold text-gray-800">Étapes</h2>
      {steps && steps.length > 0 ? (
        steps.map((step, index) => (
          <div
            key={index}
            className="p-4 bg-white/60 backdrop-blur-md shadow rounded-md"
          >
            <h3 className="font-semibold text-gray-700 mb-2">Étape {index + 1}</h3>
            <div dangerouslySetInnerHTML={{ __html: step }} className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800">
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Aucune étape disponible.</p>
      )}
    </div>
  );
};

export default RecipeSteps;
