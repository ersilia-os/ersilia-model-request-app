import { ModelMetadata } from "../../generated/prisma";

type MetadataDeployement = ModelMetadata["deployment"];

type MetadataLicense = ModelMetadata["license"];

type MetadataPublicationYear = ModelMetadata["publicationYear"];

interface DeploymentInfoSectionProps {
  deployment: MetadataDeployement;
  license: MetadataLicense;
  publicationYear: MetadataPublicationYear;
}

export function DeploymentInfoSection({
  deployment,
  license,
  publicationYear,
}: DeploymentInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {deployment && (
        <div>
          <h2 className="text-lg font-semibold text-plum mb-2">Deployment</h2>
          <p className="text-gray-600 text-sm md:text-base">{deployment}</p>
        </div>
      )}
      {license && (
        <div>
          <h2 className="text-lg font-semibold text-plum mb-2">License</h2>
          <p className="text-gray-600 text-sm md:text-base">{license}</p>
        </div>
      )}

      {publicationYear && (
        <div>
          <h2 className="text-lg font-semibold text-plum mb-2">
            Publication Year
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {publicationYear}
          </p>
        </div>
      )}
    </div>
  );
}
