import React from 'react';

const RecipeSteps = ({ steps }) => {
  return (
    <div className="space-y-6 mt-4 p-4 bg-white/60 backdrop-blur-md shadow rounded-md">
      {steps && steps.length > 0 ? (
        steps.map((step, index) => (
          <div
            key={index}
          >
            <h3 className="font-semibold text-gray-700 mb-2">Etape {index + 1}</h3>
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
